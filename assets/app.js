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
      solutionsTitle: "AI agents built around business outcomes",
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
      solutionsTitle: "وكلاء ذكاء اصطناعي مبنيون حول نتيجة عملية",
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

const services = [
  ["sales-marketing-ai", "Sales & Marketing AI", "Turn inquiries into qualified opportunities with faster response, consistent follow-up, and clean CRM handoff.", ["Respond while intent is high", "Qualify leads with approved questions", "Send sales-ready summaries to the team"], ["Lead arrives from an ad, form, WhatsApp, or referral", "The agent asks the right qualification questions", "A clear next action is assigned", "Status and follow-up are logged"]],
  ["whatsapp-agent", "Falaq WhatsApp Agent", "Move WhatsApp from scattered chats to structured workflows that collect details, answer approved questions, and escalate the right cases.", ["Reduce repetitive replies", "Collect missing customer information", "Escalate exceptions with context"], ["Customer starts a WhatsApp chat", "The agent identifies the request", "Required details are collected", "The task is completed or escalated"]],
  ["lead-agent", "Falaq Lead Agent", "Capture, qualify, route, and follow up with leads before interest disappears.", ["Standardize qualification", "Route serious leads faster", "Keep the next step visible"], ["Lead is captured", "Fit and urgency are checked", "Notes and score are prepared", "Meeting or follow-up is assigned"]],
  ["proposal-agent", "Falaq Proposal Agent", "Collect requirements and prepare proposal drafts your team can review, edit, and send faster.", ["Collect scope details", "Draft structured proposal sections", "Track review and follow-up"], ["Requirements are gathered", "A proposal draft is prepared", "The team reviews and edits", "Follow-up is scheduled"]],
  ["content-engine", "Falaq Content Engine", "Turn long-form ideas and raw material into organized publishing assets with clearer review steps.", ["Repurpose source content", "Prepare channel-specific drafts", "Organize review workflows"], ["Source content is submitted", "Assets are grouped by platform", "Drafts move through review", "Publishing tasks are prepared"]],
  ["clinic-agent", "Falaq Clinic Agent", "Support clinic teams with booking, confirmations, rescheduling, and administrative follow-up.", ["Confirm appointments", "Handle reschedule requests", "Support front-desk teams"], ["Patient requests an appointment", "Details are confirmed", "Reminder or reschedule is handled", "Staff step in when needed"]],
  ["lab-assistant", "Falaq Lab Assistant", "Organize lab requests, missing information, result-delivery tasks, and review queues without replacing qualified staff.", ["Track incoming requests", "Flag missing information", "Support review coordination"], ["Request is received", "Required information is checked", "Exceptions are flagged", "Qualified staff complete final review"]],
  ["location-resolver", "Falaq Location Resolver", "Collect and validate customer locations so delivery and field teams receive cleaner routing information.", ["Collect accurate locations", "Attach locations to orders", "Reduce back-and-forth before dispatch"], ["Customer shares location", "Details are validated", "Order record is updated", "Team receives clean routing data"]],
  ["fleet-optimizer", "Falaq Fleet Optimizer", "Help dispatch teams organize delivery priorities, route constraints, and vehicle assignments before final approval.", ["Prioritize deliveries", "Organize dispatch constraints", "Improve operational visibility"], ["Orders are reviewed", "Constraints are organized", "Suggested allocations are prepared", "Dispatcher approves and adjusts"]]
];

const industries = [
  ["sales-marketing", "Sales & Marketing", "Respond faster, qualify better, and keep every opportunity moving toward a clear next step.", ["Lead capture", "Qualification", "Proposal handoff", "CRM hygiene"]],
  ["healthcare", "Healthcare Operations", "Reduce administrative friction around bookings, confirmations, patient follow-up, and lab workflows.", ["Booking", "Confirmation", "Patient follow-up", "Operational review"]],
  ["real-estate", "Real Estate", "Qualify property inquiries, collect buyer context, organize appointments, and keep follow-up from going cold.", ["Lead qualification", "Property matching", "Appointment booking", "Follow-up"]],
  ["logistics", "Logistics & Fleet", "Collect cleaner locations, organize delivery information, and help dispatch teams act with less back-and-forth.", ["Location collection", "Order routing", "Fleet visibility", "Customer updates"]],
  ["content-teams", "Content Teams", "Turn raw ideas and long-form content into organized assets, review queues, and publishing tasks.", ["Repurposing", "Review workflows", "Asset organization", "Publishing preparation"]]
];

const serviceAr = {
  "sales-marketing-ai": ["ذكاء المبيعات والتسويق", "حوّل الاستفسارات إلى فرص مؤهلة برد أسرع، متابعة ثابتة، وتسليم واضح إلى CRM أو فريق المبيعات."],
  "whatsapp-agent": ["وكيل واتساب", "حوّل محادثات واتساب من رسائل متفرقة إلى سير عمل يجمع البيانات، يجيب ضمن نطاق معتمد، ويصعّد الحالات المهمة."],
  "lead-agent": ["وكيل العملاء المحتملين", "التقط العملاء، أهّلهم، وجّههم، وتابعهم قبل أن يختفي الاهتمام."],
  "proposal-agent": ["وكيل العروض", "اجمع المتطلبات وجهّز مسودات عروض منظمة يراجعها الفريق ويرسلها أسرع."],
  "content-engine": ["محرك المحتوى", "حوّل الأفكار والمحتوى الطويل إلى أصول نشر منظمة وخطوات مراجعة أوضح."],
  "clinic-agent": ["وكيل العيادات", "دعم تشغيلي للحجز والتأكيد وإعادة الجدولة والمتابعة الإدارية اليومية."],
  "lab-assistant": ["مساعد المختبر", "ينظم طلبات المختبر والبيانات الناقصة ومهام تسليم النتائج دون استبدال المراجعة البشرية المؤهلة."],
  "location-resolver": ["منظم المواقع", "يجمع ويتحقق من مواقع العملاء حتى تصل معلومات التوصيل والتوجيه إلى الفريق بشكل أنظف."],
  "fleet-optimizer": ["محسن الأسطول", "يساعد فرق التوزيع على تنظيم الأولويات والقيود وتوزيع المركبات قبل القرار النهائي."]
};

const industryAr = {
  "sales-marketing": ["المبيعات والتسويق", "رد أسرع، تأهيل أفضل، وفرص تتحرك دائمًا نحو خطوة تالية واضحة."],
  "healthcare": ["عمليات الرعاية الصحية", "تقليل الضغط الإداري حول الحجوزات، التأكيدات، المتابعة، وسير عمل المختبرات."],
  "real-estate": ["العقار", "تأهيل الاستفسارات العقارية، جمع سياق المشتري، تنظيم المواعيد، ومنع برود المتابعة."],
  "logistics": ["اللوجستيات والأسطول", "جمع مواقع أدق، تنظيم معلومات الطلبات، ومساعدة فرق التوزيع على تقليل الأخذ والرد."],
  "content-teams": ["فرق المحتوى", "تحويل الأفكار والمحتوى الخام إلى أصول منظمة، مراجعات واضحة، ومهام نشر جاهزة."]
};

