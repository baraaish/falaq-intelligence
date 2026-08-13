const CONFIG = window.FALAQ_CONFIG || {};

const en = {
  nav: { solutions: "Solutions", industries: "Industries", about: "About", contact: "Contact", lang: "العربية", cta: "Request a Review" },
  home: {
    eyebrow: "AI agents for real business work",
    title: "Stop losing work to slow follow-up and manual handoffs.",
    lead: "Falaq builds AI agents that respond to customers, qualify requests, prepare handoffs, and update your tools so your team can act faster without adding another inbox to manage.",
    primary: "Review my workflow",
    secondary: "See the solutions",
    signals: [["New leads", "Answered while intent is fresh"], ["Follow-up", "Tracked before it slips"], ["Tools", "WhatsApp, CRM, email, sheets"]],
    sections: {
      focusEyebrow: "Where leakage starts",
      focusTitle: "Your team does not need another chatbot. It needs cleaner execution.",
      focusText: "Leads, bookings, requests, and follow-ups often break in the same places: delayed replies, missing details, unclear ownership, and systems that are updated too late.",
      solutionsTitle: "Seven agents built around business outcomes",
      industriesTitle: "Built for operational teams, not demo screens",
      processEyebrow: "Implementation",
      processTitle: "Start small. Prove value. Expand only where it works.",
      processText: "We begin with one workflow that is repetitive, measurable, and painful enough to matter.",
      metrics: ["Capture", "Qualify", "Follow up", "Handoff"],
      processSteps: ["Map the workflow and the exact points where work gets delayed.", "Define agent rules, approved messages, and human escalation paths.", "Connect only the tools needed for the first pilot.", "Launch, review real usage, then improve before expanding."]
    }
  },
  about: {
    title: "We build AI agents for the work that falls between people and systems.",
    lead: "Falaq helps businesses automate repetitive operational steps without turning the company into a software project. The goal is simple: faster response, cleaner handoff, and fewer missed tasks.",
    storyTitle: "Why Falaq",
    story: "Falaq means the first clear signal after darkness. That is how we think useful AI should work: take scattered messages, forms, and notes, turn them into a clear next step, and move the operation forward.",
    teamTitle: "Team",
    teamLead: "A focused founding team covering solution design, business development, and marketing analysis."
  },
  contact: {
    title: "Show us the workflow that is slowing your team down.",
    lead: "Send the process as it works today: where the request comes from, who handles it, what gets delayed, and which tools are involved. We will suggest a practical starting point.",
    direct: "Direct contact",
    formTitle: "Workflow review request"
  },
  thanks: {
    title: "Thank you. Your inquiry is ready.",
    lead: "If the form endpoint is connected, your request has been submitted. You can also contact Falaq directly through WhatsApp or email."
  },
  labels: {
    name: "Full name", company: "Company name", email: "Work email", phone: "WhatsApp number", country: "Country",
    interest: "Main area of interest", message: "What workflow do you want to automate?", method: "Preferred contact method",
    submit: "Send request", whatsapp: "WhatsApp", emailContact: "Email"
  }
};

const ar = {
  nav: { solutions: "الحلول", industries: "القطاعات", about: "عن فلق", contact: "تواصل", lang: "English", cta: "اطلب مراجعة" },
  home: {
    eyebrow: "وكلاء ذكاء اصطناعي للعمل الحقيقي",
    title: "لا تدع المتابعة البطيئة والتسليم اليدوي يضيّعان الفرص.",
    lead: "فلق تبني وكلاء ذكاء اصطناعي يردون على العملاء، يؤهلون الطلبات، يجهزون ملخصات للفريق، ويحدثون أدوات العمل حتى يتحرك الفريق بسرعة ووضوح.",
    primary: "راجع سير عملي",
    secondary: "استعرض الحلول",
    signals: [["العملاء الجدد", "رد أسرع قبل أن يبرد الاهتمام"], ["المتابعة", "واضحة قبل أن تُنسى"], ["الأدوات", "واتساب، CRM، بريد، جداول"]],
    sections: {
      focusEyebrow: "أين يبدأ التسرب",
      focusTitle: "فريقك لا يحتاج روبوت محادثة آخر. يحتاج تنفيذًا أوضح.",
      focusText: "العملاء، الحجوزات، الطلبات، والمتابعات غالبًا تتعطل في نقاط متكررة: رد متأخر، بيانات ناقصة، مسؤولية غير واضحة، وأنظمة لا تُحدّث في الوقت المناسب.",
      solutionsTitle: "سبعة وكلاء مبنيون حول نتيجة عملية",
      industriesTitle: "للعمل التشغيلي، لا للعروض التجريبية فقط",
      processEyebrow: "التنفيذ",
      processTitle: "ابدأ صغيرًا. أثبت القيمة. وسّع فقط حيث تظهر النتيجة.",
      processText: "نبدأ بسير عمل واحد متكرر، قابل للقياس، ومؤثر بما يكفي ليستحق الأتمتة.",
      metrics: ["التقاط", "تأهيل", "متابعة", "تسليم"],
      processSteps: ["نرسم سير العمل ونحدد أين يتأخر التنفيذ فعليًا.", "نحدد قواعد الوكيل، الرسائل المعتمدة، ومسارات التصعيد البشري.", "نربط الأدوات الضرورية فقط للمرحلة الأولى.", "نطلق التجربة، نراجع الاستخدام الحقيقي، ثم نحسّن قبل التوسع."]
    }
  },
  about: {
    title: "نبني وكلاء ذكاء اصطناعي للعمل الذي يضيع بين الأشخاص والأنظمة.",
    lead: "فلق تساعد الشركات على أتمتة الخطوات التشغيلية المتكررة دون تحويل العمل إلى مشروع تقني معقد. الهدف: رد أسرع، تسليم أوضح، ومهام أقل ضياعًا.",
    storyTitle: "لماذا فلق",
    story: "فلق هو أول وضوح بعد العتمة. هكذا يجب أن يعمل الذكاء الاصطناعي المفيد: يأخذ الرسائل والنماذج والملاحظات المتفرقة، يحولها إلى خطوة تالية واضحة، ويدفع العمل للأمام.",
    teamTitle: "الفريق",
    teamLead: "فريق تأسيسي مركز يجمع تصميم الحلول، تطوير الأعمال، وتحليل التسويق."
  },
  contact: {
    title: "أرِنا سير العمل الذي يبطئ فريقك.",
    lead: "أرسل كيف تتم العملية اليوم: من أين يأتي الطلب، من يتعامل معه، أين يحدث التأخير، وما الأدوات المستخدمة. سنقترح نقطة بداية عملية.",
    direct: "تواصل مباشر",
    formTitle: "طلب مراجعة سير عمل"
  },
  thanks: {
    title: "شكرًا لك. تم تجهيز طلبك.",
    lead: "إذا كان رابط الإرسال مربوطًا، فقد وصل الطلب. ويمكنك أيضًا التواصل مباشرة عبر واتساب أو البريد الإلكتروني."
  },
  labels: {
    name: "الاسم الكامل", company: "اسم الشركة", email: "البريد العملي", phone: "رقم واتساب", country: "الدولة",
    interest: "مجال الاهتمام", message: "ما سير العمل الذي تريد أتمتته؟", method: "طريقة التواصل المفضلة",
    submit: "إرسال الطلب", whatsapp: "واتساب", emailContact: "البريد الإلكتروني"
  }
};

// ── Icons (raw inline SVG, 24x24) ───────────────────────────────────────────
const ICONS = {
  clock: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"></circle><path d="M12 7v5l3 2"></path></svg>`,
  target: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"></circle><circle cx="12" cy="12" r="3"></circle><path d="M12 2v3M12 19v3M2 12h3M19 12h3"></path></svg>`,
  bell: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7"></path><path d="M10 20a2 2 0 0 0 4 0"></path></svg>`,
  database: `<svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="5" rx="7" ry="3"></ellipse><path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5"></path><path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"></path></svg>`,
  inbox: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16l-2 10H6L4 4Z"></path><path d="M6 14l2 4h8l2-4"></path></svg>`,
  filter: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16l-6 7v5l-4 2v-7L4 5Z"></path></svg>`,
  repeat: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 2l4 4-4 4"></path><path d="M3 11V9a3 3 0 0 1 3-3h15"></path><path d="M7 22l-4-4 4-4"></path><path d="M21 13v2a3 3 0 0 1-3 3H3"></path></svg>`,
  handoff: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 11h8"></path><path d="M12 7l4 4-4 4"></path><path d="M4 5h5"></path><path d="M15 19h5"></path><path d="M4 19h5"></path><path d="M15 5h5"></path></svg>`,
  calendar: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M16 3v4M8 3v4M3 10h18"></path></svg>`,
  phone: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"></path></svg>`,
  receipt: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 2h16v20l-3-2-2 2-2-2-2 2-2-2-2 2-3-2V2Z"></path><path d="M8 8h8M8 12h8M8 16h5"></path></svg>`,
  doc: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2h9l5 5v15H6V2Z"></path><path d="M14 2v6h6"></path><path d="M9 13h6M9 17h6"></path></svg>`,
  shield: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 4 5v6c0 5 3.4 8.6 8 11 4.6-2.4 8-6 8-11V5l-8-3Z"></path><path d="M9 12l2 2 4-4"></path></svg>`
};
function iconSvg(name) { return `<span class="icon-bubble">${ICONS[name] || ICONS.target}</span>`; }
function iconCard(name) { return `<span class="card-icon">${ICONS[name] || ICONS.target}</span>`; }

