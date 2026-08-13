// Fixed-window limiter held in memory. Keep the cPanel Passenger application
// on one worker; move this store to Redis before enabling multiple workers.
const buckets = new Map();

function hit(key, limit, windowMs) {
  const now = Date.now();
  const entry = buckets.get(key);

  if (!entry || now >= entry.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: 0 };
  }

  entry.count += 1;
  if (entry.count > limit) {
    return { allowed: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  return { allowed: true, retryAfter: 0 };
}

function refund(key) {
  const entry = buckets.get(key);
  if (entry && entry.count > 0) entry.count -= 1;
}

// Without this the map grows for every IP that ever calls the API.
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of buckets) {
    if (now >= entry.resetAt) buckets.delete(key);
  }
}, 10 * 60 * 1000).unref();

// Each caller gets a per-IP allowance, and every caller shares a daily ceiling
// that protects the provider quotas even when the abuse is spread across IPs.
function limiter({ name, limit, windowMs, dailyTotal, refundClientErrors = true }) {
  return (request, response, next) => {
    const language = request.body?.language === "en" ? "en" : "ar";
    const tooMany = (retryAfter) => {
      response.set("Retry-After", String(Math.max(retryAfter, 1)));
      return response.status(429).json({
        error: language === "ar"
          ? "عدد كبير من الطلبات خلال وقت قصير. انتظر قليلًا ثم حاول مرة أخرى."
          : "Too many requests in a short time. Please wait a moment and try again."
      });
    };

    const ipKey = `${name}:${request.ip}`;
    const perIp = hit(ipKey, limit, windowMs);
    if (!perIp.allowed) return tooMany(perIp.retryAfter);

    const today = new Date().toISOString().slice(0, 10);
    const dailyKey = `${name}:all:${today}`;
    if (dailyTotal) {
      const global = hit(dailyKey, dailyTotal, 24 * 60 * 60 * 1000);
      if (!global.allowed) return tooMany(global.retryAfter);
    }

    // A rejected payload costs nothing to serve, so it must not push a visitor
    // who mistyped their email toward a lockout. The flood guard below still
    // counts them, so cheap requests cannot be sent without limit either.
    if (refundClientErrors) {
      response.on("finish", () => {
        if (response.statusCode < 400 || response.statusCode >= 500) return;
        if (response.statusCode === 429) return;
        refund(ipKey);
        if (dailyTotal) refund(dailyKey);
      });
    }

    next();
  };
}

// Counts every call including rejected ones, so a flood of malformed payloads
// still gets stopped. Set high enough that real use never reaches it.
const floodLimit = limiter({ name: "flood", limit: 120, windowMs: 5 * 60 * 1000, refundClientErrors: false });

// Conversation turns cost one provider call each.
const conversationLimit = limiter({ name: "conversation", limit: 30, windowMs: 10 * 60 * 1000, dailyTotal: 600 });

// Finalize renders a PDF, emails the visitor, notifies the team and appends a
// row to Sheets, so it is capped far harder than an ordinary turn.
const finalizeLimit = limiter({ name: "finalize", limit: 3, windowMs: 60 * 60 * 1000, dailyTotal: 40 });

module.exports = { floodLimit, conversationLimit, finalizeLimit };