function pathParts() {
  return location.pathname.replace(/\/index\.html$/, "/").split("/").filter(Boolean);
}

function isArabic() {
  return pathParts()[0] === "ar";
}

function rootPath(path = "") {
  return `${isArabic() ? "/ar" : ""}${path}`;
}

function otherLangPath() {
  const p = pathParts();
  if (isArabic()) return "/" + p.slice(1).join("/");
  return "/ar/" + p.join("/");
}

function serviceBySlug(slug) { return services.find((s) => s[0] === slug); }
function industryBySlug(slug) { return industries.find((s) => s[0] === slug); }

function nav(t, currentPage) {
  const isActive = (page) => currentPage === page ? 'aria-current="page" class="active"' : '';
  return `
    <header class="nav">
      <div class="container nav-inner">
        <a class="brand" href="${rootPath("/")}" aria-label="Falaq Intelligence">
          <img src="${isArabic() ? "/assets/arabic-logo-transparent.png" : "/assets/main-logo-transparent.png"}" alt="Falaq Intelligence">
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
          <button class="btn small mobile-menu" id="menuButton" aria-label="Menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </div>
    </header>`;
}

function footer(t) {
  const year = new Date().getFullYear();
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a class="brand" href="${rootPath("/")}" aria-label="Falaq Intelligence">
              <img src="${isArabic() ? "/assets/arabic-logo-transparent.png" : "/assets/main-logo-transparent.png"}" alt="Falaq Intelligence" style="width:120px">
            </a>
            <p class="footer-tagline">${isArabic() ? "وكلاء ذكاء اصطناعي للرد، التأهيل، المتابعة، وتسليم العمل بوضوح." : "AI agents for response, qualification, follow-up, and cleaner operational handoff."}</p>
          </div>
          <div class="footer-links">
            <h4>${isArabic() ? "الحلول" : "Solutions"}</h4>
            <a href="${rootPath("/services/sales-marketing-ai/")}">${isArabic() ? "ذكاء المبيعات" : "Sales & Marketing AI"}</a>
            <a href="${rootPath("/services/whatsapp-agent/")}">${isArabic() ? "وكيل واتساب" : "WhatsApp Agent"}</a>
            <a href="${rootPath("/services/lead-agent/")}">${isArabic() ? "وكيل العملاء" : "Lead Agent"}</a>
            <a href="${rootPath("/services/clinic-agent/")}">${isArabic() ? "وكيل العيادات" : "Clinic Agent"}</a>
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
              <a href="#" aria-label="LinkedIn" class="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="#" aria-label="Twitter" class="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
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

function cards(items, base) {
  return `<div class="grid three">${items.map((item) => {
    const slug = item[0];
    const label = isArabic() && base === "services" && serviceAr[slug] ? serviceAr[slug][0] : isArabic() && base === "industries" && industryAr[slug] ? industryAr[slug][0] : item[1];
    const text = isArabic() && base === "services" && serviceAr[slug] ? serviceAr[slug][1] : isArabic() && base === "industries" && industryAr[slug] ? industryAr[slug][1] : item[2];
    const iconSrc = `/assets/infographics/icon-${slug}.png`;
    const hasIcon = base === "services" || base === "industries";
    return `<a class="card card-with-icon" href="${rootPath(`/${base}/${slug}/`)}">${hasIcon ? `<img src="${iconSrc}" alt="" class="card-icon">` : ""}<h3>${label}</h3><p>${text}</p></a>`;
  }).join("")}</div>`;
}

function falaqLogoAnimation() {
  return `<div class="falaq-logo-stage" aria-hidden="true">
    <svg class="falaq-logo-svg" viewBox="0 0 420 420" role="img">
      <defs>
        <radialGradient id="falaqHalo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#20d7ff" stop-opacity="0.15"/>
          <stop offset="50%" stop-color="#2f7bff" stop-opacity="0.08"/>
          <stop offset="100%" stop-color="#07090d" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="crescentGrad" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stop-color="#6c4cff"/>
          <stop offset="50%" stop-color="#2f7bff"/>
          <stop offset="100%" stop-color="#20d7ff"/>
        </linearGradient>
        <linearGradient id="rayGrad" x1="1" y1="0.5" x2="0" y2="0.5">
          <stop offset="0%" stop-color="#20d7ff" stop-opacity="1"/>
          <stop offset="60%" stop-color="#2f7bff" stop-opacity="0.7"/>
          <stop offset="100%" stop-color="#6c4cff" stop-opacity="0.1"/>
        </linearGradient>
        <filter id="glowStrong" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="4" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="glowSoft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8"/>
        </filter>
        <filter id="glowRay" x="-30%" y="-200%" width="160%" height="500%">
          <feGaussianBlur stdDeviation="2.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      <!-- ambient halo -->
      <circle class="flq-halo" cx="210" cy="210" r="160" fill="url(#falaqHalo)"/>

      <!-- ===== PHASE 1: scattered pixel blocks (left side) ===== -->
      <g class="flq-pixels">
        <rect class="flq-px px-1" x="42"  y="90"  width="26" height="26" rx="3" fill="#6c4cff" opacity="0"/>
        <rect class="flq-px px-2" x="88"  y="56"  width="18" height="18" rx="2" fill="#8a6aff" opacity="0"/>
        <rect class="flq-px px-3" x="30"  y="155" width="22" height="22" rx="3" fill="#5538cc" opacity="0"/>
        <rect class="flq-px px-4" x="72"  y="130" width="14" height="14" rx="2" fill="#2f7bff" opacity="0"/>
        <rect class="flq-px px-5" x="50"  y="210" width="30" height="30" rx="4" fill="#6c4cff" opacity="0"/>
        <rect class="flq-px px-6" x="95"  y="240" width="16" height="16" rx="2" fill="#4a5aff" opacity="0"/>
        <rect class="flq-px px-7" x="38"  y="275" width="20" height="20" rx="3" fill="#8a6aff" opacity="0"/>
        <rect class="flq-px px-8" x="80"  y="310" width="24" height="24" rx="3" fill="#2f7bff" opacity="0"/>
        <rect class="flq-px px-9" x="55"  y="340" width="12" height="12" rx="2" fill="#5538cc" opacity="0"/>
        <rect class="flq-px px-10" x="110" y="170" width="18" height="18" rx="2" fill="#6c4cff" opacity="0"/>
        <rect class="flq-px px-11" x="45"  y="380" width="22" height="22" rx="3" fill="#4a5aff" opacity="0"/>
        <rect class="flq-px px-12" x="100" y="370" width="15" height="15" rx="2" fill="#2f7bff" opacity="0"/>
      </g>

      <!-- ===== PHASE 2: crescent halves (draw + fill) ===== -->
      <g class="flq-crescent">
        <!-- Upper crescent half -->
        <path class="flq-crescent-upper"
              d="M 230 210 C 230 148, 186 106, 144 92 C 126 86, 108 88, 96 96 C 78 108, 76 140, 90 170 C 104 200, 130 210, 130 210"
              fill="none" stroke="url(#crescentGrad)" stroke-width="32" stroke-linecap="round"
              opacity="0" filter="url(#glowStrong)"/>
        <!-- Lower crescent half -->
        <path class="flq-crescent-lower"
              d="M 230 210 C 230 272, 186 314, 144 328 C 126 334, 108 332, 96 324 C 78 312, 76 280, 90 250 C 104 220, 130 210, 130 210"
              fill="none" stroke="url(#crescentGrad)" stroke-width="32" stroke-linecap="round"
              opacity="0" filter="url(#glowStrong)"/>
      </g>

      <!-- ===== PHASE 3: focal point (right side) ===== -->
      <circle class="flq-focal" cx="340" cy="210" r="0" fill="#fff" filter="url(#glowStrong)"/>
      <circle class="flq-focal-ring" cx="340" cy="210" r="0" fill="none" stroke="#20d7ff" stroke-width="2" opacity="0"/>

      <!-- ===== PHASE 4: rays (from focal point → left) ===== -->
      <g class="flq-rays" opacity="0">
        <line class="flq-ray ray-1" x1="340" y1="210" x2="130" y2="210" stroke="url(#rayGrad)" stroke-width="3" stroke-linecap="round" filter="url(#glowRay)"/>
        <line class="flq-ray ray-2" x1="340" y1="210" x2="148" y2="155" stroke="url(#rayGrad)" stroke-width="2" stroke-linecap="round" filter="url(#glowRay)"/>
        <line class="flq-ray ray-3" x1="340" y1="210" x2="148" y2="265" stroke="url(#rayGrad)" stroke-width="2" stroke-linecap="round" filter="url(#glowRay)"/>
        <line class="flq-ray ray-4" x1="340" y1="210" x2="80"  y2="130" stroke="url(#rayGrad)" stroke-width="1.5" stroke-linecap="round" filter="url(#glowRay)"/>
        <line class="flq-ray ray-5" x1="340" y1="210" x2="80"  y2="290" stroke="url(#rayGrad)" stroke-width="1.5" stroke-linecap="round" filter="url(#glowRay)"/>
      </g>

      <!-- ===== PHASE 5: final logo (crossfade in) ===== -->
      <image class="flq-final" href="/assets/logo-symbol-transparent.png"
             x="62" y="62" width="296" height="296" preserveAspectRatio="xMidYMid meet"/>
    </svg>
  </div>`;
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
            ${falaqLogoAnimation()}
            <div class="signal-list">${t.home.signals.map((s) => `<div class="signal"><strong>${s[0]}</strong><span>${s[1]}</span></div>`).join("")}</div>
          </div>
        </div>
      </section>
      <section>
        <div class="container">
          <div class="section-head"><div><div class="eyebrow">${t.home.sections.focusEyebrow}</div><h2>${t.home.sections.focusTitle}</h2></div><p>${t.home.sections.focusText}</p></div>
          <div class="infographic-wrapper"><img src="/assets/infographics/funnel-pipeline.png" alt="Pipeline leakage infographic" class="infographic-img"></div>
          <div class="metric-row">
            ${t.home.sections.metrics.map((metric, index) => `<div class="metric"><strong>${String(index + 1).padStart(2, "0")}</strong><span>${metric}</span></div>`).join("")}
          </div>
        </div>
      </section>
      <section><div class="container"><div class="section-head"><h2>${t.home.sections.solutionsTitle}</h2><a class="btn" href="${rootPath("/services/")}">${t.nav.solutions}</a></div>${cards(services.slice(0, 6), "services")}</div></section>
      <section><div class="container"><div class="section-head"><h2>${t.home.sections.industriesTitle}</h2><a class="btn" href="${rootPath("/industries/")}">${t.nav.industries}</a></div>${cards(industries, "industries")}</div></section>
      <section><div class="container split"><div><div class="eyebrow">${t.home.sections.processEyebrow}</div><h2>${t.home.sections.processTitle}</h2><p class="lead">${t.home.sections.processText}</p></div><div class="infographic-wrapper"><img src="/assets/infographics/workflow-4step.png" alt="Implementation workflow" class="infographic-img"></div></div></section>
    </main>`;
}

function listing(type, t) {
  const isServices = type === "services";
  const title = isArabic() ? (isServices ? "الحلول" : "القطاعات") : (isServices ? "Solutions" : "Industries");
  const lead = isArabic()
    ? (isServices ? "اختر سير العمل الذي تريد تحسينه: الرد، التأهيل، المتابعة، العروض، الحجوزات، أو تنسيق العمليات." : "كل قطاع لديه نقاط تعطل مختلفة. نعرضها بلغة التشغيل لا بلغة الوعود العامة.")
    : (isServices ? "Choose the workflow you want to improve: response, qualification, follow-up, proposals, bookings, or operational coordination." : "Each industry has different points of friction. These pages explain the workflows Falaq can support in practical terms.");
  return `<main><section class="page-hero"><div class="container"><div class="eyebrow">Falaq Intelligence</div><h1>${title}</h1><p class="lead">${lead}</p></div></section><section><div class="container">${cards(isServices ? services : industries, type)}</div></section></main>`;
}

function salesMarketingPage(t) {
  const arabic = isArabic();
  const copy = arabic ? {
    eyebrow: "الحل الرئيسي لفلق",
    title: "حوّل اهتمام العملاء إلى فرص مبيعات مؤهلة قبل أن يبرد الطلب.",
    lead: "Falaq Sales & Marketing AI يعمل كطبقة تنفيذ بين الحملات، واتساب، البريد، النماذج، وCRM. يلتقط الطلب، يؤهل العميل، ينظم المتابعة، ويجهز الفريق بما يحتاجه لاتخاذ الإجراء التالي.",
    primary: "اطلب مراجعة سير عمل المبيعات",
    secondary: "تواصل عبر واتساب",
    badge1: "مصمم للمبيعات والتسويق",
    badge2: "واتساب + CRM + البريد + الجداول",
    badge3: "بدون حسابات أو منصة معقدة",
    painTitle: "المشكلة ليست في قلة العملاء. المشكلة في ما يحدث بعد وصول العميل.",
    painLead: "الفرص تضيع عندما يبقى الرد يدويًا، والتأهيل غير موحد، والمتابعة متروكة للذاكرة، وCRM لا يعكس ما يحدث فعليًا.",
    pains: [
      ["رد بطيء", "العميل يسأل اليوم، والفريق يرد غدًا بعد أن يبرد اهتمامه."],
      ["تأهيل غير ثابت", "كل موظف يسأل بطريقة مختلفة، فتصل فرص غير واضحة للفريق."],
      ["متابعة منسية", "لا توجد آلية دقيقة لمعرفة من يحتاج رسالة، اتصال، أو عرض."],
      ["CRM غير محدث", "المحادثات تحدث في واتساب، لكن السجل التجاري يبقى ناقصًا."]
    ],
    systemTitle: "ما الذي ينفذه الوكيل فعليًا؟",
    systemLead: "لا نقدمه كروبوت محادثة عام. هو وكيل عمل مصمم حول سير مبيعات واضح وقواعد تصعيد بشرية.",
    capabilities: [
      ["يلتقط الطلب", "من واتساب، نموذج الموقع، الحملات، البريد، أو الإحالات."],
      ["يؤهل العميل", "يسأل أسئلة معتمدة حول الحاجة، الميزانية، التوقيت، والملاءمة."],
      ["ينظم المتابعة", "يحدد الخطوة التالية، يرسل رسائل متابعة، ويمنع ضياع الفرص."],
      ["يجهز التسليم", "يلخص السياق للفريق ويقترح الإجراء: مكالمة، عرض، أو تصعيد."]
    ],
    flowTitle: "سير عمل نموذجي",
    flowLead: "مثال توضيحي يمكن تخصيصه حسب طريقة مبيعات الشركة وأنظمتها.",
    flow: ["عميل جديد يصل من إعلان أو واتساب", "الوكيل يرد خلال دقائق بنص معتمد", "يجمع الحاجة والتوقيت والميزانية والبيانات الناقصة", "يقيّم الملاءمة ويحدد نوع المتابعة", "يحجز موعدًا أو يجهز ملخصًا للفريق", "يسجل النتيجة في Sheet أو CRM ويراقب المتابعة"],
    exampleTitle: "مثال تشغيلي",
    exampleLead: "شركة خدمات تستقبل 80 طلبًا شهريًا من الحملات وواتساب. بدل أن يقرأ الفريق كل محادثة يدويًا، يقوم الوكيل بفرز الطلبات، تأهيل الجادين، وتجهيز ملخصات للفرص القابلة للتحويل. المثال افتراضي لتوضيح طريقة العمل، وليس نتيجة عميل منشورة.",
    integrationsTitle: "يتصل بالأدوات التي تستخدمها بالفعل",
    integrationsLead: "نبدأ بالحد الأدنى الضروري: واتساب، البريد، Google Sheets، التقويم، أو CRM. لا نضيف تكاملات غير لازمة في البداية.",
    ctaTitle: "ابدأ بعملية واحدة قابلة للقياس.",
    ctaLead: "أرسل لنا كيف تتعاملون مع العملاء الجدد اليوم، وسنقترح Pilot بسيط يركز على الرد، التأهيل، والمتابعة."
  } : {
    eyebrow: "Falaq's primary solution",
    title: "Turn customer interest into qualified pipeline before it goes cold.",
    lead: "Falaq Sales & Marketing AI acts as an execution layer between campaigns, WhatsApp, email, website forms, and your CRM. It captures demand, qualifies leads, organizes follow-up, and prepares the sales team for the next action.",
    primary: "Request a Sales Workflow Review",
    secondary: "Talk on WhatsApp",
    badge1: "Built for sales and marketing",
    badge2: "WhatsApp + CRM + Email + Sheets",
    badge3: "No accounts, no heavy platform",
    painTitle: "The problem is rarely demand. It is what happens after the lead arrives.",
    painLead: "Opportunities leak when response is manual, qualification is inconsistent, follow-up depends on memory, and the CRM does not reflect what actually happened.",
    pains: [
      ["Slow response", "A buyer asks today, but the team responds tomorrow after the intent has cooled."],
      ["Inconsistent qualification", "Every team member asks different questions, so handoffs arrive unclear."],
      ["Missed follow-up", "There is no reliable mechanism for who needs a message, call, or proposal next."],
      ["Unclean CRM data", "The real conversation happens in WhatsApp, while the commercial record stays incomplete."]
    ],
    systemTitle: "What the agent actually does",
    systemLead: "This is not a generic chatbot. It is a work agent designed around a clear sales workflow and human escalation rules.",
    capabilities: [
      ["Captures demand", "From WhatsApp, website forms, campaigns, email, or referrals."],
      ["Qualifies leads", "Asks approved questions about need, timing, budget, and fit."],
      ["Runs follow-up", "Keeps the next step visible and prevents silent lead decay."],
      ["Prepares handoff", "Summarizes context and suggests whether to call, propose, or escalate."]
    ],
    flowTitle: "A practical workflow",
    flowLead: "An illustrative flow that can be adapted to the company's sales process and tools.",
    flow: ["New lead arrives from an ad, form, referral, or WhatsApp", "The agent responds within minutes using approved messaging", "Need, timing, budget, and missing details are collected", "Lead fit is assessed and the next action is selected", "A meeting is booked or a sales-ready brief is prepared", "The outcome is logged in a Sheet or CRM and follow-up is tracked"],
    exampleTitle: "Operational example",
    exampleLead: "A service company receives 80 monthly inquiries from campaigns and WhatsApp. Instead of reading every chat manually, the agent filters inquiries, qualifies serious buyers, and prepares summaries for opportunities worth pursuing. This is an illustrative example, not a published client result.",
    integrationsTitle: "Connects to the tools you already use",
    integrationsLead: "Start with the smallest useful setup: WhatsApp, email, Google Sheets, calendar, or CRM. We do not add integrations just to make the project look bigger.",
    ctaTitle: "Start with one measurable workflow.",
    ctaLead: "Send us how your team handles new inquiries today. We will suggest a focused pilot around response, qualification, and follow-up."
  };

  const integrations = ["WhatsApp Business", "CRM", "Google Sheets", "Email", "Calendar", "Website forms"];

  return `<main class="premium-service">
    <section class="premium-hero">
      <div class="container premium-hero-grid">
        <div class="reveal">
          <div class="eyebrow">${copy.eyebrow}</div>
          <h1>${copy.title}</h1>
          <p class="lead">${copy.lead}</p>
          <div class="hero-actions">
            <a class="btn primary" href="${rootPath("/contact/")}">${copy.primary}</a>
            <a class="btn" href="https://wa.me/${CONFIG.whatsappNumber}" target="_blank" rel="noreferrer">${copy.secondary}</a>
          </div>
          <div class="hero-badges">
            <span>${copy.badge1}</span><span>${copy.badge2}</span><span>${copy.badge3}</span>
          </div>
        </div>
        <div class="service-visual reveal" aria-label="Sales and marketing agent workflow">
          <div class="visual-core"><img src="/assets/logo-symbol-transparent.png" alt=""></div>
          <div class="pipeline-line"></div>
          <div class="diagram-node node-a">Lead</div>
          <div class="diagram-node node-b">Qualify</div>
          <div class="diagram-node node-c">Follow-up</div>
          <div class="diagram-node node-d">CRM</div>
          <div class="pulse-dot dot-a"></div>
          <div class="pulse-dot dot-b"></div>
          <div class="pulse-dot dot-c"></div>
        </div>
      </div>
    </section>

    <section>
      <div class="container split">
        <div class="reveal">
          <div class="eyebrow">Pipeline leakage</div>
          <h2>${copy.painTitle}</h2>
          <p class="lead">${copy.painLead}</p>
        </div>
        <div class="infographic-wrapper reveal"><img src="/assets/infographics/funnel-pipeline.png" alt="Pipeline leakage funnel" class="infographic-img"></div>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="section-head reveal"><div><div class="eyebrow">Execution layer</div><h2>${copy.systemTitle}</h2></div><p>${copy.systemLead}</p></div>
        <div class="infographic-wrapper reveal"><img src="/assets/infographics/capabilities.png" alt="Execution capabilities diagram" class="infographic-img"></div>
        <div class="feature-row">
          ${copy.capabilities.map(([title, text]) => `<div class="flow-card reveal"><span></span><h3>${title}</h3><p>${text}</p></div>`).join("")}
        </div>
      </div>
    </section>

    <section>
      <div class="container split">
        <div class="reveal">
          <div class="eyebrow">Workflow</div>
          <h2>${copy.flowTitle}</h2>
          <p class="lead">${copy.flowLead}</p>
        </div>
        <div class="infographic-wrapper reveal"><img src="/assets/infographics/workflow-6step.png" alt="Sales workflow diagram" class="infographic-img"></div>
      </div>
    </section>

    <section>
      <div class="container split">
        <div class="card example-card reveal">
          <div class="eyebrow">Illustrative scenario</div>
          <h2>${copy.exampleTitle}</h2>
          <p>${copy.exampleLead}</p>
        </div>
        <div class="card reveal">
          <div class="eyebrow">Integrations</div>
          <h2>${copy.integrationsTitle}</h2>
          <p class="muted">${copy.integrationsLead}</p>
          <div class="infographic-wrapper"><img src="/assets/infographics/integration-hub.png" alt="Integration hub diagram" class="infographic-img"></div>
        </div>
      </div>
    </section>

    <section>
      <div class="container cta-band reveal">
        <div>
          <div class="eyebrow">Start small</div>
          <h2>${copy.ctaTitle}</h2>
          <p>${copy.ctaLead}</p>
        </div>
        <div class="section-actions">
          <a class="btn primary" href="${rootPath("/contact/")}">${copy.primary}</a>
          <a class="btn" href="mailto:${CONFIG.email}">${CONFIG.email}</a>
        </div>
      </div>
    </section>
  </main>`;
}

function iconSvg(name) {
  const icons = {
    clock: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"></circle><path d="M12 7v5l3 2"></path></svg>`,
    target: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"></circle><circle cx="12" cy="12" r="3"></circle><path d="M12 2v3M12 19v3M2 12h3M19 12h3"></path></svg>`,
    bell: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7"></path><path d="M10 20a2 2 0 0 0 4 0"></path></svg>`,
    database: `<svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="5" rx="7" ry="3"></ellipse><path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5"></path><path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"></path></svg>`,
    inbox: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16l-2 10H6L4 4Z"></path><path d="M6 14l2 4h8l2-4"></path></svg>`,
    filter: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16l-6 7v5l-4 2v-7L4 5Z"></path></svg>`,
    repeat: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 2l4 4-4 4"></path><path d="M3 11V9a3 3 0 0 1 3-3h15"></path><path d="M7 22l-4-4 4-4"></path><path d="M21 13v2a3 3 0 0 1-3 3H3"></path></svg>`,
    handoff: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 11h8"></path><path d="M12 7l4 4-4 4"></path><path d="M4 5h5"></path><path d="M15 19h5"></path><path d="M4 19h5"></path><path d="M15 5h5"></path></svg>`
  };
  return `<span class="icon-bubble">${icons[name] || icons.target}</span>`;
}