// ── The seven Falaq agents ───────────────────────────────────────────────
const agents = [
  {
    slug: "lead-qualification",
    icon: "inbox",
    demoKind: "chat",
    en: {
      cardTitle: "Lead Qualification Agent",
      cardText: "Capture leads from WhatsApp, forms, and ads, score how serious they are, and route the hot ones before interest cools.",
      eyebrow: "Agent 01 · Sales intake",
      title: "Qualify every lead the moment it arrives, not whenever someone gets to it.",
      lead: "The agent receives new leads from WhatsApp, your website, and ad forms, asks the qualification questions your team already uses, scores fit and urgency, and logs a clean record before a human ever has to open the chat.",
      badges: ["WhatsApp + forms + ads", "Scoring your team defines", "Human handoff on every hot lead"],
      stats: [{ big: "&lt; 3", unit: "sec", label: "Time to first reply" }, { big: "24/7", unit: "", label: "Always answering" }, { big: "100%", unit: "", label: "New leads logged to CRM" }],
      painTitle: "Good leads go cold while a human gets around to replying.",
      painLead: "The intake step is where most pipeline value is lost — not because the leads are bad, but because the response, the questions, and the record-keeping are inconsistent.",
      pains: [
        ["Slow first reply", "A lead messages at peak interest and waits hours for a reply that could have taken seconds."],
        ["Inconsistent questions", "Every team member qualifies differently, so some leads arrive ready to close and others arrive with nothing useful."],
        ["No routing signal", "Hot, warm, and dead leads sit in the same inbox with no way to tell them apart at a glance."],
        ["CRM built after the fact", "The real conversation happens in WhatsApp; the CRM record is written later, if at all."]
      ],
      systemTitle: "What the agent actually does",
      systemLead: "A work agent scoped to one job — qualify and route — with clear rules for when a human takes over.",
      capabilities: [
        ["Captures the inquiry", "Receives leads from WhatsApp, website forms, and Meta lead ads the moment they arrive."],
        ["Asks approved questions", "Collects budget, timing, location, and decision-making authority using your team's own script."],
        ["Scores and classifies", "Applies weighted scoring rules to label each lead hot, warm, cold, or unqualified."],
        ["Hands off cleanly", "Books a meeting, alerts the rep, or logs the lead to CRM with the right next step attached."]
      ],
      flowTitle: "How a lead moves through the agent",
      flowLead: "This is the default path — it can be adapted to your qualification criteria and CRM.",
      flow: ["A new lead arrives from WhatsApp, a form, or an ad", "The agent replies within seconds using approved messaging", "It asks qualification questions one at a time, not a wall of text", "Budget, timing, location, and authority are scored against your rules", "Hot leads are routed to a rep or booked directly on the calendar", "Every lead — qualified or not — is logged with score and source"],
      demoTitle: "Qualification, live in WhatsApp",
      demoLead: "The agent asks the questions, scores the answers, and raises a hot-lead alert without anyone touching a keyboard.",
      integrationsTitle: "Connects to what you already run leads through",
      integrationsLead: "We start with the minimum needed to prove the workflow, then extend it.",
      integrations: ["WhatsApp Business", "Website forms", "Meta Lead Ads", "CRM", "Calendar"],
      ctaTitle: "Start with your busiest intake channel.",
      ctaLead: "Tell us where most of your leads arrive today and how they're qualified now. We'll scope a focused pilot around that channel.",
      demo: {
        title: "WhatsApp · Khaled Al-Mutairi",
        chat: [
          { from: "in", text: "Hi, I’m looking at villas in north Riyadh.", time: "3:47 AM" },
          { from: "out", text: "Hi Khaled 👋 We do have great options in north Riyadh. What’s your budget range?", time: "3:47 AM" },
          { from: "in", text: "Around 800K, looking to move within a month.", time: "3:48 AM" }
        ],
        score: { tags: ["Budget ✓", "Location ✓", "Timing ✓", "Decision maker ✓"], value: 87, label: "HOT" }
      }
    },
    ar: {
      cardTitle: "وكيل تأهيل العملاء المحتملين",
      cardText: "يستقبل العملاء من واتساب والنماذج والإعلانات، يقيّم جديتهم، ويوجّه الساخنين منهم قبل أن يبرد الاهتمام.",
      eyebrow: "الوكيل ٠١ · استقبال المبيعات",
      title: "أهّل كل عميل لحظة وصوله، لا حين يتفرغ له أحد.",
      lead: "يستقبل الوكيل العملاء الجدد من واتساب والموقع ونماذج الإعلانات، يطرح أسئلة التأهيل التي يعتمدها فريقك، يقيّم الملاءمة والجدية، ويسجل بيانات نظيفة قبل أن يفتح أي موظف المحادثة أصلًا.",
      badges: ["واتساب + نماذج + إعلانات", "تقييم يحدده فريقك", "تحويل بشري لكل عميل ساخن"],
      stats: [{ big: "&lt; ٣", unit: "ثانية", label: "زمن أول رد" }, { big: "24/7", unit: "", label: "استقبال متواصل" }, { big: "100%", unit: "", label: "تسجيل تلقائي في CRM" }],
      painTitle: "عملاء جادون يبردون بينما ينتظرون رد إنسان مشغول.",
      painLead: "أكبر ضياع في المبيعات يحدث عند الاستقبال — ليس لأن العملاء سيئون، بل لأن الرد والأسئلة والتسجيل غير ثابتة من محادثة لأخرى.",
      pains: [
        ["رد بطيء", "العميل يرسل في لحظة اهتمام عالية، وينتظر ساعات لرد كان يمكن أن يستغرق ثوانٍ."],
        ["أسئلة غير موحدة", "كل موظف يؤهل بطريقة مختلفة، فيصل بعض العملاء جاهزين للإغلاق وبعضهم بلا معلومة مفيدة."],
        ["لا توجد إشارة توجيه", "العملاء الساخنون والباردون يجلسون في نفس صندوق الوارد دون طريقة للتمييز بينهم بنظرة سريعة."],
        ["CRM يُكتب لاحقًا", "المحادثة الحقيقية تحدث في واتساب، وسجل CRM يُكتب لاحقًا، إن كُتب أصلًا."]
      ],
      systemTitle: "ما الذي ينفذه الوكيل فعليًا؟",
      systemLead: "وكيل عمل مخصص لمهمة واحدة — التأهيل والتوجيه — بقواعد واضحة لمتى يتدخل الإنسان.",
      capabilities: [
        ["يلتقط الطلب", "يستقبل العملاء من واتساب ونماذج الموقع وإعلانات Meta لحظة وصولهم."],
        ["يطرح أسئلة معتمدة", "يجمع الميزانية والتوقيت والموقع وصلاحية القرار بنفس أسلوب فريقك."],
        ["يقيّم ويصنف", "يطبق قواعد تقييم مرجّحة لتصنيف كل عميل: ساخن، دافئ، بارد، أو غير مؤهل."],
        ["يسلّم بوضوح", "يحجز موعدًا، ينبه الموظف، أو يسجل العميل في CRM مع الخطوة التالية المناسبة."]
      ],
      flowTitle: "كيف يتحرك العميل داخل الوكيل",
      flowLead: "هذا هو المسار الافتراضي، ويمكن تعديله حسب معايير التأهيل ونظام CRM لديك.",
      flow: ["عميل جديد يصل من واتساب أو نموذج أو إعلان", "الوكيل يرد خلال ثوانٍ بنص معتمد", "يطرح أسئلة التأهيل واحدة تلو الأخرى، لا رسالة طويلة واحدة", "يقيّم الميزانية والتوقيت والموقع وصلاحية القرار وفق قواعدك", "العملاء الساخنون يوجَّهون لموظف أو يُحجز لهم موعد مباشرة", "كل عميل — مؤهل أو لا — يُسجل مع درجته ومصدره"],
      demoTitle: "التأهيل مباشرة داخل واتساب",
      demoLead: "الوكيل يطرح الأسئلة، يقيّم الإجابات، ويرفع تنبيه عميل ساخن دون أن يلمس أحد لوحة المفاتيح.",
      integrationsTitle: "يتصل بما تستقبل عليه عملاءك بالفعل",
      integrationsLead: "نبدأ بالحد الأدنى الكافي لإثبات سير العمل، ثم نوسّعه.",
      integrations: ["واتساب بزنس", "نماذج الموقع", "إعلانات Meta Lead", "CRM", "التقويم"],
      ctaTitle: "ابدأ بأكثر قناة استقبال ازدحامًا لديك.",
      ctaLead: "أخبرنا من أين يصل معظم عملائك اليوم وكيف يتم تأهيلهم حاليًا. سنحدد نطاق Pilot مركّز حول هذه القناة.",
      demo: {
        title: "واتساب · خالد المطيري",
        chat: [
          { from: "in", text: "السلام عليكم، أبي أستفسر عن الفلل شمال الرياض", time: "٣:٤٧ ص" },
          { from: "out", text: "وعليكم السلام خالد 👋 عندنا خيارات ممتازة شمال الرياض. وش ميزانيتك التقريبية؟", time: "٣:٤٧ ص" },
          { from: "in", text: "٨٠٠ ألف تقريباً، أبي أنتقل خلال شهر", time: "٣:٤٨ ص" }
        ],
        score: { tags: ["الميزانية ✓", "الموقع ✓", "التوقيت ✓", "صاحب القرار ✓"], value: 87, label: "ساخن" }
      }
    }
  },
  {
    slug: "quote-follow-up",
    icon: "repeat",
    demoKind: "table",
    en: {
      cardTitle: "Quote Follow-up Agent",
      cardText: "Follow up automatically after a quote goes out, flag buying intent, and stop deals from dying in silence.",
      eyebrow: "Agent 02 · Deal follow-up",
      title: "Stop losing deals to silence after the quote is sent.",
      lead: "The agent tracks every quote after it leaves your inbox, runs a follow-up sequence that stops the moment the customer replies, classifies objections, and tells your sales rep exactly when to step back in.",
      badges: ["Stops the moment they reply", "Classifies every objection", "No discounts issued automatically"],
      stats: [{ big: "4", unit: "", label: "Follow-ups run automatically" }, { big: "0", unit: "", label: "Messages sent after payment or reply" }, { big: "100%", unit: "", label: "Objections logged in CRM" }],
      painTitle: "The deal rarely dies at the quote. It dies in the silence after.",
      painLead: "A quote with no follow-up is a coin flip. Reps get busy, days pass, and buying intent quietly disappears without anyone noticing.",
      pains: [
        ["No follow-up cadence", "One unsent reminder is enough to lose a deal that was close to a decision."],
        ["Objections go untracked", "“Too expensive” and “need to check with my partner” are said out loud but never recorded anywhere."],
        ["No signal on intent", "A quote opened five times looks identical to one nobody has read, unless someone is watching closely."],
        ["Stale deal stages", "The CRM still says “quote sent” three weeks after the customer accepted or walked away."]
      ],
      systemTitle: "What the agent actually does",
      systemLead: "It runs the repetitive follow-up so your rep only steps in for the parts that need judgment: negotiation, discounts, and closing.",
      capabilities: [
        ["Tracks the quote", "Logs when it was sent, opened, and how many times it was viewed."],
        ["Classifies the reply", "Sorts responses into accepted, needs changes, price objection, comparing options, or no response."],
        ["Runs the sequence", "Sends a scoped set of follow-up touches and stops instantly on any reply."],
        ["Flags the rep", "Notifies your sales rep with the reason and the recommended next action."]
      ],
      flowTitle: "How a quote is followed up",
      flowLead: "A default sequence you can tune to your sales cycle and tone.",
      flow: ["Quote is sent and logged against the customer record", "Confirmation message goes out; opens are tracked where supported", "If there's no reply, a short follow-up sequence begins", "Any reply stops the sequence immediately", "The reply is classified and routed to the right next step", "Deal stage in CRM updates automatically"],
      demoTitle: "Quote tracker, live",
      demoLead: "Every quote's status updates in real time — including the moment a new one lands.",
      integrationsTitle: "Connects to how you already send quotes",
      integrationsLead: "Works alongside your existing quoting tool, CRM, and messaging channel.",
      integrations: ["Email", "CRM", "Quote / PDF tool", "WhatsApp", "Calendar"],
      ctaTitle: "Start with the quotes that go quiet.",
      ctaLead: "Send us how quotes are sent and followed up today. We'll suggest a pilot around the stage where deals are leaking.",
      demo: {
        title: "Quotes · follow-up tracker",
        cols: ["Client", "Value", "Sent", "Status"],
        rows: [
          { cells: ["Khaled Al-Mutairi", "$4,200", "2 days ago", "Follow-up 2"], pillClass: "warm", isNew: true },
          { cells: ["Sarah Al-Harbi", "$1,850", "5 days ago", "Objection: price"], pillClass: "hot" },
          { cells: ["Omar Nasser", "$6,000", "1 day ago", "Opened 3x"], pillClass: "warm" },
          { cells: ["Reem Al-Otaibi", "$2,400", "6 days ago", "Accepted"], pillClass: "ok" }
        ]
      }
    },
    ar: {
      cardTitle: "وكيل متابعة عروض الأسعار",
      cardText: "يتابع العميل تلقائيًا بعد إرسال العرض، يرصد نية الشراء، ويمنع ضياع الصفقات في صمت.",
      eyebrow: "الوكيل ٠٢ · متابعة الصفقات",
      title: "لا تدع الصفقة تموت في الصمت بعد إرسال العرض.",
      lead: "يتابع الوكيل كل عرض سعر بعد خروجه من صندوق الوارد، ينفذ تسلسل متابعة يتوقف فور رد العميل، يصنف الاعتراضات، ويخبر موظف المبيعات بالضبط متى يتدخل.",
      badges: ["يتوقف فور الرد", "يصنف كل اعتراض", "لا يصدر خصمًا تلقائيًا"],
      stats: [{ big: "٤", unit: "", label: "متابعات تلقائية" }, { big: "٠", unit: "", label: "رسائل بعد الدفع أو الرد" }, { big: "100%", unit: "", label: "اعتراضات مسجلة في CRM" }],
      painTitle: "الصفقة نادرًا ما تموت عند إرسال العرض. تموت في الصمت الذي يليه.",
      painLead: "عرض سعر بلا متابعة هو مقامرة. الموظف ينشغل، تمر الأيام، وتختفي نية الشراء دون أن ينتبه أحد.",
      pains: [
        ["لا يوجد تسلسل متابعة", "رسالة واحدة لم تُرسل كافية لضياع صفقة كانت قريبة من القرار."],
        ["اعتراضات غير مسجلة", "«السعر مرتفع» و«لازم أراجع شريكي» تُقال شفهيًا ولا تُسجل في أي مكان."],
        ["لا إشارة على النية", "عرض فُتح خمس مرات يبدو مطابقًا لعرض لم يفتحه أحد، ما لم يراقب أحد ذلك عن قرب."],
        ["مراحل CRM قديمة", "الـCRM لا يزال يقول «تم إرسال العرض» بعد ثلاثة أسابيع من قبول العميل أو انسحابه."]
      ],
      systemTitle: "ما الذي ينفذه الوكيل فعليًا؟",
      systemLead: "ينفذ المتابعة المتكررة حتى يتدخل موظفك فقط فيما يحتاج قرارًا: التفاوض، الخصومات، والإغلاق.",
      capabilities: [
        ["يتابع العرض", "يسجل وقت الإرسال، الفتح، وعدد مرات المشاهدة."],
        ["يصنف الرد", "يفرز الردود إلى: قبول، يحتاج تعديلًا، اعتراض على السعر، يقارن، أو بلا رد."],
        ["ينفذ التسلسل", "يرسل مجموعة متابعات محددة ويتوقف فورًا عند أي رد."],
        ["ينبه الموظف", "يخطر موظف المبيعات بالسبب والإجراء الموصى به."]
      ],
      flowTitle: "كيف يُتابع العرض",
      flowLead: "تسلسل افتراضي يمكن ضبطه حسب دورة مبيعاتك ونبرتك.",
      flow: ["يُرسل العرض ويُسجل في سجل العميل", "تُرسل رسالة تأكيد؛ يُتتبع الفتح إن كان مدعومًا", "عند عدم الرد، يبدأ تسلسل متابعة مختصر", "أي رد يوقف التسلسل فورًا", "يُصنف الرد ويُوجّه إلى الخطوة التالية المناسبة", "مرحلة الصفقة في CRM تتحدث تلقائيًا"],
      demoTitle: "متتبع العروض، مباشرة",
      demoLead: "حالة كل عرض تتحدث لحظيًا — بما في ذلك لحظة وصول عرض جديد.",
      integrationsTitle: "يتصل بالطريقة التي ترسل بها عروضك بالفعل",
      integrationsLead: "يعمل جنبًا إلى جنب مع أداة العروض وCRM وقناة التواصل لديك.",
      integrations: ["البريد الإلكتروني", "CRM", "أداة العروض / PDF", "واتساب", "التقويم"],
      ctaTitle: "ابدأ بالعروض التي تصمت.",
      ctaLead: "أرسل لنا كيف تُرسل العروض وتُتابع اليوم. سنقترح Pilot حول المرحلة التي تتسرب فيها الصفقات.",
      demo: {
        title: "العروض · متتبع المتابعة",
        cols: ["العميل", "القيمة", "الإرسال", "الحالة"],
        rows: [
          { cells: ["خالد المطيري", "٤,٢٠٠$", "قبل يومين", "متابعة ٢"], pillClass: "warm", isNew: true },
          { cells: ["سارة الحربي", "١,٨٥٠$", "قبل ٥ أيام", "اعتراض: السعر"], pillClass: "hot" },
          { cells: ["عمر ناصر", "٦,٠٠٠$", "قبل يوم", "فُتح ٣ مرات"], pillClass: "warm" },
          { cells: ["ريم العتيبي", "٢,٤٠٠$", "قبل ٦ أيام", "مقبول"], pillClass: "ok" }
        ]
      }
    }
  },
  {
    slug: "booking-recovery",
    icon: "calendar",
    demoKind: "calendar",
    en: {
      cardTitle: "Booking & Missed-Call Recovery",
      cardText: "Turn missed calls and messages into confirmed bookings, and cut down on no-shows and last-minute cancellations.",
      eyebrow: "Agent 03 · Scheduling",
      title: "Every missed call becomes a text, and every text becomes a booking.",
      lead: "The agent texts back missed calls within minutes, checks real availability, books the appointment without double-booking, and runs the reminder sequence that keeps people from just not showing up.",
      badges: ["Texts back missed calls", "Prevents double-booking", "Reminders + reschedule links"],
      stats: [{ big: "&lt; 2", unit: "min", label: "Missed-call response time" }, { big: "24/7", unit: "", label: "Booking availability" }, { big: "0", unit: "", label: "Double bookings" }],
      painTitle: "Missed calls are missed appointments — unless someone follows up fast.",
      painLead: "A caller who doesn't get through rarely calls back. And a booked appointment with no reminder is one bad morning away from a no-show.",
      pains: [
        ["Missed calls go unanswered", "By the time someone calls back, the customer has already booked with a competitor."],
        ["Manual back-and-forth", "Finding a time that works takes three or four messages instead of one."],
        ["No-shows with no warning", "A slot held for a day with no reminder is a slot likely wasted."],
        ["Double-booked slots", "Two staff booking off two calendars means conflicts nobody notices until the day of."]
      ],
      systemTitle: "What the agent actually does",
      systemLead: "It runs the entire scheduling loop — recovery, booking, confirmation, and no-show handling — against your real calendar.",
      capabilities: [
        ["Recovers the missed call", "Sends an automatic text within minutes and asks why they called."],
        ["Checks real availability", "Reads your calendar rules, service durations, and buffers before offering a time."],
        ["Confirms and reminds", "Sends confirmation, a reminder before the appointment, and a reschedule or cancel link."],
        ["Handles no-shows", "Flags no-shows, applies your policy, and offers a new slot automatically."]
      ],
      flowTitle: "How a missed call turns into a kept appointment",
      flowLead: "The default recovery-to-booking path, tuned to your working hours and staff.",
      flow: ["A call goes unanswered or a message arrives after hours", "An automatic text goes out within minutes asking how to help", "Available times are offered based on service type and staff", "The appointment is booked and added to the right calendar", "A reminder is sent before the appointment with a reschedule link", "No-shows are logged and offered a new slot per your policy"],
      demoTitle: "Calendar, filling itself in",
      demoLead: "A missed call becomes a confirmed slot on the team calendar in one exchange.",
      integrationsTitle: "Connects to how your team already books",
      integrationsLead: "Starts with your calendar and messaging channel; phone-system integration is added where available.",
      integrations: ["Phone system", "Calendar", "WhatsApp", "SMS", "Payment gateway (deposits)"],
      ctaTitle: "Start with your busiest booking channel.",
      ctaLead: "Tell us how appointments get booked today and where no-shows hurt the most. We'll scope a focused pilot.",
      demo: {
        title: "Team calendar",
        days: ["MON", "TUE", "WED", "THU", "FRI"],
        hours: ["9:00", "11:00", "1:00", "3:00"],
        booked: { day: 2, hour: 2, label: "Khaled · Viewing 1:00–1:45" }
      }
    },
    ar: {
      cardTitle: "وكيل الحجز واستعادة المكالمات الفائتة",
      cardText: "يحول المكالمات والرسائل الفائتة إلى مواعيد مؤكدة، ويقلل حالات عدم الحضور والإلغاء في اللحظة الأخيرة.",
      eyebrow: "الوكيل ٠٣ · الجدولة",
      title: "كل مكالمة فائتة تتحول إلى رسالة، وكل رسالة تتحول إلى موعد.",
      lead: "يرسل الوكيل رسالة رد على المكالمات الفائتة خلال دقائق، يتحقق من الأوقات المتاحة فعليًا، يحجز الموعد دون تعارض، وينفذ تسلسل التذكير الذي يمنع عدم الحضور.",
      badges: ["رد نصي على المكالمات الفائتة", "يمنع الحجز المزدوج", "تذكيرات + روابط إعادة جدولة"],
      stats: [{ big: "&lt; ٢", unit: "دقيقة", label: "زمن الرد على المكالمة الفائتة" }, { big: "24/7", unit: "", label: "إتاحة الحجز" }, { big: "٠", unit: "", label: "حجوزات متعارضة" }],
      painTitle: "المكالمة الفائتة موعد ضائع — إلا إن تابعها أحد بسرعة.",
      painLead: "المتصل الذي لا يصل نادرًا ما يعاود الاتصال. والموعد المحجوز بلا تذكير على بعد صباح سيء واحد من التغيب.",
      pains: [
        ["مكالمات فائتة بلا رد", "بحلول وقت معاودة الاتصال، يكون العميل قد حجز عند منافس."],
        ["أخذ ورد يدوي", "إيجاد وقت مناسب يستغرق ثلاث أو أربع رسائل بدل رسالة واحدة."],
        ["تغيب دون إنذار", "موعد محجوز ليوم كامل بلا تذكير هو موعد مرشح للضياع."],
        ["حجوزات متعارضة", "موظفان يحجزان من تقويمين يعني تعارضًا لا ينتبه له أحد إلا يوم الموعد."]
      ],
      systemTitle: "ما الذي ينفذه الوكيل فعليًا؟",
      systemLead: "ينفذ دورة الجدولة كاملة — الاستعادة، الحجز، التأكيد، ومعالجة التغيب — مقابل تقويمك الفعلي.",
      capabilities: [
        ["يستعيد المكالمة الفائتة", "يرسل رسالة تلقائية خلال دقائق ويسأل عن سبب الاتصال."],
        ["يتحقق من الإتاحة الفعلية", "يقرأ قواعد تقويمك ومدد الخدمات والفواصل قبل عرض وقت."],
        ["يؤكد ويذكّر", "يرسل التأكيد، تذكيرًا قبل الموعد، ورابط إعادة جدولة أو إلغاء."],
        ["يعالج عدم الحضور", "يسجل حالات التغيب، يطبق سياستك، ويعرض موعدًا بديلًا تلقائيًا."]
      ],
      flowTitle: "كيف تتحول المكالمة الفائتة إلى موعد محضور",
      flowLead: "مسار الاستعادة إلى الحجز الافتراضي، مضبوط حسب ساعات عملك وموظفيك.",
      flow: ["مكالمة لم يُرد عليها أو رسالة وصلت خارج الدوام", "رسالة تلقائية تصل خلال دقائق تسأل كيف يمكن المساعدة", "تُعرض أوقات متاحة حسب نوع الخدمة والموظف", "يُحجز الموعد ويُضاف إلى التقويم الصحيح", "يُرسل تذكير قبل الموعد مع رابط إعادة جدولة", "حالات التغيب تُسجل ويُعرض موعد بديل وفق سياستك"],
      demoTitle: "التقويم يملأ نفسه",
      demoLead: "مكالمة فائتة تتحول إلى موعد مؤكد على تقويم الفريق في محادثة واحدة.",
      integrationsTitle: "يتصل بالطريقة التي يحجز بها فريقك بالفعل",
      integrationsLead: "يبدأ بتقويمك وقناة التواصل؛ يُضاف ربط نظام الاتصالات حيث يتوفر.",
      integrations: ["نظام الاتصالات", "التقويم", "واتساب", "الرسائل النصية", "بوابة الدفع (العربون)"],
      ctaTitle: "ابدأ بأكثر قناة حجز ازدحامًا لديك.",
      ctaLead: "أخبرنا كيف تُحجز المواعيد اليوم وأين يؤلم التغيب أكثر. سنحدد نطاق Pilot مركّز.",
      demo: {
        title: "تقويم الفريق",
        days: ["الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"],
        hours: ["٩:٠٠", "١١:٠٠", "١:٠٠", "٣:٠٠"],
        booked: { day: 2, hour: 2, label: "خالد · معاينة ١:٠٠-١:٤٥" }
      }
    }
  },
  {
    slug: "customer-service",
    icon: "shield",
    demoKind: "chat",
    en: {
      cardTitle: "Customer Service Resolution Agent",
      cardText: "Resolves repetitive support requests end to end — inside your systems, not just with a canned answer.",
      eyebrow: "Agent 04 · Support execution",
      title: "An agent that finishes the request, not just answers it.",
      lead: "Beyond answering from a knowledge base, the agent verifies identity, reads order status, resends invoices, opens returns, and books maintenance — all within permissions your team defines — then escalates the moment a case needs a human.",
      badges: ["Executes approved actions", "Verifies identity first", "Escalates with full context"],
      stats: [{ big: "24/7", unit: "", label: "Always-on coverage" }, { big: "100%", unit: "", label: "Actions logged and auditable" }, { big: "&lt; 1", unit: "min", label: "Typical first response" }],
      painTitle: "Most support tickets are the same five requests, answered manually every time.",
      painLead: "Resending an invoice or updating an address doesn't need a person — but today it usually waits in the same queue as an actual complaint.",
      pains: [
        ["Repetitive requests eat staff time", "The same handful of questions and actions repeat all day, every day."],
        ["Simple actions require a human", "Resending a document or updating a phone number still needs someone to open a system and do it."],
        ["No consistent trail", "What was promised to a customer three weeks ago is hard to find when it matters."],
        ["Urgent cases lost in the queue", "A real complaint sits behind ten routine questions with no way to jump the line."]
      ],
      systemTitle: "What the agent actually does",
      systemLead: "It is not a chatbot that only replies — it executes approved actions inside your systems, with a hard boundary on what it can do alone.",
      capabilities: [
        ["Verifies the customer", "Confirms identity before reading or changing any account data."],
        ["Answers from approved knowledge", "Pulls from your FAQs, policies, pricing, and warranty terms — never invents an answer."],
        ["Executes permitted actions", "Resends invoices, updates details, opens returns, books maintenance, or opens a ticket."],
        ["Escalates with context", "Hands off to staff with a summary the moment a case is sensitive, urgent, or out of scope."]
      ],
      flowTitle: "How a support request is handled",
      flowLead: "The default resolution path — permissions and escalation rules are set by your team.",
      flow: ["A message arrives on any connected channel", "Identity is verified before anything is read or changed", "The request is classified and urgency is scored", "An approved answer or action is delivered", "The customer is told exactly what happened", "The case is logged; anything sensitive is escalated with context"],
      demoTitle: "A request, resolved in one thread",
      demoLead: "No hold queue, no repeated explanation — the action happens inside the conversation.",
      integrationsTitle: "Connects to your support and order systems",
      integrationsLead: "Works across channels while staying inside the permissions you set.",
      integrations: ["WhatsApp", "Email", "CRM / order system", "Helpdesk", "Knowledge base"],
      ctaTitle: "Start with your top five repeat requests.",
      ctaLead: "Send us the requests your support team handles most often. We'll scope which ones the agent can safely take end to end.",
      demo: {
        title: "Support inbox · Sara",
        chat: [
          { from: "in", text: "Can you resend the invoice for order #4821? I lost the email.", time: "10:12 AM" },
          { from: "out", text: "Sure — verifying your account now.", time: "10:12 AM" },
          { from: "out", text: "Done! Invoice for #4821 resent to your email on file.", time: "10:13 AM" }
        ],
        resolution: "Ticket #4821 · resolved automatically"
      }
    },
    ar: {
      cardTitle: "وكيل خدمة العملاء التنفيذي",
      cardText: "يحل طلبات الدعم المتكررة من البداية للنهاية — داخل أنظمتك، لا بمجرد إجابة جاهزة.",
      eyebrow: "الوكيل ٠٤ · تنفيذ الدعم",
      title: "وكيل ينهي الطلب، لا يكتفي بالرد عليه.",
      lead: "إلى جانب الإجابة من قاعدة المعرفة، يتحقق الوكيل من الهوية، يقرأ حالة الطلب، يعيد إرسال الفواتير، يفتح طلبات الإرجاع، ويحجز الصيانة — كل ذلك ضمن صلاحيات يحددها فريقك — ثم يصعّد الحالة لحظة احتياجها لإنسان.",
      badges: ["ينفذ إجراءات معتمدة", "يتحقق من الهوية أولًا", "يصعّد مع السياق الكامل"],
      stats: [{ big: "24/7", unit: "", label: "تغطية متواصلة" }, { big: "100%", unit: "", label: "إجراءات مسجلة وقابلة للتدقيق" }, { big: "&lt; ١", unit: "دقيقة", label: "متوسط أول رد" }],
      painTitle: "معظم تذاكر الدعم هي نفس الخمسة طلبات، تُجاب يدويًا في كل مرة.",
      painLead: "إعادة إرسال فاتورة أو تحديث عنوان لا يحتاج إنسانًا — لكنه اليوم غالبًا ينتظر في نفس طابور الشكوى الحقيقية.",
      pains: [
        ["طلبات متكررة تستهلك وقت الموظفين", "نفس الأسئلة والإجراءات القليلة تتكرر طوال اليوم، كل يوم."],
        ["إجراءات بسيطة تحتاج إنسانًا", "إعادة إرسال مستند أو تحديث رقم هاتف لا يزال يحتاج فتح نظام وتنفيذه يدويًا."],
        ["لا سجل ثابت", "ما وُعد به العميل قبل ثلاثة أسابيع يصعب إيجاده حين تحتاجه."],
        ["حالات عاجلة تضيع في الطابور", "شكوى حقيقية تنتظر خلف عشرة أسئلة روتينية دون طريقة لتخطي الدور."]
      ],
      systemTitle: "ما الذي ينفذه الوكيل فعليًا؟",
      systemLead: "ليس روبوت محادثة يكتفي بالرد — بل ينفذ إجراءات معتمدة داخل أنظمتك، بحدود صارمة لما يمكنه فعله وحده.",
      capabilities: [
        ["يتحقق من العميل", "يؤكد الهوية قبل قراءة أو تعديل أي بيانات حساب."],
        ["يجيب من معرفة معتمدة", "يستقي من الأسئلة الشائعة والسياسات والأسعار وشروط الضمان — لا يخترع إجابة أبدًا."],
        ["ينفذ إجراءات مسموحة", "يعيد إرسال الفواتير، يحدث البيانات، يفتح الإرجاع، يحجز الصيانة، أو يفتح تذكرة."],
        ["يصعّد مع السياق", "يحول للموظف مع ملخص لحظة أن تكون الحالة حساسة أو عاجلة أو خارج نطاقه."]
      ],
      flowTitle: "كيف يُعالج طلب الدعم",
      flowLead: "مسار الحل الافتراضي — الصلاحيات وقواعد التصعيد يحددها فريقك.",
      flow: ["تصل رسالة على أي قناة متصلة", "تُتحقق الهوية قبل قراءة أو تعديل أي شيء", "يُصنف الطلب وتُقاس درجة الاستعجال", "تُقدَّم إجابة أو إجراء معتمد", "يُخبَر العميل بالضبط بما حدث", "تُسجل الحالة؛ وأي حالة حساسة تُصعّد مع السياق"],
      demoTitle: "طلب، يُحل في محادثة واحدة",
      demoLead: "لا طابور انتظار، لا تكرار للشرح — الإجراء يحدث داخل المحادثة نفسها.",
      integrationsTitle: "يتصل بأنظمة الدعم والطلبات لديك",
      integrationsLead: "يعمل عبر القنوات مع البقاء ضمن الصلاحيات التي تحددها.",
      integrations: ["واتساب", "البريد الإلكتروني", "CRM / نظام الطلبات", "نظام التذاكر", "قاعدة المعرفة"],
      ctaTitle: "ابدأ بأكثر خمسة طلبات متكررة لديك.",
      ctaLead: "أرسل لنا الطلبات التي يتعامل معها فريق الدعم أكثر من غيرها. سنحدد أيها يمكن للوكيل تنفيذها بأمان من البداية للنهاية.",
      demo: {
        title: "صندوق الدعم · سارة",
        chat: [
          { from: "in", text: "ممكن تعيدون إرسال فاتورة الطلب #4821؟ فقدت الإيميل", time: "١٠:١٢ ص" },
          { from: "out", text: "تمام — جاري التحقق من حسابك الآن", time: "١٠:١٢ ص" },
          { from: "out", text: "تم! فاتورة الطلب #4821 أُرسلت مجددًا لبريدك المسجل", time: "١٠:١٣ ص" }
        ],
        resolution: "تذكرة #4821 · حُلّت تلقائيًا"
      }
    }
  },
  {
    slug: "accounts-receivable",
    icon: "receipt",
    demoKind: "aging",
    en: {
      cardTitle: "Accounts Receivable Agent",
      cardText: "Follows up overdue invoices before and after the due date, logs payment promises, and stops the moment payment lands.",
      eyebrow: "Agent 05 · Collections",
      title: "Get paid without your accounting team chasing every invoice by hand.",
      lead: "The agent reminds customers before invoices are due, escalates through aging buckets after they're overdue, records every promise to pay, and routes disputes straight to accounting instead of arguing about them.",
      badges: ["No threats, no aggressive tone", "Stops automatically after payment", "Every promise to pay logged"],
      stats: [{ big: "4", unit: "", label: "Aging buckets tracked automatically" }, { big: "0", unit: "", label: "Reminders sent after payment" }, { big: "100%", unit: "", label: "Payment promises logged" }],
      painTitle: "Cash sits uncollected because chasing invoices is manual and easy to deprioritize.",
      painLead: "Someone has to remember which invoice is 12 days late versus 45, what was promised, and who to nudge next — every single week.",
      pains: [
        ["Manual chasing", "Reminders go out only when someone remembers to send them."],
        ["No visibility into promises", "“I'll pay Friday” is said on a call and never tracked anywhere."],
        ["Objections mixed with delay", "A real billing dispute gets the same reminder as a customer who simply forgot."],
        ["Aging reports built by hand", "Someone exports a spreadsheet to know who's overdue and by how much."]
      ],
      systemTitle: "What the agent actually does",
      systemLead: "A professional, consistent collections cadence — with hard limits on what it's allowed to offer.",
      capabilities: [
        ["Sends the reminder", "Pre-due, on-due, and overdue reminders with a payment link attached."],
        ["Buckets by age", "Classifies overdue accounts and applies the right sequence for each stage."],
        ["Logs promises to pay", "Records what was promised and follows up automatically if it's missed."],
        ["Routes disputes", "Pauses the sequence and sends objections straight to accounting instead of escalating tone."]
      ],
      flowTitle: "How an invoice is collected",
      flowLead: "The default cycle — discount and extension rules stay with your accounting team.",
      flow: ["Invoice is sent and confirmed received", "A reminder goes out before the due date", "On the due date, payment methods are offered again", "After the due date, the account is bucketed by how overdue it is", "Each bucket gets a different, escalating sequence", "Payment or a promise is logged and the sequence stops"],
      demoTitle: "Aging, tracked automatically",
      demoLead: "Every overdue account bucketed by age, updated as payments and promises come in.",
      integrationsTitle: "Connects to your billing and payment tools",
      integrationsLead: "Reads invoice status from your accounting system and sends through the channel your customers actually use.",
      integrations: ["Accounting software", "Payment gateway", "Email", "WhatsApp"],
      ctaTitle: "Start with your oldest bucket.",
      ctaLead: "Send us how collections work today — who sends reminders, and where accounts get stuck. We'll suggest a focused pilot.",
      demo: {
        title: "Accounts receivable · aging",
        buckets: [
          { label: "1–7 days", value: "$8,400", pct: 30, color: "var(--ok)" },
          { label: "8–30 days", value: "$14,200", pct: 55, color: "var(--gold)" },
          { label: "31–60 days", value: "$5,100", pct: 22, color: "var(--hot)" },
          { label: "60+ days", value: "$2,300", pct: 12, color: "#c74a38" }
        ]
      }
    },
    ar: {
      cardTitle: "وكيل تحصيل الفواتير المتأخرة",
      cardText: "يتابع الفواتير قبل وبعد الاستحقاق، يسجل وعود السداد، ويتوقف فور وصول الدفعة.",
      eyebrow: "الوكيل ٠٥ · التحصيل",
      title: "احصل على مستحقاتك دون أن يطارد فريق المحاسبة كل فاتورة يدويًا.",
      lead: "يذكّر الوكيل العملاء قبل استحقاق الفواتير، يصعّد عبر شرائح التأخير بعد الاستحقاق، يسجل كل وعد سداد، ويوجّه الاعتراضات مباشرة إلى المحاسبة بدل الجدال حولها.",
      badges: ["لا تهديد ولا نبرة عدائية", "يتوقف تلقائيًا بعد السداد", "كل وعد سداد يُسجل"],
      stats: [{ big: "٤", unit: "", label: "شرائح تأخير تُتابع تلقائيًا" }, { big: "٠", unit: "", label: "تذكيرات بعد السداد" }, { big: "100%", unit: "", label: "وعود السداد المسجلة" }],
      painTitle: "المال يبقى غير محصّل لأن متابعة الفواتير يدوية وسهلة التأجيل.",
      painLead: "أحدهم يجب أن يتذكر أي فاتورة متأخرة ١٢ يومًا مقابل ٤٥، وما وُعد به، ومن يجب تذكيره تاليًا — كل أسبوع.",
      pains: [
        ["مطاردة يدوية", "التذكيرات تُرسل فقط حين يتذكر أحد إرسالها."],
        ["لا رؤية على الوعود", "«سأدفع الجمعة» تُقال في مكالمة ولا تُسجل في أي مكان."],
        ["اعتراضات تختلط بالتأخير", "نزاع فوترة حقيقي يحصل على نفس التذكير الذي يحصل عليه عميل نسي فقط."],
        ["تقارير أعمار ديون تُبنى يدويًا", "أحدهم يصدّر جدول بيانات ليعرف من المتأخر وبكم."]
      ],
      systemTitle: "ما الذي ينفذه الوكيل فعليًا؟",
      systemLead: "وتيرة تحصيل مهنية وثابتة — بحدود صارمة لما يُسمح له بعرضه.",
      capabilities: [
        ["يرسل التذكير", "تذكيرات قبل الاستحقاق، عند الاستحقاق، وبعد التأخير مع رابط دفع مرفق."],
        ["يصنف حسب العمر", "يصنف الحسابات المتأخرة ويطبق التسلسل المناسب لكل مرحلة."],
        ["يسجل وعود السداد", "يسجل ما وُعد به ويتابع تلقائيًا إن لم يُنفذ."],
        ["يوجّه الاعتراضات", "يوقف التسلسل ويرسل الاعتراضات مباشرة إلى المحاسبة بدل تصعيد النبرة."]
      ],
      flowTitle: "كيف تُحصَّل الفاتورة",
      flowLead: "الدورة الافتراضية — قواعد الخصم والتمديد تبقى بيد فريق المحاسبة لديك.",
      flow: ["تُرسل الفاتورة ويُؤكد استلامها", "يُرسل تذكير قبل تاريخ الاستحقاق", "عند الاستحقاق، تُعرض وسائل الدفع مجددًا", "بعد الاستحقاق، يُصنف الحساب حسب مدة التأخير", "كل شريحة تحصل على تسلسل متصاعد مختلف", "تُسجل الدفعة أو الوعد ويتوقف التسلسل"],
      demoTitle: "أعمار الديون، تُتابع تلقائيًا",
      demoLead: "كل حساب متأخر مصنف حسب عمره، ويتحدث فور وصول الدفعات والوعود.",
      integrationsTitle: "يتصل بأدوات الفوترة والدفع لديك",
      integrationsLead: "يقرأ حالة الفاتورة من نظام المحاسبة ويرسل عبر القناة التي يستخدمها عملاؤك فعليًا.",
      integrations: ["نظام المحاسبة", "بوابة الدفع", "البريد الإلكتروني", "واتساب"],
      ctaTitle: "ابدأ بأقدم شريحة لديك.",
      ctaLead: "أرسل لنا كيف يعمل التحصيل اليوم — من يرسل التذكيرات، وأين تتعثر الحسابات. سنقترح Pilot مركّز.",
      demo: {
        title: "الذمم المدينة · أعمار الديون",
        buckets: [
          { label: "١–٧ أيام", value: "٨,٤٠٠$", pct: 30, color: "var(--ok)" },
          { label: "٨–٣٠ يومًا", value: "١٤,٢٠٠$", pct: 55, color: "var(--gold)" },
          { label: "٣١–٦٠ يومًا", value: "٥,١٠٠$", pct: 22, color: "var(--hot)" },
          { label: "أكثر من ٦٠ يومًا", value: "٢,٣٠٠$", pct: 12, color: "#c74a38" }
        ]
      }
    }
  },
  {
    slug: "document-processing",
    icon: "doc",
    demoKind: "extraction",
    en: {
      cardTitle: "Document Processing Agent",
      cardText: "Reads incoming invoices and documents, extracts the fields, checks them against your rules, and only logs what it's confident about.",
      eyebrow: "Agent 06 · Document intake",
      title: "Stop retyping the same invoice fields by hand, every time.",
      lead: "The agent receives documents from email, shared folders, or WhatsApp, classifies them, extracts the fields your accounting system needs, checks them against your rules, and only auto-logs entries it's actually confident about.",
      badges: ["Confidence-scored extraction", "Duplicate and PO checks built in", "Low-confidence fields go to review"],
      stats: [{ big: "13+", unit: "", label: "Document types supported" }, { big: "3", unit: "", label: "Confidence tiers per field" }, { big: "0", unit: "", label: "Low-confidence entries auto-approved" }],
      painTitle: "Someone is still retyping vendor invoices into your system by hand.",
      painLead: "Manual data entry is slow and error-prone, and duplicate or mismatched invoices slip through when nobody has time to double-check every field.",
      pains: [
        ["Manual data entry", "Every invoice field gets retyped by hand from a PDF or scan."],
        ["Duplicates slip through", "The same invoice arrives twice under a slightly different name or number."],
        ["Missing fields found too late", "A missing PO number or tax ID surfaces during month-end close, not on arrival."],
        ["Manual approval routing", "Someone has to know which document goes to which approver, every time."]
      ],
      systemTitle: "What the agent actually does",
      systemLead: "It reads, extracts, and verifies — then routes by how confident it actually is, not a single all-or-nothing pass.",
      capabilities: [
        ["Classifies the document", "Identifies type, vendor, language, and quality on arrival."],
        ["Extracts the fields", "Pulls vendor, invoice number, dates, amounts, tax, and line items."],
        ["Verifies against your rules", "Checks duplicates, PO matching, tax totals, and approval limits."],
        ["Routes by confidence", "Auto-logs high-confidence entries, flags the rest for a quick human check."]
      ],
      flowTitle: "How a document is processed",
      flowLead: "The default path from inbox to ledger — approval thresholds are set by your team.",
      flow: ["A document arrives by email, shared folder, or WhatsApp", "It's classified by type, vendor, and quality", "Key fields are extracted with a confidence score per field", "Fields are verified against duplicate, PO, and tax rules", "High-confidence entries are logged automatically", "Low-confidence entries are flagged for a quick review"],
      demoTitle: "Extraction, field by field",
      demoLead: "Every field comes with a confidence score, so review time goes only where it's actually needed.",
      integrationsTitle: "Connects to where documents already arrive",
      integrationsLead: "Reads from your inbox and folders, writes to your accounting or ERP system.",
      integrations: ["Email", "Google Drive", "ERP / accounting", "WhatsApp"],
      ctaTitle: "Start with one document type.",
      ctaLead: "Send us a few real samples of the documents you process most. We'll show you what confident extraction looks like on them.",
      demo: {
        title: "Invoice scan · INV-1042",
        fields: [
          { name: "Vendor", value: "Al-Noor Supplies", conf: "high", confLabel: "High" },
          { name: "Invoice #", value: "INV-1042", conf: "high", confLabel: "High" },
          { name: "Total", value: "$3,180.00", conf: "mid", confLabel: "Review" },
          { name: "Tax ID", value: "— not found", conf: "low", confLabel: "Needs input" }
        ]
      }
    },
    ar: {
      cardTitle: "وكيل معالجة المستندات",
      cardText: "يقرأ الفواتير والمستندات الواردة، يستخرج الحقول، يتحقق منها وفق قواعدك، ولا يسجل إلا ما يثق به فعلًا.",
      eyebrow: "الوكيل ٠٦ · استقبال المستندات",
      title: "توقف عن إعادة كتابة نفس حقول الفاتورة يدويًا في كل مرة.",
      lead: "يستقبل الوكيل المستندات من البريد أو المجلدات المشتركة أو واتساب، يصنفها، يستخرج الحقول التي يحتاجها نظامك المحاسبي، يتحقق منها وفق قواعدك، ولا يسجل تلقائيًا إلا ما يثق به فعلًا.",
      badges: ["استخراج بدرجة ثقة", "تحقق مدمج من التكرار وأمر الشراء", "الحقول منخفضة الثقة تذهب للمراجعة"],
      stats: [{ big: "+١٣", unit: "", label: "نوع مستند مدعوم" }, { big: "٣", unit: "", label: "مستويات ثقة لكل حقل" }, { big: "٠", unit: "", label: "إدخالات منخفضة الثقة تُعتمد تلقائيًا" }],
      painTitle: "لا يزال أحدهم يعيد كتابة فواتير الموردين يدويًا في نظامك.",
      painLead: "الإدخال اليدوي بطيء وعرضة للخطأ، والفواتير المكررة أو غير المطابقة تمر دون ملاحظة حين لا يملك أحد وقتًا لمراجعة كل حقل.",
      pains: [
        ["إدخال يدوي", "كل حقل في الفاتورة يُعاد كتابته يدويًا من PDF أو مستند ممسوح."],
        ["تكرار يمر دون ملاحظة", "نفس الفاتورة تصل مرتين باسم أو رقم مختلف قليلًا."],
        ["حقول ناقصة تُكتشف متأخرًا", "رقم أمر شراء أو رقم ضريبي مفقود يظهر عند إقفال الشهر، لا عند الوصول."],
        ["توجيه موافقات يدوي", "أحدهم يجب أن يعرف أي مستند يذهب لأي معتمِد، في كل مرة."]
      ],
      systemTitle: "ما الذي ينفذه الوكيل فعليًا؟",
      systemLead: "يقرأ، يستخرج، ويتحقق — ثم يوجّه حسب درجة ثقته الفعلية، لا بقرار واحد كامل أو لا شيء.",
      capabilities: [
        ["يصنف المستند", "يحدد النوع والمورد واللغة والجودة عند الوصول."],
        ["يستخرج الحقول", "يستخرج المورد، رقم الفاتورة، التواريخ، المبالغ، الضريبة، وبنود الفاتورة."],
        ["يتحقق وفق قواعدك", "يفحص التكرار، مطابقة أمر الشراء، إجماليات الضريبة، وحدود الموافقة."],
        ["يوجّه حسب الثقة", "يسجل تلقائيًا الحقول عالية الثقة، ويرفع الباقي لمراجعة سريعة."]
      ],
      flowTitle: "كيف يُعالَج المستند",
      flowLead: "المسار الافتراضي من صندوق الوارد إلى السجل المحاسبي — حدود الموافقة يحددها فريقك.",
      flow: ["يصل مستند عبر البريد أو مجلد مشترك أو واتساب", "يُصنف حسب النوع والمورد والجودة", "تُستخرج الحقول الأساسية مع درجة ثقة لكل حقل", "تُتحقق الحقول وفق قواعد التكرار وأمر الشراء والضريبة", "تُسجل الإدخالات عالية الثقة تلقائيًا", "الإدخالات منخفضة الثقة تُرفع لمراجعة سريعة"],
      demoTitle: "الاستخراج، حقلًا بحقل",
      demoLead: "كل حقل يأتي بدرجة ثقة، فوقت المراجعة يُصرف فقط حيث يُحتاج فعلًا.",
      integrationsTitle: "يتصل بحيث تصل المستندات بالفعل",
      integrationsLead: "يقرأ من بريدك ومجلداتك، ويكتب إلى نظام المحاسبة أو ERP لديك.",
      integrations: ["البريد الإلكتروني", "Google Drive", "ERP / المحاسبة", "واتساب"],
      ctaTitle: "ابدأ بنوع مستند واحد.",
      ctaLead: "أرسل لنا بعض العينات الحقيقية للمستندات التي تعالجها أكثر من غيرها. سنريك كيف يبدو الاستخراج الواثق عليها.",
      demo: {
        title: "مسح فاتورة · INV-1042",
        fields: [
          { name: "المورد", value: "مؤسسة النور للتوريدات", conf: "high", confLabel: "عالية" },
          { name: "رقم الفاتورة", value: "INV-1042", conf: "high", confLabel: "عالية" },
          { name: "الإجمالي", value: "٣,١٨٠$", conf: "mid", confLabel: "مراجعة" },
          { name: "الرقم الضريبي", value: "— غير موجود", conf: "low", confLabel: "يحتاج إدخالًا" }
        ]
      }
    }
  },
  {
    slug: "crm-control",
    icon: "database",
    demoKind: "table",
    en: {
      cardTitle: "CRM Control Agent",
      cardText: "Keeps your CRM clean, routes new leads by rule, flags stalled deals, and gives management a clear daily picture.",
      eyebrow: "Agent 07 · Pipeline hygiene",
      title: "A CRM that stays accurate without a weekly cleanup project.",
      lead: "The agent standardizes and de-duplicates records, routes new leads to the right rep by rule, flags deals that have gone quiet, and sends management a report that actually matches what's in the system.",
      badges: ["Never deletes without approval", "Rule-based lead routing", "Daily pipeline report"],
      stats: [{ big: "0", unit: "", label: "Records deleted without approval" }, { big: "100%", unit: "", label: "New leads routed by rule" }, { big: "Daily", unit: "", label: "Management report" }],
      painTitle: "The CRM everyone relies on doesn't actually match what's happening.",
      painLead: "Duplicate contacts, unassigned leads, and deals stuck for weeks quietly erode trust in the one system meant to keep sales organized.",
      pains: [
        ["Duplicate and messy records", "The same customer exists three times under three slightly different names."],
        ["Leads sit unassigned", "A new lead arrives and nobody is responsible for it until someone happens to notice."],
        ["Deals go stale silently", "A deal hasn't moved in three weeks and nothing flags it."],
        ["Reports don't match reality", "The pipeline number in the report isn't the pipeline number in the CRM."]
      ],
      systemTitle: "What the agent actually does",
      systemLead: "It keeps the system honest — cleaning, routing, and monitoring — while every deletion or merge stays under your approval.",
      capabilities: [
        ["Cleans the data", "Standardizes phone formats, flags duplicates, and never merges without a policy match."],
        ["Routes new leads", "Assigns by region, product, language, or workload with SLA alerts if nobody responds."],
        ["Flags stalled deals", "Surfaces deals with no activity, no next step, or a stage that doesn't match reality."],
        ["Reports to management", "Sends a recurring summary of pipeline, stalled deals, and rep performance."]
      ],
      flowTitle: "How the CRM stays clean",
      flowLead: "Runs continuously in the background — merge and deletion rules are approved by your team upfront.",
      flow: ["A new or updated record enters the CRM", "It's validated and checked against existing records for duplicates", "New leads are routed to the right rep by your rules", "An SLA timer runs; unanswered leads get reassigned", "Deals with no activity or next step are flagged for action", "A report goes to management on the schedule you choose"],
      demoTitle: "Pipeline, kept honest",
      demoLead: "New leads route themselves, and stalled deals surface before they're forgotten.",
      integrationsTitle: "Connects to the CRM you already run on",
      integrationsLead: "Works with your existing CRM — no migration, no new system to learn.",
      integrations: ["CRM", "Google Sheets", "Email", "Reporting dashboard"],
      ctaTitle: "Start with a CRM health check.",
      ctaLead: "Send us access to review your current setup. We'll show you exactly where the data breaks down before proposing a fix.",
      demo: {
        title: "CRM · lead pipeline",
        cols: ["Lead", "Source", "Score", "Status"],
        rows: [
          { cells: ["Khaled Al-Mutairi", "WhatsApp", "87", "HOT"], pillClass: "hot", isNew: true },
          { cells: ["Sarah Al-Harbi", "Website", "62", "Warm"], pillClass: "warm" },
          { cells: ["Unknown", "Meta Ad", "22", "Unqualified"], pillClass: "cold" },
          { cells: ["Fahad Al-Qahtani", "WhatsApp", "71", "Warm"], pillClass: "warm" }
        ]
      }
    },
    ar: {
      cardTitle: "وكيل ضبط CRM",
      cardText: "يحافظ على نظافة CRM، يوزع العملاء الجدد وفق قواعد، يرصد الصفقات المتوقفة، ويمنح الإدارة صورة يومية واضحة.",
      eyebrow: "الوكيل ٠٧ · نظافة المسار",
      title: "CRM يبقى دقيقًا دون مشروع تنظيف أسبوعي.",
      lead: "يوحّد الوكيل السجلات ويزيل تكرارها، يوزع العملاء الجدد على الموظف المناسب وفق قواعد، يرصد الصفقات التي سكتت، ويرسل للإدارة تقريرًا يطابق فعليًا ما في النظام.",
      badges: ["لا يحذف دون موافقة", "توزيع عملاء وفق قواعد", "تقرير مسار يومي"],
      stats: [{ big: "٠", unit: "", label: "سجلات محذوفة دون موافقة" }, { big: "100%", unit: "", label: "عملاء جدد موزعون وفق قواعد" }, { big: "يومي", unit: "", label: "تقرير للإدارة" }],
      painTitle: "الـCRM الذي يعتمد عليه الجميع لا يطابق فعليًا ما يحدث.",
      painLead: "جهات اتصال مكررة، عملاء بلا مسؤول، وصفقات متوقفة لأسابيع تُضعف بصمت الثقة في النظام الذي يُفترض أن ينظم المبيعات.",
      pains: [
        ["سجلات مكررة وغير منظمة", "نفس العميل موجود ثلاث مرات بثلاثة أسماء مختلفة قليلًا."],
        ["عملاء بلا مسؤول", "عميل جديد يصل ولا أحد مسؤول عنه حتى يلاحظه أحد بالصدفة."],
        ["صفقات تتوقف بصمت", "صفقة لم تتحرك منذ ثلاثة أسابيع ولا شيء يرصد ذلك."],
        ["تقارير لا تطابق الواقع", "رقم المسار في التقرير ليس رقم المسار في CRM."]
      ],
      systemTitle: "ما الذي ينفذه الوكيل فعليًا؟",
      systemLead: "يحافظ على صدق النظام — تنظيفًا وتوزيعًا ومراقبة — مع بقاء كل حذف أو دمج تحت موافقتك.",
      capabilities: [
        ["ينظف البيانات", "يوحد صيغ الهواتف، يرصد التكرار، ولا يدمج أبدًا دون مطابقة سياسة."],
        ["يوزع العملاء الجدد", "يوزع حسب المنطقة أو المنتج أو اللغة أو عبء العمل مع تنبيهات SLA عند عدم الرد."],
        ["يرصد الصفقات المتوقفة", "يظهر الصفقات بلا نشاط، بلا خطوة تالية، أو بمرحلة لا تطابق الواقع."],
        ["يرفع تقريرًا للإدارة", "يرسل ملخصًا دوريًا عن المسار والصفقات المتوقفة وأداء الموظفين."]
      ],
      flowTitle: "كيف يبقى CRM نظيفًا",
      flowLead: "يعمل باستمرار في الخلفية — قواعد الدمج والحذف تُعتمد من فريقك مسبقًا.",
      flow: ["سجل جديد أو محدَّث يدخل CRM", "يُتحقق منه ويُقارن بالسجلات الموجودة لرصد التكرار", "العملاء الجدد يُوزَّعون على الموظف المناسب وفق قواعدك", "مؤقت SLA يعمل؛ العملاء بلا رد يُعاد توزيعهم", "الصفقات بلا نشاط أو خطوة تالية تُرصد لاتخاذ إجراء", "تقرير يُرسل للإدارة وفق الجدول الذي تختاره"],
      demoTitle: "المسار، يبقى صادقًا",
      demoLead: "العملاء الجدد يوزَّعون أنفسهم، والصفقات المتوقفة تظهر قبل أن تُنسى.",
      integrationsTitle: "يتصل بـCRM الذي تعمل عليه بالفعل",
      integrationsLead: "يعمل مع CRM الحالي لديك — بلا ترحيل، وبلا نظام جديد يجب تعلمه.",
      integrations: ["CRM", "Google Sheets", "البريد الإلكتروني", "لوحة تقارير"],
      ctaTitle: "ابدأ بفحص صحة CRM.",
      ctaLead: "أرسل لنا صلاحية مراجعة إعدادك الحالي. سنريك بالضبط أين تتعطل البيانات قبل اقتراح الحل.",
      demo: {
        title: "CRM · مسار العملاء",
        cols: ["العميل", "المصدر", "النقاط", "الحالة"],
        rows: [
          { cells: ["خالد المطيري", "واتساب", "٨٧", "ساخن"], pillClass: "hot", isNew: true },
          { cells: ["سارة الحربي", "الموقع", "٦٢", "دافئ"], pillClass: "warm" },
          { cells: ["رقم غير معروف", "إعلان Meta", "٢٢", "غير مؤهل"], pillClass: "cold" },
          { cells: ["فهد القحطاني", "واتساب", "٧١", "دافئ"], pillClass: "warm" }
        ]
      }
    }
  }
];

