const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const site = "https://falaqai.com";
const updated = "2026-07-16";

const labels = {
  ar: {
    dir: "rtl",
    home: "الرئيسية",
    services: "الخدمات",
    trust: "الثقة والمعايير",
    about: "من نحن",
    contact: "تواصل معنا",
    contents: "محتويات الصفحة",
    updated: "آخر تحديث: 16 يوليو 2026",
    related: "صفحات ذات صلة",
    company: "الشركة والمعايير",
    legal: "السياسات القانونية",
    footer: "نبني وكلاء ذكاء اصطناعي ينفذون العمل داخل عمليات الشركات بالعربية والإنجليزية.",
    rights: "فلق للذكاء الاصطناعي. جميع الحقوق محفوظة.",
    language: "EN",
  },
  en: {
    dir: "ltr",
    home: "Home",
    services: "Services",
    trust: "Trust & standards",
    about: "About",
    contact: "Contact us",
    contents: "On this page",
    updated: "Last updated: 16 July 2026",
    related: "Related pages",
    company: "Company & standards",
    legal: "Legal policies",
    footer: "We build AI agents that perform real work inside business operations in Arabic and English.",
    rights: "Falaq Intelligence. All rights reserved.",
    language: "العربية",
  },
};

const pages = [
  {
    slug: "about",
    ar: {
      title: "من نحن | فلق للذكاء الاصطناعي للشركات",
      description: "تعرف على فلق ورؤيتها ومنهجها في بناء وكلاء ذكاء اصطناعي عمليين للشركات في الأردن والخليج.",
      eyebrow: "عن فلق",
      h1: "نبني ذكاءً اصطناعيًا يعمل داخل عمليات الشركات",
      intro: "فلق شركة متخصصة في تصميم وبناء وتشغيل وكلاء ذكاء اصطناعي يربطون قنوات الشركة وأنظمتها وينفذون مهامًا تشغيلية واضحة، بدل الاكتفاء بالإجابة داخل نافذة محادثة.",
      sections: [
        { title: "ما الذي نبنيه؟", paragraphs: ["نبني وكلاء لتأهيل العملاء، متابعة عروض الأسعار، إدارة الحجوزات، خدمة العملاء، تحصيل المستحقات، معالجة المستندات، وتنظيم بيانات CRM. يبدأ كل مشروع من عملية حقيقية لها مدخلات وقرارات ونتيجة قابلة للقياس."], bullets: ["وكلاء محادثة وتنفيذ بالعربية والإنجليزية", "تكامل مع القنوات والأنظمة التي تستخدمها الشركة", "صلاحيات واضحة وتسليم بشري للحالات الاستثنائية", "سجل قابل للمراجعة لما تم تنفيذه"] },
        { title: "الأسواق التي نخدمها", paragraphs: ["نركز على الشركات في الأردن ودول الخليج، مع مراعاة اللغة والسياق التشغيلي وطريقة تواصل العملاء في المنطقة. تُصمم الحلول لتعمل مع سياسات كل شركة وأنظمتها، لا كمنتج عام يفرض طريقة عمل واحدة."], bullets: ["الأردن", "السعودية", "الإمارات", "عُمان", "قطر", "الكويت"] },
        { title: "طريقة عملنا", paragraphs: ["نبدأ بعملية واحدة عالية الأثر، نوثق الوضع الحالي، نحدد ما ينفذه الوكيل وما يبقى مع الموظف، ثم نبني تجربة محددة النطاق قبل التوسع. لا نربط نجاح المشروع بعدد الرسائل، بل بنتيجة تشغيلية مثل سرعة الاستجابة أو اكتمال البيانات أو خفض العمل اليدوي."], bullets: ["اكتشاف العملية وتحديد خط الأساس", "تصميم الصلاحيات والاستثناءات", "بناء واختبار تجربة محددة", "إطلاق تدريجي ومراقبة النتائج", "تحسين مستمر بناءً على البيانات"] },
        { title: "التواصل", paragraphs: ["للاستفسارات التجارية أو أسئلة الخصوصية والأمان، تواصل معنا عبر hello@falaqai.com أو واتساب على الرقم +962 79 296 1872."] },
      ],
    },
    en: {
      title: "About Falaq Intelligence | Practical AI Agents",
      description: "Learn how Falaq designs and operates practical AI agents for companies across Jordan and the Gulf.",
      eyebrow: "About Falaq",
      h1: "We build AI that works inside business operations",
      intro: "Falaq designs, builds, and operates AI agents that connect business channels and systems to perform clear operational tasks, rather than stopping at answers inside a chat window.",
      sections: [
        { title: "What we build", paragraphs: ["We build agents for lead qualification, quote follow-up, booking, customer service, accounts receivable, document processing, and CRM control. Every project starts with a real process that has defined inputs, decisions, and a measurable outcome."], bullets: ["Arabic and English conversational and execution agents", "Integration with the channels and systems a company already uses", "Clear permissions and human handoff for exceptions", "A reviewable record of completed actions"] },
        { title: "Markets we serve", paragraphs: ["We focus on companies in Jordan and the Gulf, accounting for the language, operating context, and customer communication patterns of the region. Solutions are designed around each company’s systems and policies rather than forcing one generic workflow."], bullets: ["Jordan", "Saudi Arabia", "United Arab Emirates", "Oman", "Qatar", "Kuwait"] },
        { title: "How we work", paragraphs: ["We start with one high-impact process, document the current state, define what the agent executes and what stays human, then build a scoped pilot before expanding. Success is tied to an operational result such as response time, data completeness, or reduced manual work, not message volume."], bullets: ["Process discovery and baseline", "Permissions and exception design", "Scoped build and testing", "Gradual launch and monitoring", "Continuous improvement based on data"] },
        { title: "Contact", paragraphs: ["For commercial inquiries or questions about privacy and security, email hello@falaqai.com or contact us on WhatsApp at +962 79 296 1872."] },
      ],
    },
  },
  {
    slug: "trust",
    ar: {
      title: "الثقة والأمان | معايير فلق للذكاء الاصطناعي",
      description: "تعرف على معايير فلق لحماية البيانات والصلاحيات والمراقبة والتسليم البشري في حلول الذكاء الاصطناعي.",
      eyebrow: "مركز الثقة",
      h1: "الأمان والصلاحيات جزء من تصميم الوكيل، لا إضافة لاحقة",
      intro: "نصمم كل وكيل حول أقل قدر لازم من البيانات والصلاحيات، مع حدود تنفيذ واضحة وسجل للعمليات ومسار تصعيد بشري. تختلف الضوابط النهائية حسب حساسية العملية والأنظمة المتصلة واتفاق العميل.",
      sections: [
        { title: "حماية البيانات", paragraphs: ["تنتقل بيانات الموقع والخدمات عبر اتصالات HTTPS. عند تصميم الحل نحدد مصادر البيانات والغرض من استخدامها ومدة الاحتفاظ المطلوبة، ونتجنب جمع حقول لا تحتاجها العملية."], bullets: ["تقليل البيانات إلى ما تحتاجه المهمة", "فصل بيانات كل مشروع وبيئاته بحسب التصميم المتفق عليه", "تحديد مدة الاحتفاظ والحذف مع العميل", "عدم بيع بيانات العملاء أو استخدامها للإعلانات"] },
        { title: "التحكم في الوصول", paragraphs: ["يُمنح كل تكامل أقل صلاحية تكفي لتنفيذ المهمة. لا يُفترض أن يمتلك الوكيل وصولًا شاملًا إلى النظام إذا كانت العملية تحتاج قراءة أو تعديل حقول محددة فقط."], bullets: ["مبدأ أقل صلاحية", "فصل حسابات الخدمة عن حسابات الموظفين حيثما أمكن", "مراجعة الصلاحيات عند تغيير نطاق العمل", "تعطيل الوصول عند انتهاء الحاجة أو العقد"] },
        { title: "المراقبة والاستجابة", paragraphs: ["نحدد الأحداث التي يجب تسجيلها والتنبيه عليها قبل الإطلاق. في الخدمات المُدارة، تُراقب الأخطاء والتكاملات وفق نطاق الدعم المتفق عليه، وتُصعّد الحوادث بحسب أثرها."], bullets: ["سجل للرسائل والإجراءات المهمة", "تنبيه عند فشل التكامل أو تجاوز قاعدة", "إمكانية إيقاف الإجراء التلقائي", "توثيق الحادث والإجراء التصحيحي"] },
        { title: "الموردون ومعالجو البيانات", paragraphs: ["قد تعتمد الحلول على مزودي استضافة ونماذج ذكاء اصطناعي وبريد وتكاملات يوافق عليها العميل. نوضح فئات الموردين وتدفق البيانات ضمن تصميم المشروع، وتظل شروط كل مزود وضوابطه جزءًا من تقييم الحل."], bullets: ["استضافة الواجهة والخدمات", "مزودو نماذج الذكاء الاصطناعي", "خدمات البريد والإشعارات", "أنظمة العميل مثل CRM والتقويم والمحاسبة"] },
        { title: "الإبلاغ عن مشكلة أمنية", paragraphs: ["إذا اكتشفت ثغرة أو سلوكًا غير متوقع، أرسل وصفًا وخطوات إعادة المشكلة إلى hello@falaqai.com. تجنب إرسال بيانات حساسة في الرسالة الأولى، وسنتواصل لتحديد قناة مناسبة عند الحاجة."] },
      ],
    },
    en: {
      title: "Trust and Security | Falaq Intelligence Standards",
      description: "Review Falaq standards for data protection, permissions, monitoring, and human handoff in AI agent solutions.",
      eyebrow: "Trust center",
      h1: "Security and permissions are designed into the agent",
      intro: "Every agent is designed around the minimum necessary data and permissions, with clear execution boundaries, operational records, and a human escalation path. Final controls vary by process sensitivity, connected systems, and the client agreement.",
      sections: [
        { title: "Data protection", paragraphs: ["Website and service data travels over HTTPS connections. During solution design, we define data sources, purpose, and required retention, and avoid collecting fields the process does not need."], bullets: ["Data minimization for the task", "Project and environment separation according to the agreed design", "Retention and deletion rules defined with the client", "No sale of client data or use for advertising"] },
        { title: "Access control", paragraphs: ["Each integration receives the least access needed for its task. An agent should not have broad system access when the process only requires reading or updating specific records."], bullets: ["Least-privilege access", "Service accounts separated from employee accounts where possible", "Permission review when scope changes", "Access disabled when no longer required"] },
        { title: "Monitoring and response", paragraphs: ["Events that require logging and alerts are defined before launch. For managed services, errors and integrations are monitored within the agreed support scope, and incidents are escalated according to impact."], bullets: ["Logs for important messages and actions", "Alerts for integration failures or rule breaches", "Ability to pause automated actions", "Incident and corrective-action documentation"] },
        { title: "Vendors and data processors", paragraphs: ["Solutions may rely on hosting, AI model, email, and integration providers approved for the project. We explain vendor categories and data flow in the solution design; each provider’s terms and controls remain part of the assessment."], bullets: ["Frontend and service hosting", "AI model providers", "Email and notification services", "Client systems such as CRM, calendar, and accounting"] },
        { title: "Report a security issue", paragraphs: ["If you discover a vulnerability or unexpected behavior, send a description and reproduction steps to hello@falaqai.com. Avoid sensitive data in the first message; we will arrange an appropriate channel if needed."] },
      ],
    },
  },
  {
    slug: "responsible-ai",
    ar: {
      title: "معايير الذكاء الاصطناعي المسؤول | فلق",
      description: "مبادئ فلق للشفافية والدقة والصلاحيات والمراجعة البشرية عند تصميم وتشغيل وكلاء الذكاء الاصطناعي.",
      eyebrow: "الذكاء الاصطناعي المسؤول",
      h1: "الوكيل ينفذ ضمن قواعد واضحة، والإنسان يبقى صاحب القرار الحساس",
      intro: "نستخدم الذكاء الاصطناعي لتنفيذ عمل محدد يمكن شرحه ومراجعته. لا نفترض أن النموذج صحيح دائمًا، ولا نمنحه قرارًا ماليًا أو قانونيًا أو حساسًا دون ضوابط وموافقة مناسبة.",
      sections: [
        { title: "الشفافية", paragraphs: ["يجب أن يعرف العميل متى يتعامل مع نظام آلي عندما يكون ذلك مناسبًا للسياق، وأن يكون نطاق قدرات الوكيل وحدوده واضحًا لصاحب العمل."], bullets: ["تعريف واضح بدور الوكيل", "شرح البيانات التي يستخدمها لتنفيذ المهمة", "إظهار متى انتقلت الحالة إلى موظف", "عدم تقديم المحتوى الآلي على أنه قرار بشري"] },
        { title: "الدقة وعدم الاختلاق", paragraphs: ["نربط الإجابات والإجراءات بمصادر معتمدة وقواعد تحقق كلما أمكن. إذا لم تتوفر معلومات كافية أو ظهرت بيانات متعارضة، يتوقف الوكيل أو يطلب توضيحًا أو يحول الحالة للمراجعة."], bullets: ["قاعدة معرفة معتمدة", "تحقق من الحقول قبل التنفيذ", "درجات ثقة عند استخراج البيانات", "منع التخمين في الحالات الحساسة"] },
        { title: "حدود القرار", paragraphs: ["تُصنف القرارات قبل الإطلاق إلى ما يمكن تنفيذه تلقائيًا، وما يحتاج تأكيد المستخدم، وما يتطلب موافقة موظف مخول."], bullets: ["لا خصومات أو تعديلات مالية دون صلاحية", "لا قرارات قانونية أو طبية مستقلة", "لا كشف لبيانات شخصية قبل التحقق", "تصعيد الغضب والنزاع والحالات غير المعتادة"] },
        { title: "الاختبار والمراجعة", paragraphs: ["نختبر السيناريوهات المعتادة والاستثنائية قبل الإطلاق، ثم نراجع عينات من الأداء والتنبيهات بعده. تتغير الاختبارات بحسب أثر الخطأ المحتمل وحساسية العملية."], bullets: ["اختبارات قبول مرتبطة بقواعد العمل", "اختبار المدخلات الناقصة والمتعارضة", "مراجعة حالات التسليم البشري", "تحديث القواعد عند تغير السياسة أو البيانات"] },
      ],
    },
    en: {
      title: "Responsible AI Standards | Falaq Intelligence",
      description: "Falaq principles for transparency, accuracy, permissions, and human review when designing and operating AI agents.",
      eyebrow: "Responsible AI",
      h1: "The agent follows clear rules; people retain sensitive decisions",
      intro: "We use AI to perform defined work that can be explained and reviewed. We do not assume a model is always correct or give it financial, legal, or other sensitive decisions without appropriate controls and approval.",
      sections: [
        { title: "Transparency", paragraphs: ["Customers should know when they are interacting with an automated system where appropriate, and the business owner should understand the agent’s capabilities and limits."], bullets: ["Clear identification of the agent’s role", "Explanation of the data used for the task", "Visible transition when a case moves to an employee", "No presentation of automated content as a human decision"] },
        { title: "Accuracy and grounded responses", paragraphs: ["Answers and actions are connected to approved sources and validation rules whenever possible. When information is insufficient or conflicting, the agent pauses, asks for clarification, or routes the case for review."], bullets: ["Approved knowledge base", "Field validation before execution", "Confidence scores for extracted data", "No guessing in sensitive cases"] },
        { title: "Decision boundaries", paragraphs: ["Before launch, decisions are divided into actions that can run automatically, actions requiring user confirmation, and actions requiring approval from an authorized employee."], bullets: ["No discounts or financial changes without authority", "No independent legal or medical decisions", "No personal data disclosure before verification", "Escalation of anger, disputes, and unusual cases"] },
        { title: "Testing and review", paragraphs: ["We test common and exceptional scenarios before launch, then review performance samples and alerts afterward. Test depth depends on the possible impact of an error and process sensitivity."], bullets: ["Acceptance tests tied to business rules", "Missing and conflicting input tests", "Human handoff review", "Rule updates when policy or data changes"] },
      ],
    },
  },
  {
    slug: "service-standards",
    ar: {
      title: "معايير تنفيذ خدمات الذكاء الاصطناعي | فلق",
      description: "منهج فلق لتحديد نطاق وبناء واختبار وإطلاق ومراقبة حلول أتمتة العمليات ووكلاء الذكاء الاصطناعي.",
      eyebrow: "معايير الخدمة",
      h1: "من عملية غير واضحة إلى نظام قابل للقياس والمراجعة",
      intro: "تحدد هذه الصفحة المراحل التي نتبعها عادةً عند تنفيذ خدمة. تفاصيل النطاق والمدة والتسليمات النهائية تُثبت في العرض أو العقد الخاص بكل مشروع.",
      sections: [
        { title: "1. اكتشاف العملية", paragraphs: ["نوثق كيف تعمل العملية اليوم، الأنظمة والقنوات المستخدمة، نقاط التعطل، أصحاب الصلاحية، والاستثناءات التي لا يمكن تجاهلها."], bullets: ["خريطة الوضع الحالي", "مصادر البيانات والتكاملات", "خط الأساس ومؤشرات النجاح", "المخاطر والقرارات الحساسة"] },
        { title: "2. تصميم النطاق والضوابط", paragraphs: ["نحدد بداية العملية ونهايتها، ما ينفذه الوكيل، ما يحتاج تأكيدًا، وما يبقى مع الموظف. كما نحدد حالات الفشل وطريقة الإيقاف والتصعيد."], bullets: ["نطاق واضح وغير مفتوح", "مصفوفة الصلاحيات", "قواعد التسليم البشري", "معايير القبول"] },
        { title: "3. البناء والاختبار", paragraphs: ["نبني التكاملات والتعليمات وقواعد العمل، ثم نختبر البيانات المعتادة والناقصة والمتعارضة. لا يُنقل الحل إلى الاستخدام الفعلي قبل اجتياز سيناريوهات القبول المتفق عليها."], bullets: ["بيئة اختبار مناسبة للنطاق", "اختبار السيناريوهات الأساسية والاستثنائية", "مراجعة اللغة والرسائل", "توثيق القيود المعروفة"] },
        { title: "4. الإطلاق والمراقبة", paragraphs: ["يبدأ الإطلاق تدريجيًا عندما تسمح العملية بذلك، مع متابعة الأخطاء وجودة النتائج ونسب التسليم البشري. تُعالج الملاحظات حسب أثرها على العملية."], bullets: ["إطلاق محدود أو مرحلي", "لوحة أو تقارير حسب الاتفاق", "مراجعة ما بعد الإطلاق", "خطة تحسين أو توسع"] },
        { title: "مسؤوليات العميل", paragraphs: ["تعتمد جودة التنفيذ على توفير معلومات صحيحة، أصحاب قرار متاحين، صلاحيات تكامل مناسبة، وسياسات معتمدة يمكن تحويلها إلى قواعد."], bullets: ["توفير الوصول والبيانات المصرح بها", "اعتماد السياسات والرسائل", "تعيين مسؤول عن القرار والتصعيد", "إبلاغ فلق بتغير الأنظمة أو القواعد"] },
      ],
    },
    en: {
      title: "AI Service Delivery Standards | Falaq Intelligence",
      description: "Falaq methodology for scoping, building, testing, launching, and monitoring AI agents and business process automation.",
      eyebrow: "Service standards",
      h1: "From an unclear process to a measurable, reviewable system",
      intro: "This page describes the stages we typically follow when delivering a service. Final scope, timeline, and deliverables are defined in the proposal or agreement for each project.",
      sections: [
        { title: "1. Process discovery", paragraphs: ["We document how the process works today, the systems and channels involved, failure points, authority owners, and exceptions that cannot be ignored."], bullets: ["Current-state map", "Data sources and integrations", "Baseline and success measures", "Risks and sensitive decisions"] },
        { title: "2. Scope and control design", paragraphs: ["We define where the process starts and ends, what the agent executes, what requires confirmation, and what remains with an employee. Failure, pause, and escalation paths are also defined."], bullets: ["Clear and bounded scope", "Permission matrix", "Human handoff rules", "Acceptance criteria"] },
        { title: "3. Build and test", paragraphs: ["We build integrations, instructions, and business rules, then test normal, missing, and conflicting data. The solution does not move to real use before passing agreed acceptance scenarios."], bullets: ["Test environment appropriate to scope", "Core and exceptional scenario testing", "Language and message review", "Known limitation documentation"] },
        { title: "4. Launch and monitor", paragraphs: ["Launch starts gradually where the process allows, with monitoring of failures, result quality, and human handoff rates. Findings are prioritized according to operational impact."], bullets: ["Limited or phased launch", "Dashboard or reporting as agreed", "Post-launch review", "Improvement or expansion plan"] },
        { title: "Client responsibilities", paragraphs: ["Delivery quality depends on accurate information, available decision owners, suitable integration permissions, and approved policies that can be converted into rules."], bullets: ["Provide authorized access and data", "Approve policies and messages", "Assign decision and escalation owners", "Inform Falaq when systems or rules change"] },
      ],
    },
  },
  {
    slug: "sla",
    ar: {
      title: "إطار مستوى الخدمة والدعم | فلق",
      description: "الإطار العام لأولوية الحوادث وأهداف الاستجابة والصيانة والتوافر في خدمات فلق المُدارة.",
      eyebrow: "مستوى الخدمة",
      h1: "إطار واضح للاستجابة والدعم دون وعود عامة خارج نطاق العقد",
      intro: "هذه الصفحة تعرض الإطار الافتراضي لخدمات فلق المُدارة، وليست اتفاقية مستقلة أو ضمانًا عامًا. اتفاقية العميل الموقعة وخطة الخدمة تحددان التوافر وساعات الدعم وأهداف الاستجابة الملزمة.",
      sections: [
        { title: "نطاق الدعم", paragraphs: ["يشمل الدعم المكونات التي تبنيها أو تديرها فلق ضمن النطاق المتفق عليه. لا يشمل تلقائيًا أعطال أنظمة العميل أو مزودي الاتصالات والنماذج والخدمات الخارجية، لكننا نساعد في التشخيص والتنسيق عندما يؤثر العطل على الحل."], bullets: ["أخطاء الوكيل وقواعد العمل", "التكاملات التي تديرها فلق", "المراقبة والتنبيهات المتفق عليها", "طلبات التغيير عبر مسار منفصل عن الحوادث"] },
        { title: "تصنيف الأولوية", paragraphs: ["تُحدد الأولوية حسب أثر المشكلة، لا حسب ترتيب وصول الرسالة."], cards: [{ title: "P1 — حرج", text: "توقف كامل لعملية إنتاج أساسية أو خطر نشط على البيانات دون بديل عملي." }, { title: "P2 — مرتفع", text: "تعطل وظيفة مهمة مع وجود بديل مؤقت أو تأثر مجموعة كبيرة من الحالات." }, { title: "P3 — متوسط", text: "خلل محدود لا يوقف العملية الأساسية أو مشكلة تؤثر على عدد قليل من الحالات." }, { title: "P4 — طلب", text: "استفسار أو تحسين أو تغيير غير ناتج عن عطل في الخدمة الحالية." }] },
        { title: "أهداف الاستجابة الافتراضية", paragraphs: ["ما لم ينص العقد على غير ذلك، نستخدم الأهداف التالية للخدمات المُدارة خلال ساعات الدعم: P1 خلال ساعتين، P2 خلال يوم عمل، P3 خلال يومي عمل، وP4 حسب جدول التغيير. زمن الاستجابة يعني بدء التقييم والتواصل، وليس ضمان الحل ضمن المدة نفسها."], bullets: ["تحديثات دورية للحوادث الحرجة حسب الاتفاق", "تحديد حل مؤقت عندما يكون ممكنًا", "تحليل سبب جذري للحوادث المهمة عند شموله", "لا تشمل الأهداف التأخير الناتج عن انتظار وصول أو قرار من العميل"] },
        { title: "التوافر والصيانة", paragraphs: ["لا يوجد هدف توافر واحد لكل الحلول؛ فالوكيل قد يعتمد على عدة مزودين وأنظمة يملكها العميل. يُحدد هدف التوافر وفترة القياس والاستثناءات في اتفاقية الخدمة الخاصة بالمشروع."], bullets: ["إشعار بالصيانة المخططة عندما تؤثر على الاستخدام", "استثناء القوة القاهرة ومزودي الطرف الثالث وفق العقد", "قياس التوافر للمكونات المشمولة فقط", "خطط الاستمرارية والنسخ الاحتياطي حسب النطاق"] },
        { title: "الإبلاغ عن حادث", paragraphs: ["أرسل وصف الأثر والوقت التقريبي والخطوات أو الأمثلة المتاحة إلى قناة الدعم المحددة في عقدك. للاستفسارات العامة استخدم hello@falaqai.com. لا ترسل كلمات مرور أو أسرار وصول داخل البريد."] },
      ],
    },
    en: {
      title: "Service Level and Support Framework | Falaq",
      description: "The general framework for incident priority, response targets, maintenance, and availability in Falaq managed services.",
      eyebrow: "Service levels",
      h1: "Clear response and support standards without promises outside the contract",
      intro: "This page presents the default framework for Falaq managed services. It is not a standalone agreement or universal guarantee. The signed client agreement and service plan define binding availability, support hours, and response targets.",
      sections: [
        { title: "Support scope", paragraphs: ["Support covers components built or managed by Falaq within the agreed scope. Failures in client systems or external communication, model, and service providers are not automatically covered, but we assist with diagnosis and coordination when they affect the solution."], bullets: ["Agent and business-rule defects", "Integrations managed by Falaq", "Agreed monitoring and alerts", "Change requests handled separately from incidents"] },
        { title: "Priority classification", paragraphs: ["Priority is based on operational impact, not message order."], cards: [{ title: "P1 — Critical", text: "A complete outage of a core production process or an active data risk with no practical workaround." }, { title: "P2 — High", text: "A major function is unavailable with a temporary workaround, or a large group of cases is affected." }, { title: "P3 — Medium", text: "A limited defect that does not stop the core process or affects a small number of cases." }, { title: "P4 — Request", text: "A question, enhancement, or change not caused by a defect in the current service." }] },
        { title: "Default response targets", paragraphs: ["Unless the agreement states otherwise, managed services use these targets during support hours: P1 within two hours, P2 within one business day, P3 within two business days, and P4 according to change planning. Response time means assessment and communication have started; it is not a guarantee of resolution in the same period."], bullets: ["Periodic critical-incident updates as agreed", "A workaround identified when practical", "Root-cause analysis for significant incidents when included", "Targets exclude delays while waiting for client access or decisions"] },
        { title: "Availability and maintenance", paragraphs: ["There is no single availability target for every solution because an agent may depend on several providers and client-owned systems. The project service agreement defines the target, measurement window, and exclusions."], bullets: ["Notice of planned maintenance that affects use", "Force majeure and third-party exclusions according to contract", "Availability measured only for covered components", "Continuity and backup plans according to scope"] },
        { title: "Report an incident", paragraphs: ["Send the impact, approximate start time, and available examples or steps through the support channel named in your agreement. For general inquiries, use hello@falaqai.com. Never send passwords or access secrets by email."] },
      ],
    },
  },
  {
    slug: "privacy",
    ar: {
      title: "سياسة الخصوصية | فلق للذكاء الاصطناعي",
      description: "توضح سياسة خصوصية فلق البيانات التي نجمعها وكيف نستخدمها ونشاركها ونحتفظ بها وحقوق أصحاب البيانات.",
      eyebrow: "الخصوصية",
      h1: "سياسة الخصوصية",
      intro: "توضح هذه السياسة كيفية تعامل فلق مع البيانات عند زيارة الموقع أو إرسال نموذج أو استخدام مستشار فلق أو التواصل معنا. قد تتضمن عقود العملاء شروطًا إضافية لمعالجة بيانات الحلول المُدارة.",
      sections: [
        { title: "البيانات التي نجمعها", paragraphs: ["نجمع البيانات التي ترسلها طوعًا، مثل الاسم واسم الشركة والبريد ورقم واتساب ووصف العملية أو الطلب. قد تُجمع أيضًا معلومات تقنية أساسية لازمة لتشغيل الموقع وحمايته، مثل عنوان IP ونوع المتصفح وسجلات الأخطاء."], bullets: ["بيانات التواصل", "محتوى النماذج والمحادثات", "تفاصيل الطلب أو العملية التجارية", "سجلات تقنية وتشغيلية أساسية"] },
        { title: "كيف نستخدم البيانات", paragraphs: ["نستخدم البيانات للرد على الاستفسار، إعداد تصور أو عرض، تقديم الخدمة، تشغيل التكاملات، تحسين الجودة، حماية الأنظمة، والوفاء بالالتزامات القانونية أو التعاقدية."], bullets: ["التواصل وتنفيذ الطلب", "إنشاء وإرسال ملفات العروض", "تشغيل الخدمة ودعمها", "منع الإساءة والتحقيق في الأعطال"] },
        { title: "المشاركة والمزودون", paragraphs: ["لا نبيع بياناتك. قد نعالجها عبر مزودي استضافة ونماذج ذكاء اصطناعي وبريد وتخزين وتكاملات بالقدر اللازم لتقديم الوظيفة المطلوبة. قد تُشارك البيانات أيضًا عندما يطلب القانون ذلك أو لحماية الحقوق والأمان."], bullets: ["GitHub Pages لاستضافة الواجهة", "Render لاستضافة خدمات التطبيق", "مزودو نماذج الذكاء الاصطناعي المعتمدون", "Resend للبريد وGoogle Sheets عند استخدامهما"] },
        { title: "الاحتفاظ والأمان", paragraphs: ["نحتفظ بالبيانات للمدة اللازمة للغرض الذي جُمعت من أجله، أو حسب العقد والمتطلبات النظامية. نستخدم ضوابط وصول واتصالات مشفرة أثناء النقل، لكن لا توجد وسيلة إلكترونية خالية تمامًا من المخاطر."], bullets: ["تحديد الاحتفاظ حسب الغرض والنطاق", "تقييد الوصول على من يحتاجه", "حذف أو إخفاء البيانات عند انتهاء الحاجة حيثما ينطبق", "مراجعة الحوادث والإجراءات التصحيحية"] },
        { title: "حقوقك وخياراتك", paragraphs: ["يمكنك طلب معرفة بياناتك أو تصحيحها أو حذفها أو الاعتراض على بعض أوجه استخدامها، مع مراعاة الالتزامات القانونية والتعاقدية. أرسل الطلب إلى hello@falaqai.com، وقد نحتاج للتحقق من الهوية قبل تنفيذه."], bullets: ["الوصول والتصحيح", "الحذف عند انطباقه", "سحب الموافقة للاتصالات الاختيارية", "الاستفسار عن مزودي المعالجة"] },
        { title: "التغييرات والتواصل", paragraphs: ["قد نحدث هذه السياسة عند تغير الموقع أو الخدمات أو المتطلبات. يظهر تاريخ آخر تحديث أعلى الصفحة. للأسئلة أو الطلبات المتعلقة بالخصوصية تواصل عبر hello@falaqai.com."] },
      ],
    },
    en: {
      title: "Privacy Policy | Falaq Intelligence",
      description: "Falaq privacy policy explains what data we collect and how we use, share, retain, and protect it, and your available rights.",
      eyebrow: "Privacy",
      h1: "Privacy policy",
      intro: "This policy explains how Falaq handles data when you visit the website, submit a form, use the Falaq Advisor, or contact us. Client agreements may contain additional terms for data processed by managed solutions.",
      sections: [
        { title: "Data we collect", paragraphs: ["We collect information you submit voluntarily, such as your name, company, email, WhatsApp number, and process or request description. Basic technical information needed to operate and protect the site may also be collected, such as IP address, browser type, and error logs."], bullets: ["Contact details", "Form and conversation content", "Request or business-process details", "Basic technical and operational logs"] },
        { title: "How we use data", paragraphs: ["We use data to answer inquiries, prepare a concept or proposal, provide services, operate integrations, improve quality, protect systems, and meet legal or contractual obligations."], bullets: ["Communication and request fulfillment", "Proposal file creation and delivery", "Service operation and support", "Abuse prevention and incident investigation"] },
        { title: "Sharing and providers", paragraphs: ["We do not sell your data. It may be processed by hosting, AI model, email, storage, and integration providers to the extent needed for the requested function. Data may also be disclosed when required by law or to protect rights and security."], bullets: ["GitHub Pages for frontend hosting", "Render for application services", "Approved AI model providers", "Resend for email and Google Sheets when used"] },
        { title: "Retention and security", paragraphs: ["We retain data for as long as needed for the purpose for which it was collected, or according to contract and legal requirements. We use access controls and encrypted connections in transit, but no electronic method is completely risk-free."], bullets: ["Retention based on purpose and scope", "Access restricted to those who need it", "Deletion or de-identification when no longer needed where applicable", "Incident and corrective-action review"] },
        { title: "Your rights and choices", paragraphs: ["You may request access, correction, deletion, or object to certain uses, subject to legal and contractual obligations. Send requests to hello@falaqai.com. Identity verification may be required before fulfilling a request."], bullets: ["Access and correction", "Deletion where applicable", "Withdrawal of consent for optional communications", "Questions about processing providers"] },
        { title: "Changes and contact", paragraphs: ["We may update this policy when the site, services, or requirements change. The latest update date appears above. For privacy questions or requests, email hello@falaqai.com."] },
      ],
    },
  },
  {
    slug: "terms",
    ar: {
      title: "الشروط والأحكام | فلق للذكاء الاصطناعي",
      description: "شروط استخدام موقع فلق ومحتواه ومستشار الذكاء الاصطناعي والعلاقة بين هذه الشروط واتفاقيات الخدمات.",
      eyebrow: "الشروط القانونية",
      h1: "الشروط والأحكام",
      intro: "تنظم هذه الشروط استخدام موقع falaqai.com والأدوات العامة المتاحة عليه. استخدام خدمات مدفوعة أو حلول مخصصة يخضع أيضًا للعرض أو العقد الموقع، ويكون الاتفاق الموقع هو المرجع عند التعارض.",
      sections: [
        { title: "استخدام الموقع", paragraphs: ["يمكنك استخدام الموقع للتعرف على خدمات فلق والتواصل وطلب تصور أولي. يجب ألا تستخدمه لإرسال محتوى غير قانوني أو ضار، أو محاولة تجاوز الحماية، أو اختبار الأنظمة دون إذن."], bullets: ["تقديم معلومات صحيحة عند إرسال الطلب", "عدم انتحال هوية شخص أو جهة", "عدم رفع أسرار أو بيانات لا تملك حق مشاركتها", "عدم تعطيل الموقع أو إساءة استخدام النماذج والواجهات"] },
        { title: "مخرجات الذكاء الاصطناعي", paragraphs: ["المحادثات والتصورات وملفات PDF الناتجة عن مستشار فلق معلومات أولية لتسهيل النقاش، وليست عرضًا تعاقديًا نهائيًا أو استشارة قانونية أو مالية أو تقنية مستقلة. يجب مراجعة التفاصيل واعتمادها قبل اتخاذ قرار أو تنفيذ."], bullets: ["قد تحتاج المخرجات إلى تصحيح أو استكمال", "لا ترفع بيانات حساسة غير لازمة", "السعر والنطاق والمدة لا تثبت إلا في اتفاق مكتوب", "القرارات الحساسة تبقى مسؤولية صاحب القرار"] },
        { title: "الملكية الفكرية", paragraphs: ["يظل تصميم الموقع وعلامة فلق والنصوص والمواد الأصلية مملوكة لفلق أو مرخصة لها. لا يجوز نسخها أو إعادة بيعها أو استخدامها لبناء خدمة منافسة دون إذن. ملكية مخرجات المشاريع المخصصة تُحدد في عقد المشروع."], bullets: ["يمكن مشاركة روابط الموقع ومقتطفات مع الإسناد", "لا يجوز إزالة العلامات أو إشعارات الحقوق", "مواد العميل تبقى للعميل أو أصحابها", "ترخيص البرمجيات الخارجية يخضع لشروط أصحابها"] },
        { title: "الخدمات والمدفوعات", paragraphs: ["لا يشكل وصف الخدمة في الموقع التزامًا بتقديم نطاق موحد لكل عميل. يحدد العرض الموقع النطاق والتسليمات والرسوم والدفع والإلغاء والدعم. قد تتطلب التغييرات خارج النطاق تقديرًا وموافقة منفصلين."], bullets: ["بدء العمل بعد الموافقات المطلوبة", "التزام العميل بتوفير الوصول والمعلومات", "التغييرات تُدار كتابيًا", "رسوم الأطراف الثالثة حسب الاتفاق"] },
        { title: "حدود المسؤولية", paragraphs: ["نبذل عناية مهنية معقولة، لكن الموقع مقدم كما هو وقد يعتمد على خدمات خارجية. إلى الحد الذي يسمح به القانون، لا نتحمل خسائر غير مباشرة ناتجة عن الاعتماد على محتوى الموقع العام أو مخرجات غير معتمدة. تحدد عقود الخدمات المسؤوليات والحدود الخاصة بالمشروع."], bullets: ["لا ضمان لاستمرار الموقع دون انقطاع دائم", "لا ضمان لترتيب محدد في محركات البحث", "لا مسؤولية عن تغييرات أو أعطال مزود مستقل خارج السيطرة", "لا شيء في هذه الشروط يلغي حقًا لا يمكن إلغاؤه قانونًا"] },
        { title: "التغييرات والتواصل", paragraphs: ["قد نحدث الشروط عند تغير الخدمات. استمرار استخدام الموقع بعد نشر التحديث يعني قبول الشروط المحدثة. للاستفسارات أرسل إلى hello@falaqai.com. تخضع النزاعات المتعلقة بخدمة مدفوعة لآلية وعنوان القانون المحددين في العقد الموقع."] },
      ],
    },
    en: {
      title: "Terms of Use | Falaq Intelligence",
      description: "Terms governing use of the Falaq website, content, AI advisor, and the relationship between these terms and service agreements.",
      eyebrow: "Legal terms",
      h1: "Terms of use",
      intro: "These terms govern use of falaqai.com and its public tools. Paid services and custom solutions are also governed by a signed proposal or agreement, which controls if there is a conflict.",
      sections: [
        { title: "Website use", paragraphs: ["You may use the site to learn about Falaq services, contact us, and request an initial concept. You must not submit unlawful or harmful content, bypass security, or test systems without authorization."], bullets: ["Provide accurate information when submitting a request", "Do not impersonate a person or organization", "Do not upload secrets or data you have no right to share", "Do not disrupt the site or abuse forms and interfaces"] },
        { title: "AI-generated output", paragraphs: ["Conversations, concepts, and PDF files produced by the Falaq Advisor are preliminary information to support discussion. They are not a final contractual offer or independent legal, financial, or technical advice. Details must be reviewed and approved before decisions or implementation."], bullets: ["Output may require correction or completion", "Do not submit unnecessary sensitive data", "Price, scope, and timing are fixed only in writing", "Sensitive decisions remain with the authorized decision maker"] },
        { title: "Intellectual property", paragraphs: ["The site design, Falaq brand, text, and original materials are owned by or licensed to Falaq. They may not be copied, resold, or used to build a competing service without permission. Ownership of custom project deliverables is defined in the project agreement."], bullets: ["Site links and attributed excerpts may be shared", "Rights notices and branding may not be removed", "Client materials remain with the client or their owners", "Third-party software follows its own licenses"] },
        { title: "Services and payments", paragraphs: ["A website service description is not a commitment to one standard scope for every client. The signed proposal defines scope, deliverables, fees, payment, cancellation, and support. Out-of-scope changes may require separate estimation and approval."], bullets: ["Work starts after required approvals", "The client provides necessary access and information", "Changes are managed in writing", "Third-party fees follow the agreement"] },
        { title: "Limitation of liability", paragraphs: ["We apply reasonable professional care, but the public site is provided as available and may rely on external services. To the extent permitted by law, we are not responsible for indirect losses caused by reliance on general site content or unapproved output. Service agreements define project-specific responsibilities and limits."], bullets: ["No guarantee of permanently uninterrupted website access", "No guarantee of a specific search-engine ranking", "No responsibility for an independent provider change or failure outside our control", "Nothing excludes rights that cannot legally be excluded"] },
        { title: "Changes and contact", paragraphs: ["We may update these terms when services change. Continued site use after publication means acceptance of the updated terms. Questions can be sent to hello@falaqai.com. Paid-service disputes follow the mechanism and governing law stated in the signed agreement."] },
      ],
    },
  },
];

