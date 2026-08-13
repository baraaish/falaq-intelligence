# Falaq Agent Console — Backend Specification

Implementation brief for the backend that powers the Falaq live agent console.
Written to be built from without further questions.

**Scope:** backend only. The frontend already exists and is not to be changed —
it defines the contract this backend must satisfy.

---

## 1. What this is

Not a chat widget. The visitor-facing component is a **three-column live
operations console** that renders on the Falaq marketing site:

| Column 1 — Incoming signal | Column 2 — Extraction | Column 3 — Decision |
|---|---|---|
| The visitor's message, with a channel badge and timestamp | The structured brief the agent has extracted so far, field by field | The rule currently governing the case, and the handoff boundary |

The conversation is only one third of the surface. The other two columns expose
the agent's working state. That is the product claim being demonstrated: Falaq
agents operate under declared rules, within permissions, and escalate to a named
human. The console must make a **refusal** as visible as a success — when the
agent lacks mandatory fields it must visibly decline to score.

**Consequence for implementation:** the backend must return not just a reply but
the extracted state and the governing rule. Never fabricate a field to make the
panel look fuller. A field is absent when the model did not extract it.

---

## 2. What already exists

Running today at `https://api.falaqai.com`, source in `backend/`:

| File | Role |
|---|---|
| `backend/server.js` | Express 5 app, routes, CORS, static serving |
| `backend/providers.js` | Provider fallback chain + `probeProviders()` |
| `backend/proposal.js` | Prompting, `continueConversation()`, `analyzeRequest()`, brief normalisation |
| `backend/rate-limit.js` | Three-tier limiter |
| `backend/pdf.js` | Puppeteer proposal PDF |
| `backend/email.js` | Resend delivery |
| `backend/capabilities.json` | The 7 original agent categories |

**Provider chain** (first success wins, any failure falls through):
`cerebras` → `groq` → `gemini` → `openrouter`. All four verified working.
Keys come from environment variables; see `.env.example`.

**Rate limits** (in-memory, single instance):
- conversation endpoints: 30 per 10 min per IP, 600/day total
- `/finalize`: 3 per hour per IP, 40/day total
- flood guard on all POSTs: 120 per 5 min per IP, counts rejected payloads too
- 4xx validation rejections are refunded so a mistyped email cannot lock a visitor out

**Health:** `GET /api/agent/status` is cheap (Render health check).
`GET /api/agent/status?probe=1` actually calls every configured provider and
returns `{name, model, ok, ms, error}` per provider, cached 5 minutes.

---

## 3. The contract the frontend already speaks

Frontend file: `assets/agent-console.js`. Do not break this.

### `POST /api/agent/turn`

Request:
```json
{
  "language": "ar" | "en",
  "category": "<service slug, may be empty>",
  "channel": "whatsapp" | "chat" | "email",
  "messages": [ { "role": "user" | "assistant", "content": "…" } ],
  "brief": { }
}
```
`messages` is the last 16 turns. `brief` is the brief returned by the previous
turn, echoed back so extraction accumulates.

Current response (already implemented):
```json
{
  "ok": true,
  "reply": "…",
  "brief": { "businessContext": "…", "pain": "…" },
  "category": "booking-recovery",
  "categoryLabel": "إدارة واستعادة الحجوزات",
  "intent": "explore|provide_context|ask_question|objection|interested|decline",
  "interest": "none|implicit|explicit",
  "nextAction": "chat|contact",
  "suggestions": ["…"],
  "provider": "cerebras"
}
```

**Brief fields** (`normalizeBrief`, all optional strings):
`businessContext`, `currentProcess`, `pain`, `channels`, `volume`, `rules`,
`handoff`, `systems`, `success`, `desiredOutcome`.
The console surfaces eight of these; keep all ten in the payload.

Errors: `503` with `{"error": "<localised>"}` when every provider fails.
`429` with `Retry-After` when rate limited. The frontend retries `503` four
times (3s, 6s, 10s, 15s) and never retries `429`.

---

## 4. What to build

### 4.1 Server-side rule evaluation — the main addition

Today the console derives the governing rule in the browser from the brief.
Move this to the backend so the rule is authoritative, auditable, and identical
across every channel the agent runs on.

Add to the `/api/agent/turn` response:

```json
{
  "extracted": [
    { "field": "businessContext", "value": "عيادة أسنان في عمّان", "confidence": "stated" },
    { "field": "currentProcess", "value": null, "confidence": "missing" }
  ],
  "governing": {
    "rule": "r1",
    "state": "blocked" | "open" | "ready" | "review",
    "detail": "العملية الحالية",
    "handoff": "بشري — لم تكتمل الصورة"
  },
  "rulesFired": ["r1", "r4"]
}
```

`confidence` is one of `stated` (the visitor said it outright), `inferred` (the
model derived it), or `missing`. Only mark `stated` when the value is
substantially present in the visitor's own words — this drives a visual
distinction in the panel and must not be inflated.

**Rule semantics.** These are Falaq's four published rules; the wording is
already on the website and the implementation must match it, not approximate it.

| Rule | Fires when | Resulting state |
|---|---|---|
| `r1` — no scoping before mandatory fields | any of `businessContext`, `currentProcess`, `pain` is missing | `blocked` — no category confidence, no proposal offer |
| `r2` — no ready case left without an action | mandatory fields present **and** `interest === "explicit"` **and** ≥5 fields filled | `ready` |
| `r3` — no unilateral decision on a conflict | the model reports contradictory values for a field it already held, or every provider failed | `review` — hand to a named human |
| `r4` — everything is logged | always | additive; never the sole state unless `open` |