const industries = [
  ["sales-marketing", "Sales & Marketing", "Respond faster, qualify better, and keep every opportunity moving toward a clear next step.", ["Lead capture", "Qualification", "Proposal handoff", "CRM hygiene"]],
  ["healthcare", "Healthcare Operations", "Reduce administrative friction around bookings, confirmations, patient follow-up, and lab workflows.", ["Booking", "Confirmation", "Patient follow-up", "Operational review"]],
  ["real-estate", "Real Estate", "Qualify property inquiries, collect buyer context, organize appointments, and keep follow-up from going cold.", ["Lead qualification", "Property matching", "Appointment booking", "Follow-up"]],
  ["logistics", "Logistics & Fleet", "Collect cleaner locations, organize delivery information, and help dispatch teams act with less back-and-forth.", ["Location collection", "Order routing", "Fleet visibility", "Customer updates"]],
  ["content-teams", "Content Teams", "Turn raw ideas and long-form content into organized assets, review queues, and publishing tasks.", ["Repurposing", "Review workflows", "Asset organization", "Publishing preparation"]]
];

const industryAr = {
  "sales-marketing": ["المبيعات والتسويق", "رد أسرع، تأهيل أفضل، وفرص تتحرك دائمًا نحو خطوة تالية واضحة."],
  "healthcare": ["عمليات الرعاية الصحية", "تقليل الضغط الإداري حول الحجوزات، التأكيدات، المتابعة، وسير عمل المختبرات."],
  "real-estate": ["العقار", "تأهيل الاستفسارات العقارية، جمع سياق المشتري، تنظيم المواعيد، ومنع برود المتابعة."],
  "logistics": ["اللوجستيات والأسطول", "جمع مواقع أدق، تنظيم معلومات الطلبات، ومساعدة فرق التوزيع على تقليل الأخذ والرد."],
  "content-teams": ["فرق المحتوى", "تحويل الأفكار والمحتوى الخام إلى أصول منظمة، مراجعات واضحة، ومهام نشر جاهزة."]
};