function salesMarketingPageV2(t) {
  const arabic = isArabic();
  const copy = arabic ? {
    eyebrow: "للمبيعات التي تعتمد على سرعة الرد والمتابعة",
    title: "حوّل كل استفسار إلى خطوة مبيعات واضحة قبل أن يبرد اهتمام العميل.",
    lead: "Falaq Sales & Marketing AI ينظم ما يحدث بعد وصول العميل: يرد بسرعة، يسأل أسئلة التأهيل، يفرز الفرص، يجهز ملخصًا للفريق، ويتابع حتى لا تضيع المحادثة داخل واتساب أو CRM.",
    primary: "اطلب مراجعة سير عمل المبيعات",
    secondary: "تواصل عبر واتساب",
    badges: ["للفرق التي تبيع عبر واتساب والنماذج", "تأهيل + متابعة + CRM + عروض", "Pilot صغير قبل التوسع"],
    painTitle: "الفرصة لا تضيع عند الإعلان. غالبًا تضيع بعد أول رسالة.",
    painLead: "العميل المهتم يحتاج ردًا واضحًا، أسئلة مختصرة، وخطوة تالية. عندما يعتمد ذلك على الذاكرة والانشغال اليومي، يصبح التسرب طبيعيًا.",
    pains: [
      ["رد متأخر", "الاستفسار يصل في لحظة اهتمام عالية. التأخير يحوّل العميل من فرصة نشطة إلى محادثة باردة."],
      ["تأهيل غير موحد", "كل موظف يسأل بطريقة مختلفة، فتصل للفريق فرص ناقصة أو غير جاهزة للتصرف."],
      ["متابعة غير مضمونة", "رسالة لم ترسل أو عرض تأخر يومين قد يضيع فرصة كانت قريبة من القرار."],
      ["سجل تجاري ناقص", "المحادثة في واتساب، والقرار في CRM. عندما لا يتزامنان، يخسر الفريق السياق."]
    ],
    systemTitle: "ما الذي يتولاه الوكيل؟",
    systemLead: "لا نضع روبوتًا عامًا أمام العميل. نبني وكيلًا حول طريقة بيعك الحالية حتى ينفذ الخطوات المتكررة ويترك القرار البشري في مكانه الصحيح.",
    capabilities: [
      ["يلتقط الطلب فور وصوله", "من واتساب، الموقع، الإعلانات، البريد، أو الإحالات، ثم يبدأ مسارًا منظمًا بدل انتظار الفريق."],
      ["يؤهل باختصار ووضوح", "يجمع الحاجة، التوقيت، الميزانية التقريبية، المنطقة، والبيانات الناقصة قبل التسليم."],
      ["يحافظ على المتابعة", "يرسل رسائل معتمدة، يذكّر بالخطوة التالية، ويمنع بقاء الفرص النشطة بلا إجراء."],
      ["يسلّم سياقًا جاهزًا", "من العميل، ماذا يريد، مدى الجدية، وما الإجراء الأنسب: اتصال، عرض، موعد، أو تصعيد."]
    ],
    flowTitle: "سير عمل يمكن إطلاقه كـ Pilot",
    flowLead: "نبدأ بتدفق واحد واضح ثم نعدّل الأسئلة والنبرة والتصعيد حسب فريقك وسوقك.",
    flow: ["عميل يرسل واتساب أو يملأ نموذجًا", "الوكيل يرد بلغة العلامة ونطاق إجابات معتمد", "يجمع الحاجة والتوقيت والميزانية والبيانات الناقصة", "يصنف العميل: جاهز للبيع، يحتاج متابعة، غير مناسب، أو يحتاج تصعيدًا", "يرسل ملخصًا للفريق أو يحجز موعدًا حسب القواعد", "يسجل الحالة والخطوة التالية في Sheet أو CRM"],
    exampleTitle: "مثال تشغيلي",
    exampleLead: "شركة خدمات تستقبل استفسارات من الإعلانات وواتساب. بدل أن يقرأ الفريق كل محادثة من الصفر، يحصل على تأهيل مختصر، تصنيف واضح، وخطوة تالية. المثال توضيحي لطريقة العمل وليس نتيجة عميل منشورة.",
    integrationsTitle: "يتصل بما تستخدمه بالفعل",
    integrationsLead: "نبدأ بالأدوات الضرورية فقط: واتساب، البريد، Google Sheets، التقويم، أو CRM. لا نضيف تكاملات بلا فائدة.",
    ctaTitle: "ابدأ من نقطة تسرب واحدة.",
    ctaLead: "أرسل كيف يدخل العميل اليوم، من يرد، كيف يتم التأهيل، وأين تتوقف المتابعة. سنقترح Pilot عمليًا لهذه النقطة."
  } : {
    eyebrow: "For sales teams that depend on speed and follow-up",
    title: "Turn every inquiry into a clear sales step before the intent cools.",
    lead: "Falaq Sales & Marketing AI organizes what happens after a lead arrives: fast response, short qualification, opportunity sorting, sales-ready handoff, and follow-up that does not disappear inside WhatsApp or CRM noise.",
    primary: "Request a Sales Workflow Review",
    secondary: "Talk on WhatsApp",
    badges: ["For WhatsApp and form-led sales", "Qualification + Follow-up + CRM + Proposals", "Small pilot before expansion"],
    painTitle: "The opportunity rarely dies in the campaign. It dies after the first message.",
    painLead: "Interested buyers need a clear reply, a few useful questions, and a next step. When that depends on memory and daily pressure, leakage becomes normal.",
    pains: [
      ["Late first response", "A new inquiry arrives at peak intent. Delay turns an active buyer into a cold conversation."],
      ["Uneven qualification", "Each person asks different questions, so the team receives leads with missing or inconsistent context."],
      ["Unreliable follow-up", "One unsent message or delayed proposal can lose an opportunity that was close to action."],
      ["Incomplete CRM context", "The conversation is in WhatsApp, the decision is in CRM. When they drift apart, the team loses context."]
    ],
    systemTitle: "What the agent handles",
    systemLead: "This is not a generic chatbot in front of your customers. It is built around your current sales motion, handling repetitive steps while humans stay responsible for judgment, negotiation, and relationships.",
    capabilities: [
      ["Captures the inquiry as it arrives", "Receives leads from WhatsApp, forms, campaigns, email, or referrals and starts a structured path."],
      ["Qualifies with short, useful questions", "Collects need, timing, budget range, location, and missing details before the handoff."],
      ["Keeps follow-up moving", "Sends approved messages, flags stalled opportunities, and keeps the next step visible."],
      ["Hands over clean context", "Prepares a brief: who the lead is, what they need, how serious they are, and what should happen next."]
    ],
    flowTitle: "A workflow you can launch as a pilot",
    flowLead: "We start with one clear flow, then adapt the questions, tone, routing, and escalation rules to your team and market.",
    flow: ["A prospect arrives from WhatsApp, a form, an ad, or a referral", "The agent replies using approved brand-safe messaging", "Need, timing, budget range, and missing details are collected", "The lead is classified: sales-ready, nurture, poor fit, or needs escalation", "A brief is sent to the team or a meeting is booked according to rules", "Status and next step are logged in a Sheet or CRM"],
    exampleTitle: "Operational example",
    exampleLead: "A service company receives inquiries from ads and WhatsApp. Instead of reading every chat from zero, the team receives short qualification, clear classification, and a next step. This is an illustrative example, not a published client result.",
    integrationsTitle: "Connects to what you already use",
    integrationsLead: "Start with only the tools needed: WhatsApp, email, Google Sheets, calendar, or CRM. No unnecessary integrations for show.",
    ctaTitle: "Start with one leakage point.",
    ctaLead: "Send us how new leads enter today, who replies, how qualification happens, and where follow-up stalls. We will suggest a practical pilot around that point."
  };

  const labels = arabic ? {
    pain: "تسرب الفرص",
    execution: "طبقة التنفيذ",
    workflow: "سير العمل",
    scenario: "سيناريو توضيحي",
    integrations: "التكاملات",
    start: "ابدأ من نقطة واحدة"
  } : {
    pain: "Pipeline leakage",
    execution: "Execution layer",
    workflow: "Workflow",
    scenario: "Illustrative scenario",
    integrations: "Integrations",
    start: "Start focused"
  };

  const integrations = ["WhatsApp Business", "CRM", "Google Sheets", "Email", "Calendar", "Website forms"];
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
            <a class="btn primary" href="${rootPath("/contact/")}">${copy.primary}</a>
            <a class="btn" href="https://wa.me/${CONFIG.whatsappNumber}" target="_blank" rel="noreferrer">${copy.secondary}</a>
          </div>
          <div class="hero-badges">${copy.badges.map((badge) => `<span>${badge}</span>`).join("")}</div>
        </div>
        <div class="product-visual reveal" aria-label="Sales and marketing AI product visual">
          <img src="/assets/sales-marketing-ai-product.png" alt="Falaq Sales and Marketing AI workflow visual">
          <div class="product-shine"></div>
        </div>
      </div>
    </section>

    <section>
      <div class="container split">
        <div class="reveal">
          <div class="eyebrow">${labels.pain}</div>
          <h2>${copy.painTitle}</h2>
          <p class="lead">${copy.painLead}</p>
        </div>
        <div class="pain-grid">
          ${copy.pains.map(([title, text], index) => `<div class="card icon-card reveal">${iconSvg(painIcons[index])}<h3>${title}</h3><p>${text}</p></div>`).join("")}
        </div>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="section-head reveal"><div><div class="eyebrow">${labels.execution}</div><h2>${copy.systemTitle}</h2></div><p>${copy.systemLead}</p></div>
        <div class="feature-row">
          ${copy.capabilities.map(([title, text], index) => `<div class="flow-card reveal">${iconSvg(capabilityIcons[index])}<h3>${title}</h3><p>${text}</p></div>`).join("")}
        </div>
      </div>
    </section>

    <section>
      <div class="container split">
        <div class="reveal">
          <div class="eyebrow">${labels.workflow}</div>
          <h2>${copy.flowTitle}</h2>
          <p class="lead">${copy.flowLead}</p>
        </div>
        <ol class="workflow premium-flow">
          ${copy.flow.map((item) => `<li class="reveal">${item}</li>`).join("")}
        </ol>
      </div>
    </section>

    <section>
      <div class="container split">
        <div class="card example-card reveal">
          <div class="eyebrow">${labels.scenario}</div>
          <h2>${copy.exampleTitle}</h2>
          <p>${copy.exampleLead}</p>
        </div>
        <div class="card reveal">
          <div class="eyebrow">${labels.integrations}</div>
          <h2>${copy.integrationsTitle}</h2>
          <p class="muted">${copy.integrationsLead}</p>
          <div class="integration-strip">${integrations.map((item) => `<span>${item}</span>`).join("")}</div>
        </div>
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
          <a class="btn primary" href="${rootPath("/contact/")}">${copy.primary}</a>
          <a class="btn" href="mailto:${CONFIG.email}">${CONFIG.email}</a>
        </div>
      </div>
    </section>
  </main>`;
}

function servicePage(slug, t) {
  if (slug === "sales-marketing-ai") return salesMarketingPageV2(t);
  const svc = serviceBySlug(slug) || services[0];
  const title = isArabic() && serviceAr[slug] ? serviceAr[slug][0] : svc[1];
  const lead = isArabic() && serviceAr[slug] ? serviceAr[slug][1] : svc[2];
  const serviceCopy = {
    en: {
      benefits: svc[3],
      flow: svc[4],
      eyebrow: "AI workflow",
      whatTitle: "What it improves",
      whatText: "Built for a specific operational path, not for open-ended chat.",
      flowTitle: "How the workflow runs",
      flowText: "A practical starting flow that can be adapted to your tools and approval rules.",
      startTitle: "Start with the part that slows your team down",
      startText: "Send the workflow as it works today. We will identify a practical pilot scope and the tools needed to launch it."
    },
    ar: {
      benefits: ["تقليل الخطوات اليدوية المتكررة", "تسليم أوضح للفريق", "تصعيد الحالات التي تحتاج قرارًا بشريًا"],
      flow: ["يصل الطلب من العميل أو النظام", "يجمع الوكيل البيانات المطلوبة", "ينظم النتيجة والخطوة التالية", "يتدخل الفريق عند الحاجة"],
      eyebrow: "سير عمل بالذكاء الاصطناعي",
      whatTitle: "ما الذي يحسّنه",
      whatText: "مصمم لمسار تشغيلي محدد، لا لمحادثة مفتوحة بلا هدف.",
      flowTitle: "كيف يعمل سير العمل",
      flowText: "تدفق بداية عملي يمكن تعديله حسب أدواتك وقواعد الموافقة والتصعيد.",
      startTitle: "ابدأ من الجزء الذي يبطئ فريقك",
      startText: "أرسل لنا كيف تتم العملية اليوم. سنحدد نطاق Pilot عمليًا والأدوات اللازمة لإطلاقه."
    }
  };
  const copy = isArabic() ? serviceCopy.ar : serviceCopy.en;
  return `<main>
    <section class="page-hero"><div class="container"><div class="eyebrow">${copy.eyebrow}</div><h1>${title}</h1><p class="lead">${lead}</p><div class="hero-actions"><a class="btn primary" href="${rootPath("/contact/")}">${t.nav.cta}</a><a class="btn" href="https://wa.me/${CONFIG.whatsappNumber}" target="_blank" rel="noreferrer">${t.labels.whatsapp}</a></div></div></section>
    <section><div class="container split"><div><h2>${copy.whatTitle}</h2><p class="lead">${copy.whatText}</p></div><div class="grid">${copy.benefits.map((b) => `<div class="card"><h3>${b}</h3><p>${copy.whatText}</p></div>`).join("")}</div></div></section>
    <section><div class="container split"><div><h2>${copy.flowTitle}</h2><p class="muted">${copy.flowText}</p></div><div class="infographic-wrapper"><img src="/assets/infographics/workflow-${slug === "whatsapp-agent" ? "whatsapp" : slug === "lead-agent" ? "lead" : slug === "proposal-agent" ? "proposal" : slug === "content-engine" ? "content" : "4step"}.png" alt="${copy.flowTitle}" class="infographic-img"></div></div></section>
    <section><div class="container"><div class="section-head"><h2>${copy.startTitle}</h2><p>${copy.startText}</p></div><a class="btn primary" href="${rootPath("/contact/")}">${t.home.primary}</a></div></section>
  </main>`;
}

function industryPage(slug, t) {
  const ind = industryBySlug(slug) || industries[0];
  const title = isArabic() && industryAr[slug] ? industryAr[slug][0] : ind[1];
  const lead = isArabic() && industryAr[slug] ? industryAr[slug][1] : ind[2];
  const needs = isArabic() ? {
    "sales-marketing": ["رد متأخر على العملاء", "تأهيل غير موحد", "متابعة غير مضمونة", "CRM غير محدث"],
    healthcare: ["ضغط على فريق الاستقبال", "تأكيدات ومواعيد متكررة", "بيانات مرضى ناقصة", "تنسيق إداري يحتاج متابعة"],
    "real-estate": ["استفسارات كثيرة غير مؤهلة", "معلومات مشترين ناقصة", "متابعة باردة", "مواعيد غير منظمة"],
    logistics: ["مواقع غير دقيقة", "معلومات طلبات ناقصة", "توزيع يحتاج مراجعة", "تواصل متكرر مع العميل"],
    "content-teams": ["أفكار غير منظمة", "مراجعات متأخرة", "أصول متناثرة", "مهام نشر غير واضحة"]
  }[slug] || ["تكرار في الرد والمتابعة", "معلومات ناقصة قبل التنفيذ", "ضعف في تسليم الطلبات بين الفرق", "حاجة لرؤية تشغيلية أوضح"] : ind[3];
  const copy = isArabic() ? {
    eyebrow: "قطاع تشغيلي",
    whereTitle: "أين تساعد فلق",
    cardText: "نحوّل هذه النقطة إلى سير عمل واضح، قابل للتتبع، وفيه تصعيد بشري عند الحاجة.",
    relevantTitle: "حلول مناسبة لهذا القطاع"
  } : {
    eyebrow: "Industry workflow",
    whereTitle: "Where Falaq helps",
    cardText: "We turn this friction point into a clear, trackable workflow with human escalation where needed.",
    relevantTitle: "Relevant solutions"
  };
  return `<main>
    <section class="page-hero"><div class="container"><div class="eyebrow">${copy.eyebrow}</div><h1>${title}</h1><p class="lead">${lead}</p><div class="hero-actions"><a class="btn primary" href="${rootPath("/contact/")}">${t.nav.cta}</a></div></div></section>
    <section><div class="container split"><div><h2>${copy.whereTitle}</h2><p class="lead">${lead}</p></div><div class="infographic-wrapper"><img src="/assets/infographics/friction-${slug === "sales-marketing" ? "sales" : slug}.png" alt="Friction points" class="infographic-img"></div></div></section>
    <section><div class="container"><div class="section-head"><h2>${copy.relevantTitle}</h2></div>${cards(services.slice(0, slug === "sales-marketing" ? 5 : 4), "services")}</div></section>
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
      <div class="card card-team"><img src="/assets/infographics/team-baraa.png" alt="Baraa Al-Shakarna" class="team-avatar"><h3>Baraa Al-Shakarna</h3><p>Founder & AI Solutions Specialist</p></div>
      <div class="card card-team"><img src="/assets/infographics/team-mohammed.png" alt="Mohammed Najajreh" class="team-avatar"><h3>Mohammed Najajreh</h3><p>Sales Manager & Public Relations</p></div>
      <div class="card card-team"><img src="/assets/infographics/team-younis.png" alt="Younis Elayn" class="team-avatar"><h3>Younis Elayn</h3><p>Marketing Manager & Business Analyst</p></div>
    </div></div></section>
  </main>`;
}

function contact(t) {
  return `<main><section class="page-hero"><div class="container"><div class="eyebrow">${isArabic() ? "تواصل" : "Contact"}</div><h1>${t.contact.title}</h1><p class="lead">${t.contact.lead}</p></div></section>
    <section><div class="container split"><div class="card"><h2>${t.contact.direct}</h2><p class="muted">${CONFIG.whatsappDisplay}</p><p class="muted">${CONFIG.email}</p><div class="section-actions"><a class="btn primary" href="https://wa.me/${CONFIG.whatsappNumber}" target="_blank" rel="noreferrer">${t.labels.whatsapp}</a><a class="btn" href="mailto:${CONFIG.email}">${t.labels.emailContact}</a></div></div><div class="card"><h2>${t.contact.formTitle}</h2>${form(t)}</div></div></section></main>`;
}

function form(t) {
  const arabic = isArabic();
  const interestOptions = arabic ? [
    ["sales-marketing-ai", "ذكاء المبيعات والتسويق"],
    ["whatsapp-agent", "وكيل واتساب"],
    ["lead-agent", "وكيل العملاء المحتملين"],
    ["proposal-agent", "وكيل العروض"],
    ["clinic-agent", "وكيل العيادات"],
    ["fleet-optimizer", "محسن الأسطول"],
    ["real-estate", "العقارات"],
    ["content-teams", "فرق المحتوى"]
  ] : [
    ["sales-marketing-ai", "Sales & Marketing AI"],
    ["whatsapp-agent", "WhatsApp Agent"],
    ["lead-agent", "Lead Agent"],
    ["proposal-agent", "Proposal Agent"],
    ["clinic-agent", "Healthcare Operations"],
    ["fleet-optimizer", "Logistics & Fleet"],
    ["real-estate", "Real Estate"],
    ["content-teams", "Content Teams"]
  ];
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
    services: arabic ? "حلول الذكاء الاصطناعي العملية | فلق" : "AI Workflow Solutions | Falaq",
    industries: arabic ? "القطاعات وسير العمل | فلق" : "Industries and Workflows | Falaq",
    about: arabic ? "عن فلق | ذكاء اصطناعي للتنفيذ" : "About Falaq | AI for execution",
    contact: arabic ? "راجع سير عملك | فلق" : "Review Your Workflow | Falaq",
    "thank-you": arabic ? "شكرًا لك | فلق لحلول الذكاء الصناعي" : "Thank you | Falaq Intelligence"
  };
  const descriptions = {
    home: arabic ? "فلق تبني وكلاء ذكاء اصطناعي للرد، التأهيل، المتابعة، وتسليم العمل داخل أدوات الشركات." : "Falaq builds AI agents for response, qualification, follow-up, and operational handoff inside business tools.",
    services: arabic ? "اختر سير العمل الذي تريد تحسينه: العملاء، واتساب، العروض، الحجوزات، المواقع، أو تنسيق العمليات." : "Choose the workflow you want to improve: leads, WhatsApp, proposals, bookings, locations, or operational coordination.",
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
  else if (p[0] === "services" && p[1]) { content = servicePage(p[1], t); page = "services"; }
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
  if (button && links) button.addEventListener("click", () => links.classList.toggle("open"));
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
      // Better fallback: show contact options instead of mailto
      status.innerHTML = isArabic() 
        ? `تم استلام طلبك. للتواصل المباشر:<br><a href="https://wa.me/${CONFIG.whatsappNumber}" target="_blank" class="btn primary small" style="margin-top:10px;display:inline-flex">واتساب</a> <a href="mailto:${CONFIG.email}" class="btn small" style="margin-top:10px;display:inline-flex">بريد إلكتروني</a>`
        : `Your request is received. For direct contact:<br><a href="https://wa.me/${CONFIG.whatsappNumber}" target="_blank" class="btn primary small" style="margin-top:10px;display:inline-flex">WhatsApp</a> <a href="mailto:${CONFIG.email}" class="btn small" style="margin-top:10px;display:inline-flex">Email</a>`;
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