function esc(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function route(slug, language) {
  return language === "ar" ? `/${slug}/` : `/en/${slug}/`;
}

function schema(page, language) {
  const content = page[language];
  const current = `${site}${route(page.slug, language)}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": `${current}#webpage`, url: current, name: content.title, description: content.description, inLanguage: language, isPartOf: { "@id": `${site}/#website` }, about: { "@id": `${site}/#organization` }, dateModified: updated },
      { "@type": "BreadcrumbList", "@id": `${current}#breadcrumb`, itemListElement: [
        { "@type": "ListItem", position: 1, name: labels[language].home, item: `${site}${language === "ar" ? "/" : "/en/"}` },
        { "@type": "ListItem", position: 2, name: content.h1, item: current },
      ] },
    ],
  };
}

function renderSection(section, index) {
  const paragraphs = (section.paragraphs || []).map((item) => `<p>${esc(item)}</p>`).join("");
  const bullets = section.bullets?.length ? `<ul>${section.bullets.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>` : "";
  const cards = section.cards?.length ? `<div class="cards">${section.cards.map((item) => `<div class="info-card"><strong>${esc(item.title)}</strong><span>${esc(item.text)}</span></div>`).join("")}</div>` : "";
  return `<section class="content-section" id="section-${index + 1}"><span class="section-num">${String(index + 1).padStart(2, "0")}</span><h2>${esc(section.title)}</h2>${paragraphs}${bullets}${cards}</section>`;
}