function rawPathParts() {
  return location.pathname.replace(/\/index\.html$/, "/").split("/").filter(Boolean);
}

function pathParts() {
  return rawPathParts();
}

function isArabic() {
  return pathParts()[0] === "ar";
}

function siteBase() {
  return "";
}

function rootPath(path = "") {
  return `${siteBase()}${isArabic() ? "/ar" : ""}${path}`;
}

function assetPath(path = "") {
  return `${siteBase()}${path}`;
}

function otherLangPath() {
  const p = pathParts();
  if (isArabic()) return `${siteBase()}/${p.slice(1).join("/")}`;
  return `${siteBase()}/ar/${p.join("/")}`;
}

function agentBySlug(slug) { return agents.find((a) => a.slug === slug); }
function industryBySlug(slug) { return industries.find((s) => s[0] === slug); }
function agentCopy(agent) { return isArabic() ? agent.ar : agent.en; }

/* Falaq mark — "dawn spark": four-point star rising over an horizon arc */
let falaqMarkIds = 0;
function falaqMark(size = 40) {
  falaqMarkIds += 1;
  const id = `fm${falaqMarkIds}`;
  return `<svg class="falaq-mark" width="${size}" height="${size}" viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <defs><linearGradient id="${id}" x1="10" y1="40" x2="40" y2="8" gradientUnits="userSpaceOnUse">
      <stop stop-color="#8B5CF6"/><stop offset=".55" stop-color="#C084FC"/><stop offset="1" stop-color="#F0ABFC"/>
    </linearGradient></defs>
    <path d="M24 3.5c1.9 10 6.7 14.8 16.5 16.7C30.7 22.1 25.9 26.9 24 37 22.1 26.9 17.3 22.1 7.5 20.2 17.3 18.3 22.1 13.5 24 3.5Z" fill="url(#${id})"/>
    <path d="M10 40.5a17 17 0 0 0 28 0" stroke="url(#${id})" stroke-width="3" stroke-linecap="round" opacity=".9"/>
    <circle cx="41" cy="34" r="2.2" fill="#F0ABFC"/><circle cx="7" cy="34" r="1.7" fill="#8B5CF6"/>
  </svg>`;
}

