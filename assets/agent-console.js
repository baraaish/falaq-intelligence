// Falaq Pulse — production live-agent canvas.
//
// The language model supplies content and structured state. This component
// owns layout, density, colours and motion so every conversation remains
// legible and visually consistent, including empty, ready, conflict and error
// states. The current API contract is supported, while authoritative
// `extracted`, `governing` and `rulesFired` fields are preferred when present.
(function () {
  "use strict";

  var FIELD_KEYS = ["businessContext", "currentProcess", "pain", "channels", "volume", "handoff", "systems", "success"];
  var MANDATORY = ["businessContext", "currentProcess", "pain"];
  var RETRY_DELAYS = [3000, 6000, 10000, 15000];

  var COPY = {
    ar: {
      shellKicker: "FALAQ / PULSE",
      shellTitle: "مساحة تشغيل حيّة",
      online: "متصل وجاهز",
      session: "جلسة",
      conversation: "المحادثة",
      conversationSub: "الوكيل نفسه عبر كل قناة",
      map: "خريطة القرار الحيّة",
      mapSub: "الإشارة تصبح متغيرات، ثم قاعدة وإجراء",
      inspector: "فحص مباشر",
      inspectorSub: "انقر على أي عقدة",
      placeholder: "صف حالة حقيقية من عملك…",
      send: "إرسال",
      thinking: "أفهم الرسالة وأحدّث الخريطة…",
      retrying: "أعيد الاتصال بالوكيل… المحاولة",
      you: "أنت",
      agent: "وكيل فلق",
      emptyChat: "ابدأ برسالة، وستظهر طريقة انتقالها من إشارة إلى قرار أمامك.",
      examplesLabel: "أمثلة سريعة",
      examples: [
        "عندي عيادة أسنان وتضيع علينا مواعيد الحجز",
        "طلبات المتجر تصل من واتساب ونسجلها يدويًا",
        "فريق المبيعات يتأخر في متابعة العملاء المحتملين"
      ],
      channels: { whatsapp: "واتساب", chat: "ويب", email: "بريد" },
      nodes: {
        signal: { title: "الإشارة الواردة", hint: "آخر رسالة وصلت إلى الوكيل" },
        variables: { title: "ذاكرة العمل", hint: "لا تضيء قيمة قبل استخراجها" },
        trigger: { title: "التريجر النشط", hint: "قاعدة تغيّر سلوك الوكيل فعليًا" },
        action: { title: "الإجراء التالي", hint: "ما سيحدث الآن ومالك الخطوة" },
        audit: { title: "السجل الشفاف", hint: "أثر زمني قابل للمراجعة" }
      },
      noSignal: "في انتظار رسالة",
      empty: "غير محدد",
      of: "من",
      category: "المسار",
      handoff: "حدّ التسليم",
      provider: "المزوّد",
      stateLabel: "الحالة",
      selectedNode: "العقدة المحددة",
      rulesLabel: "قواعد القرار",
      eventsLabel: "آخر الأحداث",
      filledLabel: "المكتمل",
      sourceLabel: "المصدر",
      ownerLabel: "المالك",
      updateLabel: "التحديث",
      now: "الآن",
      captured: "مستخرج",
      confidences: { stated: "مذكور", inferred: "مستنتج", missing: "ناقص", captured: "مستخرج" },
      fields: {
        businessContext: "النشاط", currentProcess: "العملية", pain: "المشكلة",
        channels: "القنوات", volume: "الحجم", handoff: "التسليم",
        systems: "الأنظمة", success: "النجاح"
      },
      states: {
        blocked: "ينتظر بيانات",
        open: "يفهم السياق",
        ready: "جاهز للإجراء",
        review: "تسليم بشري"
      },
      rules: {
        r1: { id: "R1", name: "لا تصنيف قبل اكتمال الأساس", why: "النشاط والعملية الحالية ونقطة الألم مطلوبة قبل اقتراح مسار." },
        r2: { id: "R2", name: "الحالة الجاهزة تتحول إلى إجراء", why: "اكتمل السياق وظهر اهتمام صريح، لذلك ينتقل الوكيل للخطوة التالية." },
        r3: { id: "R3", name: "التعارض يوقف القرار الآلي", why: "عند تعارض المعلومات أو تعذّر الوكيل، تُسلّم الحالة إلى شخص بدل التخمين." },
        r4: { id: "R4", name: "كل انتقال يُسجل", why: "الرسالة والقناة والمتغيرات والقرار تبقى في سجل قابل للمراجعة." }
      },
      actions: {
        blocked: { title: "سؤال توضيحي", detail: "اجمع الحقل الأساسي التالي", owner: "الوكيل" },
        open: { title: "تابع فهم العملية", detail: "اسأل سؤالًا واحدًا مفيدًا", owner: "الوكيل" },
        ready: { title: "ابدأ الخطوة التالية", detail: "جهّز ملخص الحالة والتواصل", owner: "الوكيل + فريق الحلول" },
        review: { title: "تسليم آمن", detail: "أوقف القرار وأرسل الملخص", owner: "موظف مختص" }
      },
      handoffs: {
        blocked: "يبقى الوكيل ضمن جمع السياق",
        open: "يتابع الوكيل طرح الأسئلة",
        ready: "ينتقل إلى خطوة التواصل",
        review: "موظف مختص يراجع الحالة"
      },
      inspectors: {
        signal: "نقطة بداية كل تشغيل. تحتفظ بالقناة والنص والتوقيت قبل أن ينتقل شيء إلى الذاكرة.",
        variables: "ذاكرة عمل مرئية. القيم الناقصة تبقى فارغة، والقيم الطويلة تُختصر دون أن تضيع تفاصيلها.",
        trigger: "قاعدة تشغيل تغيّر السلوك فعلًا: تتابع، تنفذ، تتوقف، أو تسلّم الحالة إلى موظف.",
        action: "النتيجة الملموسة للتريجر؛ قد تكون سؤالًا أو تواصلًا أو تسليمًا بشريًا.",
        audit: "أثر زمني يجعل كل انتقال قابلًا للشرح والمراجعة بدل أن يحدث داخل صندوق أسود."
      },
      events: {
        ready: "القناة جاهزة لاستقبال إشارة",
        received: "وصلت إشارة جديدة",
        extracted: "تحدّث متغير",
        governed: "تفعّلت قاعدة",
        channel: "تغيّرت القناة إلى",
        error: "توقّف القرار الآلي"
      },
      genericError: "تعذر الوصول إلى الوكيل الآن. حُوّلت الحالة للمراجعة البشرية."
    },
    en: {
      shellKicker: "FALAQ / PULSE",
      shellTitle: "Live operating surface",
      online: "Online and ready",
      session: "Session",
      conversation: "Conversation",
      conversationSub: "The same agent across every channel",
      map: "Live decision map",
      mapSub: "A signal becomes variables, then a rule and action",
      inspector: "Live inspector",
      inspectorSub: "Select any node",
      placeholder: "Describe a real case from your operation…",
      send: "Send",
      thinking: "Understanding the message and updating the map…",
      retrying: "Reconnecting to the agent… attempt",
      you: "You",
      agent: "Falaq agent",
      emptyChat: "Start with a message and watch it move from signal to decision.",
      examplesLabel: "Quick examples",
      examples: [
        "I run a dental clinic and appointments keep falling through",
        "Store orders arrive on WhatsApp and we enter them manually",
        "The sales team is slow to follow up new leads"
      ],
      channels: { whatsapp: "WhatsApp", chat: "Web", email: "Email" },
      nodes: {
        signal: { title: "Incoming signal", hint: "The latest message reaching the agent" },
        variables: { title: "Working memory", hint: "A value never lights up before extraction" },
        trigger: { title: "Active trigger", hint: "A rule that changes actual behaviour" },
        action: { title: "Next action", hint: "What happens now and who owns it" },
        audit: { title: "Transparent log", hint: "A reviewable chronological trail" }
      },
      noSignal: "Waiting for a message",
      empty: "Not set",
      of: "of",
      category: "Route",
      handoff: "Handoff boundary",
      provider: "Provider",
      stateLabel: "State",
      selectedNode: "Selected node",
      rulesLabel: "Decision rules",
      eventsLabel: "Recent events",
      filledLabel: "Filled",
      sourceLabel: "Source",
      ownerLabel: "Owner",
      updateLabel: "Update",
      now: "Now",
      captured: "Captured",
      confidences: { stated: "Stated", inferred: "Inferred", missing: "Missing", captured: "Captured" },
      fields: {
        businessContext: "Business", currentProcess: "Process", pain: "Pain point",
        channels: "Channels", volume: "Volume", handoff: "Handoff",
        systems: "Systems", success: "Success"
      },
      states: {
        blocked: "Waiting for data",
        open: "Understanding context",
        ready: "Ready for action",
        review: "Human handoff"
      },
      rules: {
        r1: { id: "R1", name: "No scoping before the foundations", why: "Business, current process and pain are required before a route can be proposed." },
        r2: { id: "R2", name: "A ready case becomes an action", why: "Context is complete and interest is explicit, so the agent moves to the next step." },
        r3: { id: "R3", name: "Conflict stops an automated decision", why: "When information conflicts or the agent is unreachable, the case goes to a person instead of a guess." },
        r4: { id: "R4", name: "Every transition is logged", why: "The message, channel, variables and decision remain in a reviewable record." }
      },
      actions: {
        blocked: { title: "Clarifying question", detail: "Collect the next foundational field", owner: "Agent" },
        open: { title: "Continue discovery", detail: "Ask one useful question", owner: "Agent" },
        ready: { title: "Start the next step", detail: "Prepare the case summary and contact", owner: "Agent + solutions team" },
        review: { title: "Safe handoff", detail: "Stop the decision and send the summary", owner: "Named specialist" }
      },
      handoffs: {
        blocked: "Agent remains within discovery",
        open: "Agent continues asking questions",
        ready: "Move to the contact step",
        review: "A named specialist reviews the case"
      },
      inspectors: {
        signal: "The start of every run. It keeps the channel, text and timestamp before anything reaches memory.",
        variables: "Visible working memory. Missing values stay empty and long values are shortened without losing their detail.",
        trigger: "An operating rule that changes behaviour: continue, act, stop, or hand the case to a person.",
        action: "The tangible outcome of the trigger — a question, contact step, or human handoff.",
        audit: "A chronological trail that makes each transition explainable and reviewable rather than hidden in a black box."
      },
      events: {
        ready: "Channel ready for a signal",
        received: "New signal received",
        extracted: "Variable updated",
        governed: "Rule activated",
        channel: "Channel changed to",
        error: "Automated decision stopped"
      },
      genericError: "The agent is unavailable right now. This case has been moved to human review."
    }
  };

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function apiBase() {
    var config = window.FALAQ_CONFIG || {};
    return (config.agentApiBase || "").replace(/\/$/, "");
  }

  function clock() {
    var date = new Date();
    return String(date.getHours()).padStart(2, "0") + ":" + String(date.getMinutes()).padStart(2, "0");
  }

  function short(value, limit) {
    var text = String(value || "").trim();
    return text.length > limit ? text.slice(0, limit - 1) + "…" : text;
  }

  function wait(ms) {
    return new Promise(function (resolve) { window.setTimeout(resolve, ms); });
  }

  function unique(values) {
    return values.filter(function (value, index) { return value && values.indexOf(value) === index; });
  }

  function fallbackGovern(brief, interest, unreachable, copy) {
    var filled = FIELD_KEYS.filter(function (field) { return brief[field]; });
    if (unreachable) return { rule: "r3", state: "review", detail: "provider", handoff: copy.handoffs.review };
    if (!MANDATORY.every(function (field) { return brief[field]; })) {
      var missing = MANDATORY.filter(function (field) { return !brief[field]; });
      return { rule: "r1", state: "blocked", detail: missing[0] || "", handoff: copy.handoffs.blocked };
    }
    if (interest === "explicit" && filled.length >= 5) {
      return { rule: "r2", state: "ready", detail: "", handoff: copy.handoffs.ready };
    }
    return { rule: "r4", state: "open", detail: "", handoff: copy.handoffs.open };
  }

  function extractionMap(extracted) {
    var map = {};
    (Array.isArray(extracted) ? extracted : []).forEach(function (item) {
      if (item && FIELD_KEYS.indexOf(item.field) !== -1) map[item.field] = item;
    });
    return map;
  }

  function icon(name) {
    var paths = {
      signal: '<path d="M4 5.5h16v11H8l-4 3v-14Z"/><path d="M8 10h8M8 13h5"/>',
      variables: '<path d="M8 4H5v16h3M16 4h3v16h-3"/><path d="m10 9 4 6M14 9l-4 6"/>',
      trigger: '<path d="m13 2-8 11h6l-1 9 9-12h-6V2Z"/>',
      action: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
      audit: '<path d="M6 3h12v18H6z"/><path d="M9 8h6M9 12h6M9 16h4"/>',
      send: '<path d="m4 12 16-8-5 16-3-6-8-2Zm8 2 3-3"/>'
    };
    return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (paths[name] || "") + '</svg>';
  }

  function mount(host, language, options) {
    if (!host) return null;
    var lang = language === "en" ? "en" : "ar";
    var copy = COPY[lang];
    var config = options || {};
    var transport = config.fetch || window.FALAQ_CONSOLE_TRANSPORT || window.fetch.bind(window);
    var sessionId = Math.random().toString(36).slice(2, 8).toUpperCase();
    var updateTimer = null;
    var settleTimer = null;
    var state = {
      messages: [],
      brief: {},
      extracted: [],
      governing: null,
      rulesFired: ["r4"],
      category: "",
      categoryLabel: "",
      interest: "none",
      channel: "whatsapp",
      provider: "—",
      busy: false,
      unreachable: false,
      stage: "idle",
      selected: "signal",
      changed: [],
      suggestions: copy.examples.slice(0, 3),
      events: [{ time: clock(), label: copy.events.ready, tone: "quiet" }]
    };

    var channelButtons = Object.keys(copy.channels).map(function (channel) {
      return '<button type="button" data-channel-button="' + channel + '" aria-pressed="' + (channel === "whatsapp") + '" class="' + (channel === "whatsapp" ? "is-active" : "") + '"><i></i>' + esc(copy.channels[channel]) + '</button>';
    }).join("");

    host.innerHTML = `
      <div class="ac" data-stage="idle" data-state="blocked" data-channel="whatsapp">
        <header class="ac-topbar">
          <div class="ac-brand">
            <span class="ac-brand-mark"><img src="/assets/falaq-symbol.png" alt=""></span>
            <span><small>${esc(copy.shellKicker)}</small><b>${esc(copy.shellTitle)}</b></span>
          </div>
          <div class="ac-runtime"><span class="ac-live"><i></i>${esc(copy.online)}</span><span class="ac-session">${esc(copy.session)} / ${esc(sessionId)}</span></div>
        </header>

        <div class="ac-workspace">
          <section class="ac-chat-panel" aria-label="${esc(copy.conversation)}">
            <header class="ac-panel-head">
              <div><span class="ac-overline">01 / CONVERSATION</span><h3>${esc(copy.conversation)}</h3><p>${esc(copy.conversationSub)}</p></div>
              <div class="ac-channels" role="group" aria-label="${esc(copy.conversation)}">${channelButtons}</div>
            </header>
            <div class="ac-stream" data-stream aria-live="polite"><div class="ac-empty">${icon("signal")}<p>${esc(copy.emptyChat)}</p></div></div>
            <div class="ac-suggestions"><span>${esc(copy.examplesLabel)}</span><div data-suggestions></div></div>
            <form class="ac-composer" data-form>
              <label class="ac-sr" for="ac-input-${esc(sessionId)}">${esc(copy.placeholder)}</label>
              <textarea id="ac-input-${esc(sessionId)}" rows="1" maxlength="600" autocomplete="off" placeholder="${esc(copy.placeholder)}" data-input></textarea>
              <button type="submit" data-send aria-label="${esc(copy.send)}"><span>${esc(copy.send)}</span>${icon("send")}</button>
            </form>
          </section>

          <section class="ac-map-panel" aria-label="${esc(copy.map)}">
            <header class="ac-panel-head ac-map-head">
              <div><span class="ac-overline">02 / LIVE DECISION MAP</span><h3>${esc(copy.map)}</h3><p>${esc(copy.mapSub)}</p></div>
              <span class="ac-state" data-state-label></span>
            </header>
            <div class="ac-canvas-scroll"><div class="ac-canvas" data-canvas dir="ltr">
              <svg class="ac-links" viewBox="0 0 760 470" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="ac-edge-a-${esc(sessionId)}" x1="0" x2="1"><stop stop-color="#c084fc"/><stop offset="1" stop-color="#a855f7"/></linearGradient>
                  <linearGradient id="ac-edge-b-${esc(sessionId)}" x1="0" x2="1"><stop stop-color="#a855f7"/><stop offset="1" stop-color="#fbbf24"/></linearGradient>
                  <filter id="ac-glow-${esc(sessionId)}" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                  <path id="ac-p1-${esc(sessionId)}" d="M176 168 C225 168 225 139 274 139"/>
                  <path id="ac-p2-${esc(sessionId)}" d="M494 156 C542 156 542 190 585 190"/>
                  <path id="ac-p3-${esc(sessionId)}" d="M665 260 C665 318 594 338 562 370"/>
                  <path id="ac-p4-${esc(sessionId)}" d="M380 258 C380 324 296 343 236 373"/>
                </defs>
                <g class="ac-edge ac-edge-signal"><use href="#ac-p1-${esc(sessionId)}" class="ac-edge-base"/><use href="#ac-p1-${esc(sessionId)}" class="ac-edge-flow" stroke="url(#ac-edge-a-${esc(sessionId)})"/><circle class="ac-packet" r="4" fill="#c084fc" filter="url(#ac-glow-${esc(sessionId)})"><animateMotion dur="2.6s" repeatCount="indefinite"><mpath href="#ac-p1-${esc(sessionId)}"/></animateMotion></circle></g>
                <g class="ac-edge ac-edge-vars"><use href="#ac-p2-${esc(sessionId)}" class="ac-edge-base"/><use href="#ac-p2-${esc(sessionId)}" class="ac-edge-flow" stroke="url(#ac-edge-b-${esc(sessionId)})"/><circle class="ac-packet" r="4" fill="#c084fc" filter="url(#ac-glow-${esc(sessionId)})"><animateMotion dur="2.9s" begin="-.8s" repeatCount="indefinite"><mpath href="#ac-p2-${esc(sessionId)}"/></animateMotion></circle></g>
                <g class="ac-edge ac-edge-action"><use href="#ac-p3-${esc(sessionId)}" class="ac-edge-base"/><use href="#ac-p3-${esc(sessionId)}" class="ac-edge-flow" stroke="#fbbf24"/><circle class="ac-packet" r="3.5" fill="#fbbf24" filter="url(#ac-glow-${esc(sessionId)})"><animateMotion dur="2.5s" begin="-1.4s" repeatCount="indefinite"><mpath href="#ac-p3-${esc(sessionId)}"/></animateMotion></circle></g>
                <g class="ac-edge ac-edge-audit"><use href="#ac-p4-${esc(sessionId)}" class="ac-edge-base"/><use href="#ac-p4-${esc(sessionId)}" class="ac-edge-flow" stroke="#a855f7"/><circle class="ac-packet" r="3.5" fill="#a855f7" filter="url(#ac-glow-${esc(sessionId)})"><animateMotion dur="3.3s" begin="-1.8s" repeatCount="indefinite"><mpath href="#ac-p4-${esc(sessionId)}"/></animateMotion></circle></g>
              </svg>

              <button class="ac-node ac-node-signal is-selected" type="button" data-node="signal" aria-pressed="true" dir="${lang === "ar" ? "rtl" : "ltr"}">
                <span class="ac-node-top"><i class="ac-node-icon is-cyan">${icon("signal")}</i><em>INPUT / 01</em></span>
                <strong>${esc(copy.nodes.signal.title)}</strong><small>${esc(copy.nodes.signal.hint)}</small>
                <p data-signal-value>${esc(copy.noSignal)}</p><span class="ac-node-foot"><i></i><b data-node-channel>${esc(copy.channels.whatsapp)}</b><time data-signal-time>—</time></span><i class="ac-port is-out"></i>
              </button>

              <button class="ac-node ac-node-variables" type="button" data-node="variables" aria-pressed="false" dir="${lang === "ar" ? "rtl" : "ltr"}">
                <span class="ac-node-top"><i class="ac-node-icon is-violet">${icon("variables")}</i><em>MEMORY / 02</em></span>
                <span class="ac-node-title"><strong>${esc(copy.nodes.variables.title)}</strong><b data-count>0 / ${FIELD_KEYS.length}</b></span><small>${esc(copy.nodes.variables.hint)}</small>
                <span class="ac-progress"><i data-progress></i></span><div class="ac-variables" data-fields></div><i class="ac-port is-in"></i><i class="ac-port is-out"></i>
              </button>

              <button class="ac-node ac-node-trigger" type="button" data-node="trigger" aria-pressed="false" dir="${lang === "ar" ? "rtl" : "ltr"}">
                <span class="ac-node-top"><i class="ac-node-icon is-gold">${icon("trigger")}</i><em data-rule-id>TRIGGER / R1</em></span>
                <span class="ac-trigger-state"><i></i><b data-trigger-state></b></span><strong data-rule-name></strong><p data-rule-detail></p>
                <span class="ac-node-foot"><b data-category>${esc(copy.category)}: ${esc(copy.empty)}</b></span><i class="ac-port is-in"></i><i class="ac-port is-bottom"></i>
              </button>

              <button class="ac-node ac-node-action" type="button" data-node="action" aria-pressed="false" dir="${lang === "ar" ? "rtl" : "ltr"}">
                <span class="ac-node-top"><i class="ac-node-icon is-coral">${icon("action")}</i><em>ACTION / 04</em></span>
                <strong data-action-title></strong><p data-action-detail></p><span class="ac-owner"><span class="ac-mini-avatar"><img src="/assets/falaq-symbol.png" alt=""></span><b data-action-owner></b><i></i></span><i class="ac-port is-top"></i>
              </button>

              <button class="ac-node ac-node-audit" type="button" data-node="audit" aria-pressed="false" dir="${lang === "ar" ? "rtl" : "ltr"}">
                <span class="ac-node-top"><i class="ac-node-icon is-mint">${icon("audit")}</i><em>AUDIT / LIVE</em></span>
                <span class="ac-node-title"><strong>${esc(copy.nodes.audit.title)}</strong><b><i></i> LIVE</b></span><small>${esc(copy.nodes.audit.hint)}</small><div class="ac-audit-lines" data-audit-lines></div><i class="ac-port is-top"></i>
              </button>
            </div></div>
          </section>

          <aside class="ac-inspector" aria-label="${esc(copy.inspector)}">
            <header class="ac-panel-head"><div><span class="ac-overline">03 / INSPECTOR</span><h3>${esc(copy.inspector)}</h3><p>${esc(copy.inspectorSub)}</p></div></header>
            <section class="ac-selected" data-selected></section>
            <section class="ac-rule-stack"><div class="ac-section-label"><span>${esc(copy.rulesLabel)}</span><small>RULESET / V1</small></div><div data-rule-stack></div></section>
            <section class="ac-event-section"><div class="ac-section-label"><span>${esc(copy.eventsLabel)}</span><small>LIVE TRACE</small></div><ol data-events></ol></section>
          </aside>
        </div>

        <footer class="ac-statusbar"><span><i></i> AGENT ONLINE</span><span>AR / EN</span><span data-footer-channel>CHANNEL / WHATSAPP</span><span>${esc(copy.provider)} / <b data-provider>—</b></span><span>UTF-8 ✓</span></footer>
      </div>`;

    var root = host.querySelector(".ac");
    var stream = host.querySelector("[data-stream]");
    var form = host.querySelector("[data-form]");
    var input = host.querySelector("[data-input]");
    var sendButton = host.querySelector("[data-send]");

    function currentGovern() {
      return state.governing || fallbackGovern(state.brief, state.interest, state.unreachable, copy);
    }

    function addEvent(label, tone) {
      state.events.unshift({ time: clock(), label: label, tone: tone || "accent" });
      state.events = state.events.slice(0, 5);
    }

    function renderSuggestions() {
      var suggestions = state.suggestions.length ? state.suggestions : copy.examples;
      host.querySelector("[data-suggestions]").innerHTML = suggestions.slice(0, 3).map(function (text, index) {
        return '<button type="button" data-suggestion="' + esc(text) + '" title="' + esc(text) + '"><span>' + String(index + 1).padStart(2, "0") + '</span>' + esc(short(text, 48)) + '</button>';
      }).join("");
    }

    function renderFields() {
      var extracted = extractionMap(state.extracted);
      var filled = FIELD_KEYS.filter(function (field) { return state.brief[field]; });
      host.querySelector("[data-fields]").innerHTML = FIELD_KEYS.map(function (field) {
        var item = extracted[field] || {};
        var hasValue = Boolean(state.brief[field]);
        var confidence = item.confidence || (hasValue ? "captured" : "missing");
        var changed = state.changed.indexOf(field) !== -1;
        return '<span class="ac-variable is-' + esc(confidence) + (changed ? ' just-changed' : '') + '" title="' + esc(copy.fields[field] + ': ' + (state.brief[field] || copy.empty)) + '"><i></i><span><small>' + esc(copy.fields[field]) + '</small><b>' + esc(hasValue ? short(state.brief[field], 26) : copy.empty) + '</b></span><em>' + esc(copy.confidences[confidence] || copy.captured) + '</em></span>';
      }).join("");
      host.querySelector("[data-count]").textContent = filled.length + " / " + FIELD_KEYS.length;
      host.querySelector("[data-progress]").style.width = Math.round((filled.length / FIELD_KEYS.length) * 100) + "%";
    }

    function renderRules(governing) {
      var fired = unique((state.rulesFired || []).concat([governing.rule, "r4"]));
      host.querySelector("[data-rule-stack]").innerHTML = ["r1", "r2", "r3", "r4"].map(function (ruleId) {
        var rule = copy.rules[ruleId];
        var active = fired.indexOf(ruleId) !== -1;
        var current = governing.rule === ruleId;
        return '<div class="ac-rule-row' + (active ? ' is-fired' : '') + (current ? ' is-current' : '') + '"><span>' + esc(rule.id) + '</span><div><b>' + esc(rule.name) + '</b><small>' + esc(active ? copy.states[current ? governing.state : "open"] : "—") + '</small></div><i></i></div>';
      }).join("");
    }

    function renderEvents() {
      host.querySelector("[data-events]").innerHTML = state.events.map(function (event, index) {
        return '<li class="is-' + esc(event.tone) + '"><i></i><span>' + esc(event.label) + '</span><time>' + (index === 0 ? esc(copy.now) : esc(event.time)) + '</time></li>';
      }).join("");
      host.querySelector("[data-audit-lines]").innerHTML = state.events.slice(0, 3).map(function (event, index) {
        return '<span class="' + (index === 0 ? "is-new" : "") + '"><time>' + esc(event.time) + '</time><b>' + esc(short(event.label, 35)) + '</b></span>';
      }).join("");
    }

    function renderInspector(governing) {
      var node = state.selected;
      var nodeCopy = copy.nodes[node];
      var filled = FIELD_KEYS.filter(function (field) { return state.brief[field]; }).length;
      var action = copy.actions[governing.state] || copy.actions.open;
      var meta;
      if (node === "signal") meta = [[copy.sourceLabel, copy.channels[state.channel]], [copy.stateLabel, state.messages.length ? copy.events.received : copy.noSignal]];
      else if (node === "variables") meta = [[copy.filledLabel, filled + " " + copy.of + " " + FIELD_KEYS.length], [copy.updateLabel, copy.now]];
      else if (node === "trigger") meta = [[copy.stateLabel, copy.states[governing.state]], [copy.rulesLabel, (copy.rules[governing.rule] || copy.rules.r4).id]];
      else if (node === "action") meta = [[copy.ownerLabel, action.owner], [copy.handoff, governing.handoff || copy.handoffs[governing.state]]];
      else meta = [[copy.updateLabel, copy.now], [copy.stateLabel, copy.rules.r4.name]];

      host.querySelector("[data-selected]").innerHTML = '<div class="ac-selected-head"><span class="ac-node-icon is-' + ({ signal: "cyan", variables: "violet", trigger: "gold", action: "coral", audit: "mint" }[node]) + '">' + icon(node) + '</span><span><small>' + esc(copy.selectedNode) + '</small><b>' + esc(nodeCopy.title) + '</b></span></div><p>' + esc(copy.inspectors[node]) + '</p><dl>' + meta.map(function (pair, index) { return '<div><dt>' + esc(pair[0]) + '</dt><dd>' + (index === 1 ? '<i></i>' : '') + esc(pair[1] || copy.empty) + '</dd></div>'; }).join("") + '</dl>';
    }

    function paint() {
      var governing = currentGovern();
      var rule = copy.rules[governing.rule] || copy.rules.r4;
      var action = copy.actions[governing.state] || copy.actions.open;
      var latestUser = state.messages.slice().reverse().find(function (message) { return message.role === "user"; });
      var filledCount = FIELD_KEYS.filter(function (field) { return state.brief[field]; }).length;

      root.dataset.stage = state.stage;
      root.dataset.state = governing.state || "open";
      root.dataset.channel = state.channel;
      root.classList.toggle("is-busy", state.busy);
      root.classList.toggle("has-signal", Boolean(latestUser));
      root.classList.toggle("has-fields", filledCount > 0);
      root.classList.toggle("has-decision", state.messages.some(function (message) { return message.role === "assistant"; }) || state.unreachable);
      sendButton.disabled = state.busy;
      input.disabled = state.busy;

      var stateLabel = host.querySelector("[data-state-label]");
      stateLabel.className = "ac-state is-" + (governing.state || "open");
      stateLabel.textContent = copy.states[governing.state] || copy.states.open;
      host.querySelector("[data-signal-value]").textContent = latestUser ? short(latestUser.content, 78) : copy.noSignal;
      host.querySelector("[data-signal-time]").textContent = latestUser ? clock() : "—";
      host.querySelector("[data-node-channel]").textContent = copy.channels[state.channel];
      host.querySelector("[data-rule-id]").textContent = "TRIGGER / " + rule.id;
      host.querySelector("[data-trigger-state]").textContent = copy.states[governing.state] || copy.states.open;
      host.querySelector("[data-rule-name]").textContent = rule.name;
      host.querySelector("[data-rule-detail]").textContent = governing.detail && copy.fields[governing.detail] ? rule.why + " · " + copy.fields[governing.detail] : rule.why;
      host.querySelector("[data-category]").textContent = copy.category + ": " + (state.categoryLabel || copy.empty);
      host.querySelector("[data-action-title]").textContent = action.title;
      host.querySelector("[data-action-detail]").textContent = action.detail;
      host.querySelector("[data-action-owner]").textContent = action.owner;
      host.querySelector("[data-provider]").textContent = state.provider || "—";
      host.querySelector("[data-footer-channel]").textContent = "CHANNEL / " + state.channel.toUpperCase();

      renderFields();
      renderSuggestions();
      renderRules(governing);
      renderEvents();
      renderInspector(governing);
    }

    function say(role, text, className) {
      var empty = stream.querySelector(".ac-empty");
      if (empty) empty.remove();
      var message = document.createElement("article");
      message.className = "ac-message " + (className || role);
      if (role === "out") {
        message.innerHTML = '<span class="ac-agent-avatar"><img src="/assets/falaq-symbol.png" alt=""></span><div><p>' + esc(text) + '</p><span>' + esc(copy.agent) + ' · ' + clock() + '</span></div>';
      } else {
        message.innerHTML = '<p>' + esc(text) + '</p><span>' + esc(copy.you) + ' · ' + clock() + '</span>';
      }
      stream.appendChild(message);
      stream.scrollTop = stream.scrollHeight;
      return message;
    }

    async function requestTurn(payload, pending) {
      var response;
      for (var attempt = 0; attempt <= RETRY_DELAYS.length; attempt += 1) {
        response = await transport(apiBase() + "/api/agent/turn", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (response.status !== 503 || attempt === RETRY_DELAYS.length) return response;
        pending.querySelector("p").textContent = copy.retrying + " " + (attempt + 2) + "/" + (RETRY_DELAYS.length + 1);
        await wait(RETRY_DELAYS[attempt]);
      }
      return response;
    }

    async function send(text) {
      text = String(text || "").trim();
      if (!text || state.busy) return;
      var previousBrief = Object.assign({}, state.brief);
      window.clearTimeout(updateTimer);
      window.clearTimeout(settleTimer);
      state.busy = true;
      state.unreachable = false;
      state.stage = "signal";
      state.changed = [];
      input.value = "";
      input.style.height = "auto";
      state.messages.push({ role: "user", content: text });
      addEvent(copy.events.received, "signal");
      say("in", text);
      var pending = say("out", copy.thinking, "out is-pending");
      selectNode("signal");
      paint();

      updateTimer = window.setTimeout(function () {
        if (!state.busy) return;
        state.stage = "variables";
        selectNode("variables");
        paint();
      }, 360);

      try {
        var response = await requestTurn({
          language: lang,
          category: state.category,
          channel: state.channel,
          messages: state.messages.slice(-16),
          brief: state.brief
        }, pending);
        var data = await response.json().catch(function () { return {}; });
        if (!response.ok) throw new Error(data.error || copy.genericError);

        state.brief = data.brief || state.brief;
        state.extracted = Array.isArray(data.extracted) ? data.extracted : [];
        state.category = data.category || state.category;
        state.categoryLabel = data.categoryLabel || state.categoryLabel;
        state.interest = data.interest || state.interest;
        state.governing = data.governing || fallbackGovern(state.brief, state.interest, false, copy);
        state.rulesFired = Array.isArray(data.rulesFired) ? data.rulesFired : [state.governing.rule, "r4"];
        state.provider = data.provider || state.provider;
        state.suggestions = Array.isArray(data.suggestions) && data.suggestions.length ? data.suggestions : state.suggestions;
        state.changed = FIELD_KEYS.filter(function (field) { return state.brief[field] && state.brief[field] !== previousBrief[field]; });
        state.changed.slice(0, 3).forEach(function (field) { addEvent(copy.events.extracted + ": " + copy.fields[field], "variable"); });
        addEvent(copy.events.governed + ": " + (copy.rules[state.governing.rule] || copy.rules.r4).id, state.governing.state || "accent");
        state.messages.push({ role: "assistant", content: data.reply || "" });
        pending.remove();
        say("out", data.reply || "");
        state.stage = "decision";
        selectNode("trigger");
      } catch (error) {
        pending.remove();
        state.unreachable = true;
        state.governing = fallbackGovern(state.brief, state.interest, true, copy);
        state.rulesFired = ["r3", "r4"];
        state.stage = "decision";
        addEvent(copy.events.error + ": R3", "review");
        say("out", error.message || copy.genericError, "out is-error");
        selectNode("trigger");
      } finally {
        state.busy = false;
        paint();
        input.focus();
        settleTimer = window.setTimeout(function () {
          state.changed = [];
          state.stage = "idle";
          paint();
        }, 1200);
      }
    }

    function selectNode(node) {
      if (!copy.nodes[node]) return;
      state.selected = node;
      host.querySelectorAll("[data-node]").forEach(function (item) {
        var selected = item.getAttribute("data-node") === node;
        item.classList.toggle("is-selected", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      if (host.querySelector("[data-selected]")) renderInspector(currentGovern());
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      send(input.value);
    });

    input.addEventListener("input", function () {
      input.style.height = "auto";
      input.style.height = Math.min(input.scrollHeight, 104) + "px";
    });

    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        form.requestSubmit();
      }
    });

    host.querySelector(".ac-channels").addEventListener("click", function (event) {
      var button = event.target.closest("[data-channel-button]");
      if (!button || state.busy) return;
      state.channel = button.getAttribute("data-channel-button");
      host.querySelectorAll("[data-channel-button]").forEach(function (item) {
        var active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      addEvent(copy.events.channel + " " + copy.channels[state.channel], "quiet");
      paint();
    });

    host.querySelector("[data-suggestions]").addEventListener("click", function (event) {
      var button = event.target.closest("[data-suggestion]");
      if (button) send(button.getAttribute("data-suggestion"));
    });

    host.querySelectorAll("[data-node]").forEach(function (node) {
      node.addEventListener("click", function () { selectNode(node.getAttribute("data-node")); });
    });

    transport(apiBase() + "/api/agent/status", { cache: "no-store" })
      .then(function (response) { return response.ok ? response.json() : null; })
      .then(function (data) { if (data && data.mode) { state.provider = data.mode === "ai" ? "AI" : "LOCAL"; paint(); } })
      .catch(function () {});

    paint();
    return {
      send: send,
      selectNode: selectNode,
      getState: function () { return JSON.parse(JSON.stringify(state)); },
      destroy: function () { window.clearTimeout(updateTimer); window.clearTimeout(settleTimer); host.innerHTML = ""; }
    };
  }

  if (typeof window !== "undefined") window.FalaqConsole = { mount: mount };
})();