Evaluation order is **r3 → r1 → r2 → else `open`**, and `r4` always appends.
r3 outranking r2 is deliberate: a complete, high-scoring case must still stop
when information conflicts. That precedence is the guardrail the product sells,
so it must not be reordered for convenience.

Return the rule **id only** (`r1`…`r4`). Human-readable names and explanations
live in the frontend so they stay translatable without a deploy.

### 4.2 Conflict detection for r3

Compare each incoming brief field against the value already held. A conflict is
a field whose value materially changes rather than becoming more specific.
"عيادة أسنان" → "عيادة أسنان في عمّان" is refinement. "عيادة أسنان" → "مطعم" is
a conflict. Implement with a cheap heuristic first — token overlap below a
threshold — and record `governing.detail` as the field name that conflicted.
Do not spend a model call on this.

### 4.3 Streaming (recommended)

The console's value is watching state assemble. Add
`POST /api/agent/turn/stream` as Server-Sent Events emitting:

```
event: token   data: {"text":"…"}          // reply text, incremental
event: field   data: {"field":"pain","value":"…","confidence":"stated"}
event: rule    data: {"rule":"r1","state":"blocked","detail":"…"}
event: done    data: { …the full JSON response above… }
```

Keep the non-streaming endpoint working unchanged — it is the fallback and the
frontend uses it today.

### 4.4 Channel awareness

`channel` arrives in the request and is currently ignored. Persist it on the
lead record and include it in the audit log. Do not let it change the reply
content; the claim is that one agent works across channels.

### 4.5 Audit log (rule r4 must be true, not decorative)

Every turn appends one record: timestamp, session id, channel, language, the
visitor message, the reply, the brief diff, rules fired, governing state, and
the provider that served it. Today `backend/server.js` appends leads to
`backend/data/leads.jsonl`. Extend to a per-turn log. If a database is
available, prefer it; JSONL is acceptable.

---

## 5. Deployment target

The site has moved to cPanel shared hosting (stableserver, London) which offers
**Setup Node.js App**, SSH, Terminal, Git and Cron. Resources: 2 GB RAM, 100
processes, 2048 IOPS.

Running site and API on the same host removes the sleeping-instance problem
entirely — the current free Render instance takes close to a minute to wake.

**Two things to resolve before migrating:**

1. **Puppeteer will very likely not run there.** `backend/pdf.js` uses
   `puppeteer-core` against a system Chromium. Shared cPanel hosting normally
   has no Chromium binary, and 100 processes with 2 GB RAM is hostile to it.
   Either replace PDF generation with a pure-JS library (pdfkit, pdf-lib) that
   can render Arabic with an embedded font, or leave `/api/agent/finalize` on
   Render and point only the conversation endpoints at cPanel. Decide before
   migrating, not after.
2. **The SSL certificate is currently self-signed** and cPanel flags the domain
   as at risk. Issue a real certificate (AutoSSL / Let's Encrypt) before any
   traffic reaches it.

**CORS:** `backend/server.js` allows `https://falaqai.com`,
`https://www.falaqai.com`, `https://baraaish.github.io`, plus anything in the
`CORS_ORIGINS` env var. Add `http://localhost:3000` there for development only —
never bake it into the default list.

**Rate limiting caveat:** the limiter is in-memory and assumes one instance. If
the app is ever run with multiple Passenger workers, the effective limit
multiplies by the worker count. Either pin to one instance or move the store to
Redis (cPanel offers Redis).

---

## 6. Non-negotiables

1. **Never fabricate extracted data.** An empty field renders as empty. The
   panel's credibility is the product's credibility.
2. **Never let a rule be cosmetic.** If the response says `r1` blocked the case,
   the backend must actually have withheld the scoring and the proposal offer.
3. **Arabic is first-class.** Dialect input, mid-sentence language switching, and
   correct Arabic in every response. Confirm UTF-8 end to end — this has bitten
   before, where a terminal, not the API, was mangling Arabic.
4. **Model-neutral.** No prompt or parser may depend on one provider's quirks.
   Any of the four must be able to serve any request.
5. **Reasoning models need headroom.** `gpt-oss` models on Cerebras and
   OpenRouter spend tokens reasoning before emitting content and return an empty
   string if the budget runs out. Never set `max_tokens` below ~512 for them; a
   20-token probe once made three healthy providers look dead.

---

## 7. Acceptance tests

1. Send `"عندي عيادة أسنان وبضيع مواعيد"` → response contains `businessContext`
   and `pain`, `governing.rule === "r1"`, `state === "blocked"`, and no proposal
   offer in the reply.
2. Continue with process, channel, volume and an explicit request for a proposal
   → `governing.rule === "r2"`, `state === "ready"`.
3. From that ready state, contradict the business type → `governing.rule === "r3"`,
   `state === "review"`, and the readiness is withdrawn.
4. Kill every provider key → `503`, localised error, and the frontend's retry
   then r3 path both behave.
5. Exceed 30 turns in 10 minutes from one IP → `429` with `Retry-After`, and it
   is **not** retried by the client.
6. `GET /api/agent/status?probe=1` → all four providers `ok: true` with model
   names and latencies.
7. Same conversation in English → identical rule transitions, English strings.
8. Every turn above appears in the audit log with its channel and provider.