function falaqBrand(size = 38) {
  return `${falaqMark(size)}<span class="falaq-wordmark">${isArabic() ? "فَلَق" : "FALAQ"}</span>`;
}

function nav(t, currentPage) {
  const isActive = (page) => currentPage === page ? 'aria-current="page" class="active"' : '';
  return `
    <header class="nav">
      <div class="container nav-inner">
        <a class="brand" href="${rootPath("/")}" aria-label="Falaq Intelligence">
          ${falaqBrand(38)}
        </a>
        <nav class="nav-links" id="navLinks">
          <a href="${rootPath("/services/")}" ${isActive("services")}>${t.nav.solutions}</a>
          <a href="${rootPath("/industries/")}" ${isActive("industries")}>${t.nav.industries}</a>
          <a href="${rootPath("/about/")}" ${isActive("about")}>${t.nav.about}</a>
          <a href="${rootPath("/contact/")}" ${isActive("contact")}>${t.nav.contact}</a>
        </nav>
        <div class="nav-actions">
          <a class="btn small" href="${otherLangPath()}">${t.nav.lang}</a>
          <a class="btn primary small nav-cta" href="${rootPath("/contact/")}">${t.nav.cta}</a>
          <button class="btn small mobile-menu" id="menuButton" aria-label="Menu" aria-controls="navLinks" aria-expanded="false">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </div>
    </header>`;
}