function socialLinks() {
  return `<div class="social-links" aria-label="Social media"><a class="social-link" href="https://www.instagram.com/falaqai/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none"/></svg></a><a class="social-link" href="https://www.facebook.com/profile.php?id=61592175171348" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.7 22v-9h3l.5-3.5h-3.5V7.3c0-1 .3-1.7 1.8-1.7h1.9V2.5c-.3 0-1.5-.1-2.8-.1-2.8 0-4.7 1.7-4.7 4.8v2.3H6.8V13h3.1v9h3.8Z"/></svg></a><a class="social-link" href="https://www.linkedin.com/company/135187245/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.5 8.1H3.2V21h3.3V8.1ZM4.8 3A1.9 1.9 0 1 0 4.8 6.8 1.9 1.9 0 0 0 4.8 3ZM21 13.6c0-3.9-2.1-5.8-4.9-5.8-2.3 0-3.3 1.2-3.9 2.1V8.1H9V21h3.3v-6.4c0-1.7.3-3.4 2.5-3.4 2.2 0 2.2 2 2.2 3.5V21h3.3l.7-7.4Z"/></svg></a></div>`;
}

function pageHtml(page, language) {
  const content = page[language];
  const l = labels[language];
  const currentPath = route(page.slug, language);
  const alternateLanguage = language === "ar" ? "en" : "ar";
  const alternatePath = route(page.slug, alternateLanguage);
  const related = pages.filter((item) => item.slug !== page.slug).slice(0, 6);
  const navCurrent = page.slug === "about" ? "about" : "trust";
  return `<!doctype html>
<html lang="${language}" dir="${l.dir}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${esc(content.title)}</title>
  <meta name="description" content="${esc(content.description)}">
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1">
  <link rel="canonical" href="${site}${currentPath}">
  <link rel="alternate" hreflang="ar" href="${site}${route(page.slug, "ar")}">
  <link rel="alternate" hreflang="en" href="${site}${route(page.slug, "en")}">
  <link rel="alternate" hreflang="x-default" href="${site}${route(page.slug, "ar")}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Falaq Intelligence">
  <meta property="og:title" content="${esc(content.title)}">
  <meta property="og:description" content="${esc(content.description)}">
  <meta property="og:url" content="${site}${currentPath}">
  <meta property="og:image" content="${site}/assets/falaq-social-card.jpg">
  <meta property="og:locale" content="${language === "ar" ? "ar_JO" : "en_US"}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(content.title)}">
  <meta name="twitter:description" content="${esc(content.description)}">
  <meta name="twitter:image" content="${site}/assets/falaq-social-card.jpg">
  <link rel="icon" href="/assets/falaq-symbol.png" type="image/png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/company-pages.css">
  <script type="application/ld+json">${JSON.stringify(schema(page, language))}</script>
</head>
<body>
  <a class="skip-link" href="#main">${language === "ar" ? "تجاوز إلى المحتوى" : "Skip to content"}</a>
  <nav class="site-nav" aria-label="${language === "ar" ? "التنقل الرئيسي" : "Main navigation"}">
    <div class="wrap nav-inner">
      <a class="brand" href="${language === "ar" ? "/" : "/en/"}" aria-label="Falaq Intelligence"><span class="brand-mark"><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 3.5c1.9 10 6.7 14.8 16.5 16.7C30.7 22.1 25.9 26.9 24 37 22.1 26.9 17.3 22.1 7.5 20.2 17.3 18.3 22.1 13.5 24 3.5Z" fill="#c084fc"/><path d="M10 40.5a17 17 0 0 0 28 0" fill="none" stroke="#c084fc" stroke-width="3" stroke-linecap="round"/></svg></span><span>${language === "ar" ? "فلق للذكاء الاصطناعي" : "Falaq Intelligence"}</span></a>
      <div class="nav-links"><a href="${language === "ar" ? "/" : "/en/"}">${l.home}</a><a href="${language === "ar" ? "/services/" : "/en/services/"}">${l.services}</a><a href="${route("trust", language)}"${navCurrent === "trust" ? ' aria-current="page"' : ""}>${l.trust}</a><a href="${route("about", language)}"${navCurrent === "about" ? ' aria-current="page"' : ""}>${l.about}</a></div>
      <div class="nav-actions"><a class="nav-button" href="${alternatePath}" hreflang="${alternateLanguage}" lang="${alternateLanguage}">${l.language}</a><a class="nav-button primary" href="${language === "ar" ? "/#contact" : "/en/#contact"}">${l.contact}</a></div>
    </div>
  </nav>
  <main id="main">
    <header class="hero"><div class="wrap hero-content"><div class="breadcrumb"><a href="${language === "ar" ? "/" : "/en/"}">${l.home}</a> / ${esc(content.h1)}</div><span class="eyebrow">${esc(content.eyebrow)}</span><h1>${esc(content.h1)}</h1><p class="hero-lead">${esc(content.intro)}</p><span class="updated">${l.updated}</span></div></header>
    <div class="wrap page-grid">
      <aside class="toc" aria-label="${l.contents}"><strong>${l.contents}</strong>${content.sections.map((section, index) => `<a href="#section-${index + 1}">${esc(section.title)}</a>`).join("")}</aside>
      <article class="article">${content.sections.map(renderSection).join("")}</article>
    </div>
    <section class="related"><div class="wrap"><h2>${l.related}</h2><div class="related-grid">${related.map((item) => `<a class="related-card" href="${route(item.slug, language)}"><b>${esc(item[language].eyebrow)}</b><span>${esc(item[language].description)}</span></a>`).join("")}</div></div></section>
  </main>
  <footer class="site-footer"><div class="wrap"><div class="footer-grid"><div><a class="brand" href="${language === "ar" ? "/" : "/en/"}">Falaq Intelligence</a><p class="footer-copy">${l.footer}</p>${socialLinks()}</div><div class="footer-col"><strong>${l.company}</strong><a href="${route("about", language)}">${pages.find((item) => item.slug === "about")[language].eyebrow}</a><a href="${route("trust", language)}">${pages.find((item) => item.slug === "trust")[language].eyebrow}</a><a href="${route("responsible-ai", language)}">${pages.find((item) => item.slug === "responsible-ai")[language].eyebrow}</a><a href="${route("service-standards", language)}">${pages.find((item) => item.slug === "service-standards")[language].eyebrow}</a><a href="${route("sla", language)}">${pages.find((item) => item.slug === "sla")[language].eyebrow}</a></div><div class="footer-col"><strong>${l.legal}</strong><a href="${route("privacy", language)}">${pages.find((item) => item.slug === "privacy")[language].eyebrow}</a><a href="${route("terms", language)}">${pages.find((item) => item.slug === "terms")[language].eyebrow}</a><a href="mailto:hello@falaqai.com">hello@falaqai.com</a></div></div><div class="copyright">© 2026 ${l.rights}</div></div></footer>
</body>
</html>`;
}

pages.forEach((page) => {
  ["ar", "en"].forEach((language) => {
    const output = path.join(root, language === "ar" ? page.slug : `en/${page.slug}`, "index.html");
    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.writeFileSync(output, `${pageHtml(page, language)}\n`);
  });
});

console.log(`Built ${pages.length * 2} bilingual company and standards pages.`);

module.exports = { pages, route };