function footer(t) {
  const year = new Date().getFullYear();
  const footerAgents = agents.slice(0, 4);
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a class="brand" href="${rootPath("/")}" aria-label="Falaq Intelligence" style="align-items:center">
              ${falaqBrand(36)}
            </a>
            <p class="footer-tagline">${isArabic() ? "وكلاء ذكاء اصطناعي للرد، التأهيل، المتابعة، وتسليم العمل بوضوح." : "AI agents for response, qualification, follow-up, and cleaner operational handoff."}</p>
          </div>
          <div class="footer-links">
            <h4>${isArabic() ? "الحلول" : "Solutions"}</h4>
            ${footerAgents.map((a) => `<a href="${rootPath(`/services/${a.slug}/`)}">${agentCopy(a).cardTitle}</a>`).join("")}
          </div>
          <div class="footer-links">
            <h4>${isArabic() ? "القطاعات" : "Industries"}</h4>
            <a href="${rootPath("/industries/sales-marketing/")}">${isArabic() ? "المبيعات والتسويق" : "Sales & Marketing"}</a>
            <a href="${rootPath("/industries/healthcare/")}">${isArabic() ? "الرعاية الصحية" : "Healthcare"}</a>
            <a href="${rootPath("/industries/real-estate/")}">${isArabic() ? "العقارات" : "Real Estate"}</a>
            <a href="${rootPath("/industries/logistics/")}">${isArabic() ? "اللوجستيات" : "Logistics"}</a>
          </div>
          <div class="footer-contact">
            <h4>${isArabic() ? "تواصل معنا" : "Contact"}</h4>
            <a href="https://wa.me/${CONFIG.whatsappNumber}" target="_blank" rel="noreferrer">${CONFIG.whatsappDisplay}</a>
            <a href="mailto:${CONFIG.email}">${CONFIG.email}</a>
            <div class="footer-social">
              <a href="https://www.linkedin.com/company/135187245/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://www.instagram.com/falaqai/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none"/></svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61592175171348" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13.7 22v-9h3l.5-3.5h-3.5V7.3c0-1 .3-1.7 1.8-1.7h1.9V2.5c-.3 0-1.5-.1-2.8-.1-2.8 0-4.7 1.7-4.7 4.8v2.3H6.8V13h3.1v9h3.8Z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <span>&copy; ${year} Falaq Intelligence. ${isArabic() ? "جميع الحقوق محفوظة." : "All rights reserved."}</span>
          <div class="footer-legal">
            <a href="${rootPath("/about/")}">${isArabic() ? "سياسة الخصوصية" : "Privacy Policy"}</a>
            <a href="${rootPath("/about/")}">${isArabic() ? "الشروط والأحكام" : "Terms of Service"}</a>
          </div>
        </div>
      </div>
    </footer>`;
}

function agentCards(list) {
  return `<div class="grid three">${list.map((agent) => {
    const copy = agentCopy(agent);
    return `<a class="card card-with-icon" href="${rootPath(`/services/${agent.slug}/`)}">${iconCard(agent.icon)}<h3>${copy.cardTitle}</h3><p>${copy.cardText}</p></a>`;
  }).join("")}</div>`;
}

function industryCards(items) {
  return `<div class="grid three">${items.map((item) => {
    const slug = item[0];
    const label = isArabic() && industryAr[slug] ? industryAr[slug][0] : item[1];
    const text = isArabic() && industryAr[slug] ? industryAr[slug][1] : item[2];
    const iconSrc = assetPath(`/assets/infographics/icon-${slug}.png`);
    return `<a class="card card-with-icon" href="${rootPath(`/industries/${slug}/`)}"><img src="${iconSrc}" alt="" class="card-icon"><h3>${label}</h3><p>${text}</p></a>`;
  }).join("")}</div>`;
}

function home(t) {
  return `
    <main>
      <section class="hero">
        <div class="container hero-grid">
          <div>
            <div class="eyebrow">${t.home.eyebrow}</div>
            <h1>${t.home.title}</h1>
            <p class="lead">${t.home.lead}</p>
            <div class="hero-actions">
              <a class="btn primary" href="${rootPath("/contact/")}">${t.home.primary}</a>
              <a class="btn" href="${rootPath("/services/")}">${t.home.secondary}</a>
            </div>
          </div>
          <div class="hero-panel">
            <div class="agent-orb-stage">${falaqMark(120)}</div>
            <div class="signal-list">${t.home.signals.map((s) => `<div class="signal"><strong>${s[0]}</strong><span>${s[1]}</span></div>`).join("")}</div>
          </div>
        </div>
      </section>
      <section>
        <div class="container">
          <div class="section-head"><div><div class="eyebrow">${t.home.sections.focusEyebrow}</div><h2>${t.home.sections.focusTitle}</h2></div><p>${t.home.sections.focusText}</p></div>
          <div class="infographic-wrapper"><img src="${assetPath("/assets/infographics/funnel-pipeline.png")}" alt="Pipeline leakage infographic" class="infographic-img"></div>
          <div class="metric-row">
            ${t.home.sections.metrics.map((metric, index) => `<div class="metric"><strong>${String(index + 1).padStart(2, "0")}</strong><span>${metric}</span></div>`).join("")}
          </div>
        </div>
      </section>
      <section><div class="container"><div class="section-head"><h2>${t.home.sections.solutionsTitle}</h2><a class="btn" href="${rootPath("/services/")}">${t.nav.solutions}</a></div>${agentCards(agents)}</div></section>
      <section><div class="container"><div class="section-head"><h2>${t.home.sections.industriesTitle}</h2><a class="btn" href="${rootPath("/industries/")}">${t.nav.industries}</a></div>${industryCards(industries)}</div></section>
      <section><div class="container split"><div><div class="eyebrow">${t.home.sections.processEyebrow}</div><h2>${t.home.sections.processTitle}</h2><p class="lead">${t.home.sections.processText}</p></div><div class="infographic-wrapper"><img src="${assetPath("/assets/infographics/workflow-4step.png")}" alt="Implementation workflow" class="infographic-img"></div></div></section>
    </main>`;
}

function listing(type, t) {
  const isServices = type === "services";
  const title = isArabic() ? (isServices ? "الحلول" : "القطاعات") : (isServices ? "Solutions" : "Industries");
  const lead = isArabic()
    ? (isServices ? "سبعة وكلاء يغطون التأهيل، متابعة العروض، الحجز، خدمة العملاء، التحصيل، المستندات، وضبط CRM." : "كل قطاع لديه نقاط تعطل مختلفة. نعرضها بلغة التشغيل لا بلغة الوعود العامة.")
    : (isServices ? "Seven agents covering qualification, quote follow-up, booking, customer service, collections, documents, and CRM hygiene." : "Each industry has different points of friction. These pages explain the workflows Falaq can support in practical terms.");
  return `<main><section class="page-hero"><div class="container"><div class="eyebrow">Falaq Intelligence</div><h1>${title}</h1><p class="lead">${lead}</p></div></section><section><div class="container">${isServices ? agentCards(agents) : industryCards(industries)}</div></section></main>`;
}

// ── Demo renderers ──────────────────────────────────────────────────────
function demoWindow(title, inner) {
  return `<div class="demo-window"><div class="demo-titlebar"><div class="demo-dots"><span></span><span></span><span></span></div><div class="demo-titlebar-label">${title}</div></div><div class="demo-body">${inner}</div></div>`;
}

function chatDemo(copy) {
  const arabic = isArabic();
  const d = copy.demo;
  const bubbles = d.chat.map((m) => `<div class="chat-bubble ${m.from}">${m.text}<span class="chat-time">${m.time}</span></div>`).join("");
  const badge = d.resolution ? `<div class="chat-badge">${d.resolution}</div>` : "";
  let score = "";
  if (d.score) {
    score = `<div class="score-panel" style="margin-top:18px">
      <div class="score-tags">${d.score.tags.map((tg) => `<div class="score-tag"><span class="check">✓</span>${tg}</div>`).join("")}</div>
      <div>
        <div class="score-bar-row"><span>${arabic ? "درجة التأهيل" : "Lead score"}</span><span>${d.score.value} / 100</span></div>
        <div class="score-bar-track"><div class="score-bar-fill" style="width:${d.score.value}%"></div></div>
      </div>
      <div class="score-hot"><div><small>${arabic ? "التصنيف" : "Classification"}</small><strong>${d.score.label}</strong></div><div style="font-size:1.6rem">🔥</div></div>
    </div>`;
  }
  return demoWindow(d.title, `<div class="chat-demo">${bubbles}${badge}</div>${score}`);
}

function tableDemo(copy) {
  const d = copy.demo;
  const rows = d.rows.map((r) => `<tr class="${r.isNew ? "is-new" : ""}">${r.cells.map((cell, i) => i === r.cells.length - 1 ? `<td><span class="pill ${r.pillClass}">${cell}</span></td>` : `<td>${cell}</td>`).join("")}</tr>`).join("");
  return demoWindow(d.title, `<table class="table-demo"><thead><tr>${d.cols.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table>`);
}

function calendarDemo(copy) {
  const d = copy.demo;
  let cells = `<div class="cal-head"></div>${d.days.map((day) => `<div class="cal-head">${day}</div>`).join("")}`;
  d.hours.forEach((h, hi) => {
    cells += `<div class="cal-cell" style="display:flex;align-items:center;padding-inline-start:6px;color:var(--muted);font-size:0.68rem">${h}</div>`;
    d.days.forEach((_, di) => {
      const isBooked = d.booked.day === di && d.booked.hour === hi;
      cells += `<div class="cal-cell">${isBooked ? `<div class="cal-slot booked">${d.booked.label}</div>` : ""}</div>`;
    });
  });
  return demoWindow(d.title, `<div class="calendar-demo">${cells}</div>`);
}

function agingDemo(copy) {
  const d = copy.demo;
  const rows = d.buckets.map((b) => `<div class="aging-row"><span>${b.label}</span><div class="aging-track"><div class="aging-fill" style="width:${b.pct}%;background:${b.color}"></div></div><strong>${b.value}</strong></div>`).join("");
  return demoWindow(d.title, `<div class="aging-demo">${rows}</div>`);
}

function extractionDemo(copy) {
  const d = copy.demo;
  const symbol = { high: "✓", mid: "~", low: "!" };
  const rows = d.fields.map((f) => `<div class="extraction-field"><div><div class="fname">${f.name}</div><div class="fval">${f.value}</div></div><span class="confidence ${f.conf}">${symbol[f.conf]} ${f.confLabel}</span></div>`).join("");
  return demoWindow(d.title, `<div class="extraction-demo">${rows}</div>`);
}

function renderDemo(agent, copy) {
  if (agent.demoKind === "chat") return chatDemo(copy);
  if (agent.demoKind === "table") return tableDemo(copy);
  if (agent.demoKind === "calendar") return calendarDemo(copy);
  if (agent.demoKind === "aging") return agingDemo(copy);
  if (agent.demoKind === "extraction") return extractionDemo(copy);
  return "";
}

function agentPage(slug, t) {
  const arabic = isArabic();
  const agent = agentBySlug(slug) || agents[0];
  const copy = agentCopy(agent);
  const labels = arabic ? {
    pain: "أين يتعطل العمل اليوم", execution: "ما الذي ينفذه الوكيل", workflow: "سير العمل",
    demo: "عرض توضيحي", integrations: "التكاملات", start: "ابدأ من نقطة واحدة"
  } : {
    pain: "Where it breaks today", execution: "What the agent does", workflow: "Workflow",
    demo: "Live demo", integrations: "Integrations", start: "Start focused"
  };
  const painIcons = ["clock", "target", "bell", "database"];
  const capabilityIcons = ["inbox", "filter", "repeat", "handoff"];

  return `<main class="premium-service">
    <section class="premium-hero">
      <div class="container premium-hero-grid">
        <div class="reveal">
          <div class="eyebrow">${copy.eyebrow}</div>
          <h1>${copy.title}</h1>
          <p class="lead">${copy.lead}</p>
          <div class="hero-actions">
            <a class="btn primary" href="${rootPath("/contact/")}">${t.home.primary}</a>
            <a class="btn" href="https://wa.me/${CONFIG.whatsappNumber}" target="_blank" rel="noreferrer">${t.labels.whatsapp}</a>
          </div>
          <div class="hero-badges">${copy.badges.map((b) => `<span>${b}</span>`).join("")}</div>
        </div>
        <div class="hero-panel reveal">
          <div class="agent-orb-stage">${falaqMark(120)}</div>
        </div>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="stat-trio">${copy.stats.map((s) => `<div class="stat-tile reveal"><strong>${s.big}<span style="font-size:0.45em;margin-inline-start:6px;opacity:.8">${s.unit}</span></strong><span>${s.label}</span></div>`).join("")}</div>
      </div>
    </section>

    <section>
      <div class="container split">
        <div class="reveal">
          <div class="eyebrow">${labels.pain}</div>
          <h2>${copy.painTitle}</h2>
          <p class="lead">${copy.painLead}</p>
        </div>
        <div class="pain-grid">${copy.pains.map(([title, text], i) => `<div class="card icon-card reveal">${iconSvg(painIcons[i])}<h3>${title}</h3><p>${text}</p></div>`).join("")}</div>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="section-head reveal"><div><div class="eyebrow">${labels.execution}</div><h2>${copy.systemTitle}</h2></div><p>${copy.systemLead}</p></div>
        <div class="feature-row">${copy.capabilities.map(([title, text], i) => `<div class="flow-card reveal">${iconSvg(capabilityIcons[i])}<h3>${title}</h3><p>${text}</p></div>`).join("")}</div>
      </div>
    </section>

    <section>
      <div class="container split">
        <div class="reveal">
          <div class="eyebrow">${labels.workflow}</div>
          <h2>${copy.flowTitle}</h2>
          <p class="lead">${copy.flowLead}</p>
        </div>
        <ol class="workflow premium-flow">${copy.flow.map((item) => `<li class="reveal">${item}</li>`).join("")}</ol>
      </div>
    </section>

    <section>
      <div class="container split">
        <div class="reveal">
          <div class="eyebrow">${labels.demo}</div>
          <h2>${copy.demoTitle}</h2>
          <p class="lead">${copy.demoLead}</p>
        </div>
        <div class="reveal">${renderDemo(agent, copy)}</div>
      </div>
    </section>

    <section>
      <div class="container card reveal">
        <div class="eyebrow">${labels.integrations}</div>
        <h2>${copy.integrationsTitle}</h2>
        <p class="muted">${copy.integrationsLead}</p>
        <div class="integration-strip">${copy.integrations.map((item) => `<span>${item}</span>`).join("")}</div>
      </div>
    </section>

    <section>
      <div class="container cta-band reveal">
        <div>
          <div class="eyebrow">${labels.start}</div>
          <h2>${copy.ctaTitle}</h2>
          <p>${copy.ctaLead}</p>
        </div>
        <div class="section-actions">
          <a class="btn primary" href="${rootPath("/contact/")}">${t.home.primary}</a>
          <a class="btn" href="mailto:${CONFIG.email}">${CONFIG.email}</a>
        </div>
      </div>
    </section>
  </main>`;
}

function industryPage(slug, t) {
  const ind = industryBySlug(slug) || industries[0];
  const title = isArabic() && industryAr[slug] ? industryAr[slug][0] : ind[1];
  const lead = isArabic() && industryAr[slug] ? industryAr[slug][1] : ind[2];
  const copy = isArabic() ? {
    eyebrow: "قطاع تشغيلي",
    whereTitle: "أين تساعد فلق",
    relevantTitle: "الوكلاء المناسبون لهذا القطاع"
  } : {
    eyebrow: "Industry workflow",
    whereTitle: "Where Falaq helps",
    relevantTitle: "Relevant agents"
  };
  return `<main>
    <section class="page-hero"><div class="container"><div class="eyebrow">${copy.eyebrow}</div><h1>${title}</h1><p class="lead">${lead}</p><div class="hero-actions"><a class="btn primary" href="${rootPath("/contact/")}">${t.nav.cta}</a></div></div></section>
    <section><div class="container split"><div><h2>${copy.whereTitle}</h2><p class="lead">${lead}</p></div><div class="infographic-wrapper"><img src="${assetPath(`/assets/infographics/friction-${slug === "sales-marketing" ? "sales" : slug === "real-estate" ? "realestate" : slug === "content-teams" ? "content" : slug}.png`)}" alt="Friction points" class="infographic-img"></div></div></section>
    <section><div class="container"><div class="section-head"><h2>${copy.relevantTitle}</h2></div>${agentCards(agents)}</div></section>
  </main>`;
}

function about(t) {
  const values = isArabic() ? [
    ["عملي", "نبدأ من سير العمل نفسه: من يستقبل الطلب، ما الذي يتأخر، وأين يجب أن يتدخل الإنسان."],
    ["واضح", "لا وعود عامة ولا نتائج مخترعة. نشرح ما يمكن أتمتته، وما يجب أن يبقى بيد الفريق."]
  ] : [
    ["Practical", "We start from the workflow itself: who receives the request, what gets delayed, and where humans must step in."],
    ["Clear", "No vague AI claims or invented results. We explain what can be automated and what should stay with the team."]
  ];
  return `<main>
    <section class="page-hero"><div class="container"><div class="eyebrow">${isArabic() ? "عن فلق" : "About Falaq"}</div><h1>${t.about.title}</h1><p class="lead">${t.about.lead}</p></div></section>
    <section><div class="container split"><div><h2>${t.about.storyTitle}</h2></div><div class="rich"><p class="lead">${t.about.story}</p><div class="grid two">${values.map(([title, text]) => `<div class="card"><h3>${title}</h3><p>${text}</p></div>`).join("")}</div></div></div></section>
    <section><div class="container"><div class="section-head"><div><div class="eyebrow">${isArabic() ? "الفريق" : "People"}</div><h2>${t.about.teamTitle}</h2></div><p>${t.about.teamLead}</p></div><div class="grid three">
      <div class="card card-team"><img src="${assetPath("/assets/infographics/team-baraa.png")}" alt="Baraa Al-Shakarna" class="team-avatar"><h3>Baraa Al-Shakarna</h3><p>Founder & AI Solutions Specialist</p></div>
      <div class="card card-team"><img src="${assetPath("/assets/infographics/team-mohammed.png")}" alt="Mohammed Najajreh" class="team-avatar"><h3>Mohammed Najajreh</h3><p>Sales Manager & Public Relations</p></div>
      <div class="card card-team"><img src="${assetPath("/assets/infographics/team-younis.png")}" alt="Younis Elayn" class="team-avatar"><h3>Younis Elayn</h3><p>Marketing Manager & Business Analyst</p></div>
    </div></div></section>
  </main>`;
}

function contact(t) {
  return `<main><section class="page-hero"><div class="container"><div class="eyebrow">${isArabic() ? "تواصل" : "Contact"}</div><h1>${t.contact.title}</h1><p class="lead">${t.contact.lead}</p></div></section>
    <section><div class="container split"><div class="card"><h2>${t.contact.direct}</h2><p class="muted">${CONFIG.whatsappDisplay}</p><p class="muted">${CONFIG.email}</p><div class="section-actions"><a class="btn primary" href="https://wa.me/${CONFIG.whatsappNumber}" target="_blank" rel="noreferrer">${t.labels.whatsapp}</a><a class="btn" href="mailto:${CONFIG.email}">${t.labels.emailContact}</a></div></div><div class="card"><h2>${t.contact.formTitle}</h2>${form(t)}</div></div></section></main>`;
}

function form(t) {
  const arabic = isArabic();
  const interestOptions = agents.map((a) => [a.slug, agentCopy(a).cardTitle]);
  const methodOptions = arabic ? [
    ["whatsapp", "واتساب"],
    ["email", "البريد الإلكتروني"]
  ] : [
    ["whatsapp", "WhatsApp"],
    ["email", "Email"]
  ];

  return `<form class="form" id="leadForm">
    ${field("name", t.labels.name, "text", true)}
    ${field("company", t.labels.company, "text", true)}
    ${field("email", t.labels.email, "email", true)}
    ${field("phone", t.labels.phone, "tel", true)}
    ${field("country", t.labels.country, "text", false)}
    <div class="field"><label for="interest">${t.labels.interest}</label><select id="interest" name="interest">${interestOptions.map(([val, label]) => `<option value="${val}">${label}</option>`).join("")}</select></div>
    <div class="field"><label for="method">${t.labels.method}</label><select id="method" name="method">${methodOptions.map(([val, label]) => `<option value="${val}">${label}</option>`).join("")}</select></div>
    <div class="field"><label for="message">${t.labels.message}</label><textarea id="message" name="message" required></textarea></div>
    <button class="btn primary" type="submit">${t.labels.submit}</button>
    <div class="form-status" id="formStatus"></div>
  </form>`;
}

function field(id, label, type, required) {
  return `<div class="field"><label for="${id}">${label}</label><input id="${id}" name="${id}" type="${type}" ${required ? "required" : ""}></div>`;
}

function thanks(t) {
  return `<main><section class="page-hero"><div class="container"><div class="eyebrow">Falaq Intelligence</div><h1>${t.thanks.title}</h1><p class="lead">${t.thanks.lead}</p><div class="hero-actions"><a class="btn primary" href="https://wa.me/${CONFIG.whatsappNumber}" target="_blank" rel="noreferrer">${t.labels.whatsapp}</a><a class="btn" href="${rootPath("/")}">${isArabic() ? "الرئيسية" : "Home"}</a></div></div></section></main>`;
}

function setPageMeta(arabic, page) {
  const titles = {
    home: arabic ? "فلق | وكلاء ذكاء اصطناعي للمتابعة والتشغيل" : "Falaq | AI agents for follow-up and operations",
    services: arabic ? "الوكلاء السبعة | فلق" : "Seven AI Agents | Falaq",
    industries: arabic ? "القطاعات وسير العمل | فلق" : "Industries and Workflows | Falaq",
    about: arabic ? "عن فلق | ذكاء اصطناعي للتنفيذ" : "About Falaq | AI for execution",
    contact: arabic ? "راجع سير عملك | فلق" : "Review Your Workflow | Falaq",
    "thank-you": arabic ? "شكرًا لك | فلق لحلول الذكاء الصناعي" : "Thank you | Falaq Intelligence"
  };
  const descriptions = {
    home: arabic ? "فلق تبني وكلاء ذكاء اصطناعي للرد، التأهيل، المتابعة، وتسليم العمل داخل أدوات الشركات." : "Falaq builds AI agents for response, qualification, follow-up, and operational handoff inside business tools.",
    services: arabic ? "سبعة وكلاء ذكاء اصطناعي: تأهيل العملاء، متابعة العروض، الحجز، خدمة العملاء، التحصيل، المستندات، وضبط CRM." : "Seven AI agents: lead qualification, quote follow-up, booking recovery, customer service, collections, document processing, and CRM control.",
    industries: arabic ? "حلول عملية للمبيعات، الرعاية الصحية، العقار، اللوجستيات، وفرق المحتوى حسب نقاط التعطل في كل قطاع." : "Practical workflows for sales, healthcare, real estate, logistics, and content teams based on real operational friction.",
    about: arabic ? "فلق تبني وكلاء ذكاء اصطناعي للعمل الذي يضيع بين الأشخاص والأنظمة." : "Falaq builds AI agents for the work that falls between people and systems.",
    contact: arabic ? "أرسل سير العمل الذي يبطئ فريقك وسنقترح نقطة بداية عملية قابلة للتنفيذ." : "Send the workflow slowing your team down and we will suggest a practical starting point.",
    "thank-you": arabic ? "شكرًا لك. تم استلام طلبك وسنتواصل معك قريبًا." : "Thank you. Your inquiry has been received and we will get back to you soon."
  };

  document.title = titles[page] || titles.home;

  let metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', descriptions[page] || descriptions.home);
  }
}

function render() {
  const parts = pathParts();
  const arabic = isArabic();
  const p = arabic ? parts.slice(1) : parts;
  const t = arabic ? ar : en;
  document.documentElement.lang = arabic ? "ar" : "en";
  document.body.dir = arabic ? "rtl" : "ltr";

  let content = "";
  let page = "home";
  if (p.length === 0) { content = home(t); page = "home"; }
  else if (p[0] === "services" && !p[1]) { content = listing("services", t); page = "services"; }
  else if (p[0] === "services" && p[1]) { content = agentPage(p[1], t); page = "services"; }
  else if (p[0] === "industries" && !p[1]) { content = listing("industries", t); page = "industries"; }
  else if (p[0] === "industries" && p[1]) { content = industryPage(p[1], t); page = "industries"; }
  else if (p[0] === "about") { content = about(t); page = "about"; }
  else if (p[0] === "contact") { content = contact(t); page = "contact"; }
  else if (p[0] === "thank-you") { content = thanks(t); page = "thank-you"; }
  else { content = home(t); page = "home"; }

  setPageMeta(arabic, page);
  document.getElementById("app").innerHTML = nav(t, page) + content + footer(t);
  bindNav();
  bindForm(t);
  bindReveal();
}

function bindNav() {
  const button = document.getElementById("menuButton");
  const links = document.getElementById("navLinks");
  if (button && links) button.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    button.setAttribute("aria-expanded", String(open));
  });
}

function bindForm(t) {
  const formEl = document.getElementById("leadForm");
  if (!formEl) return;
  formEl.addEventListener("submit", async (event) => {
    event.preventDefault();
    const status = document.getElementById("formStatus");
    const payload = Object.fromEntries(new FormData(formEl).entries());
    payload.source = location.pathname;
    payload.createdAt = new Date().toISOString();
    status.textContent = isArabic() ? "جاري الإرسال..." : "Sending...";

    if (!CONFIG.sheetsEndpoint) {
      const details = Object.entries(payload)
        .filter(([key]) => key !== "createdAt")
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n");
      const message = isArabic()
        ? `مرحبًا فلق، أرغب في مناقشة خدمة من الموقع.\n\n${details}`
        : `Hello Falaq, I would like to discuss a service from the website.\n\n${details}`;
      window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
      status.innerHTML = isArabic()
        ? `تم فتح واتساب. أرسل الرسالة الجاهزة لإكمال طلبك.<br><a href="https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}" target="_blank" rel="noopener" class="btn primary small" style="margin-top:10px;display:inline-flex">فتح واتساب مجددًا</a>`
        : `WhatsApp opened. Send the prepared message to complete your request.<br><a href="https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}" target="_blank" rel="noopener" class="btn primary small" style="margin-top:10px;display:inline-flex">Open WhatsApp again</a>`;
      formEl.reset();
      return;
    }
    try {
      await fetch(CONFIG.sheetsEndpoint, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      location.href = rootPath("/thank-you/");
    } catch (error) {
      status.textContent = isArabic() ? "تعذر الإرسال. استخدم واتساب أو البريد الإلكتروني." : "Could not submit. Please use WhatsApp or email.";
    }
  });
}

function bindReveal() {
  const items = [...document.querySelectorAll(".reveal")];
  if (!items.length) return;

  // Check if GSAP is available
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    // Use GSAP ScrollTrigger for better animations
    items.forEach((item, index) => {
      gsap.from(item, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        delay: Math.min(index * 0.05, 0.3)
      });
    });
    return;
  }

  // Fallback to IntersectionObserver
  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });
  items.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 45, 220)}ms`;
    observer.observe(item);
  });
}

render();
