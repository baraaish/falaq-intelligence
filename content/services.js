// Single source of truth for the service catalogue.
// Content is taken from "FALAQ AI Company Profile final.docx" — edit here, not
// in the generated pages under services/ and en/services/.

const CATEGORIES = [
  {
    key: "revenue",
    ar: { title: "الإيرادات وعمليات العملاء", lead: "الوكلاء الذين يعملون على الطلب الوارد من لحظة وصوله حتى تسجيل نتيجته." },
    en: { title: "Revenue & Customer Operations", lead: "Agents that work inbound demand from the moment it arrives until an outcome is recorded." }
  },
  {
    key: "documents",
    ar: { title: "المستندات والبيانات والأنظمة", lead: "الوكلاء الذين يقرأون ويتحققون ويكتبون داخل الأنظمة التي تديرها الشركة اليوم." },
    en: { title: "Documents, Data & Systems", lead: "Agents that read, validate and write inside the systems a business already runs." }
  },
  {
    key: "integration",
    ar: { title: "خدمات التكامل", lead: "ربط الوكيل بالمنصات التي تحمل بياناتك الحية: المتجر، الحجوزات، نقاط البيع، الموقع." },
    en: { title: "Integration Services", lead: "Connecting the agent to the platforms holding your live data: store, bookings, point of sale, website." }
  },
  {
    key: "channels",
    ar: { title: "القنوات", lead: "القنوات الرسمية التي يعمل عليها الوكيل، مُعدّة ومُشغّلة بالكامل." },
    en: { title: "Channels", lead: "The official channels the agent operates on, established and run end to end." }
  },
  {
    key: "intelligence",
    ar: { title: "الذكاء والتمكين", lead: "رفع دقة الأنظمة، قياس أثرها، وتدريب فريقك على تشغيلها." },
    en: { title: "Intelligence & Enablement", lead: "Raising system accuracy, measuring its effect, and training your team to operate it." }
  }
];

const SERVICES = [
  // ─── Revenue & Customer Operations ─────────────────────────────────────────
  {
    slug: "lead-qualification",
    number: "01",
    category: "revenue",
    hasSandbox: true,
    ar: {
      name: "تأهيل العملاء المحتملين",
      title: "أهّل كل عميل لحظة وصوله، لا حين يتفرغ له أحد",
      summary: "يجيب على كل استفسار وارد، يجمع ما يحتاجه فريق المبيعات، ويُسند العميل إلى مندوب بالاسم.",
      detail: "يراقب الوكيل القنوات التي تصل عبرها الاستفسارات — واتساب، نموذج الموقع، الدردشة، البريد، ورسائل التواصل الاجتماعي — ويرد خلال ثوانٍ في أي ساعة. يطرح أسئلة المندوب نفسها: ما المطلوب، بأي كمية، خلال أي مدة، ضمن أي ميزانية، ومن صاحب القرار. يقيّم الإجابات وفق معايير تحددها أنت، ينشئ السجل في الـ CRM أو يحدّثه، ويُسند العميل إلى المندوب المناسب مع نص المحادثة كاملًا. والاستفسارات دون الحد لا تُهمل، بل تدخل تسلسل متابعة.",
      operatesAcross: ["واتساب", "الدردشة", "نماذج الموقع", "البريد الإلكتروني", "CRM"],
      included: [
        "تغطية كل قناة تصل عبرها الاستفسارات",
        "نص تأهيل متفق عليه مع فريق المبيعات",
        "قواعد تقييم وحدود تحددها الشركة",
        "سجل في الـ CRM يُنشأ ويُسند ضمن المحادثة نفسها"
      ]
    },
    en: {
      name: "Lead Qualification",
      title: "Qualify every lead as it arrives, not when someone is free",
      summary: "Answers every inbound enquiry, collects what the sales team needs, and assigns the lead to a named salesperson.",
      detail: "The agent monitors the channels on which enquiries arrive — WhatsApp, the website form, web chat, email and social messages — and responds within seconds at any hour. It asks the questions a salesperson would ask: what is required, in what quantity, over what timeframe, at what budget, and who takes the decision. It scores the answers against criteria you define, creates or updates the CRM record, and assigns the lead to the appropriate salesperson with the full transcript attached. Enquiries below the threshold enter a follow-up sequence rather than being discarded.",
      operatesAcross: ["WhatsApp", "Web chat", "Website forms", "Email", "CRM"],
      included: [
        "Coverage of every channel on which enquiries arrive",
        "A qualification script agreed with the sales team",
        "Scoring rules and thresholds defined by the client",
        "CRM record created and assigned within the same conversation"
      ]
    }
  },
  {
    slug: "quote-follow-up",
    number: "02",
    category: "revenue",
    hasSandbox: true,
    ar: {
      name: "متابعة عروض الأسعار",
      title: "لا عرض سعر يُغلق دون نتيجة مسجّلة",
      summary: "يتابع كل عرض سعر صادر ويتواصل مع العميل على فترات محددة حتى تُسجَّل نتيجة.",
      detail: "بعد إصدار عرض السعر يتتبعه الوكيل ويتواصل وفق جدول تحدده الشركة — في اليوم الثاني والخامس والعاشر مثلًا. يجيب على الأسئلة الروتينية حول النطاق والسعر والتسليم من وثيقة العرض نفسها، يسجّل سبب أي تأخير أو اعتراض، ويُنبّه صاحب الحساب حين يبدي العميل استعدادًا للمضي أو يطلب تعديل الشروط. ولا يُترك أي عرض بلا نتيجة موثقة: مكسوب، أو مفقود بسبب مذكور، أو مغلق رسميًا.",
      operatesAcross: ["واتساب", "البريد الإلكتروني", "CRM", "أنظمة العروض والفوترة"],
      included: [
        "جدول متابعة تحدده الشركة",
        "إجابات مستمدة من وثيقة العرض الصادرة",
        "أسباب التأخير والاعتراض مسجّلة على الفرصة",
        "نتيجة موثقة على كل عرض صادر"
      ]
    },
    en: {
      name: "Quote Follow-Up",
      title: "No quotation closes without a recorded outcome",
      summary: "Tracks every quotation issued and contacts the client at defined intervals until a decision is recorded.",
      detail: "Once a quotation is issued, the agent tracks it and makes contact on the schedule you set — for example on the second, fifth and tenth day. It answers routine questions on scope, price and delivery directly from the quotation document, records the reason given for any delay or objection, and notifies the account owner when a client indicates readiness to proceed or requests a change in terms. No quotation is left without a recorded outcome: won, lost with a stated reason, or formally closed.",
      operatesAcross: ["WhatsApp", "Email", "CRM", "Quotation and invoicing systems"],
      included: [
        "A follow-up schedule defined by the client",
        "Answers drawn from the issued quotation document",
        "Delay and objection reasons recorded against the opportunity",
        "A recorded outcome on every quotation issued"
      ]
    }
  },
  {
    slug: "booking-recovery",
    number: "03",
    category: "revenue",
    hasSandbox: true,
    ar: {
      name: "الحجز واستعادة المكالمات",
      title: "لا يُعرض موعد إلا إذا كان متاحًا فعلًا",
      summary: "يحجز ويؤكد المواعيد وفق التوافر الحي، ويعاود الاتصال بعد المكالمة الفائتة أو الموعد غير المحضور.",
      detail: "يقرأ الوكيل التوافر الحقيقي من نظام الحجز أو التقويم، ويعرض الأوقات الشاغرة فقط، يؤكد الموعد، ويرسل التذكيرات قبله. وحين لا يُرد على مكالمة هاتفية يتواصل الوكيل مع المتصل ويعرض إتمام الحجز كتابةً. وحين لا يُحضر موعد يتواصل خلال المدة التي تحددها الشركة ويعرض أوقاتًا بديلة. والإلغاءات تُعاد إلى الجدول ليُعرض الموعد من جديد.",
      operatesAcross: ["واتساب", "الاتصال الهاتفي", "أنظمة الحجز", "تقويم Google و Microsoft"],
      included: [
        "التوافر يُقرأ من نظام الشركة قبل عرض أي وقت",
        "رسائل تأكيد وتذكير مسبق",
        "معاودة اتصال على المكالمات غير المُجابة",
        "تواصل وإعادة حجز بعد الموعد غير المحضور"
      ]
    },
    en: {
      name: "Booking & Call Recovery",
      title: "No time is offered unless it is genuinely free",
      summary: "Takes and confirms appointments against live availability, and re-contacts customers after a missed call or appointment.",
      detail: "The agent reads genuine availability from your booking system or calendar, offers only the times that are free, confirms the appointment, and issues reminders in advance. Where a telephone call goes unanswered, the agent contacts the caller and offers to complete the booking in writing. Where an appointment is not attended, the agent makes contact within the interval you specify and offers alternative times. Cancellations are released back into the schedule so the slot can be offered again.",
      operatesAcross: ["WhatsApp", "Telephony", "Booking systems", "Google and Microsoft calendars"],
      included: [
        "Availability read from the client's own system before any time is offered",
        "Confirmation and advance reminder messages",
        "Callback on unanswered telephone calls",
        "Contact and rebooking after a missed appointment"
      ]
    }
  },
  {
    slug: "customer-service",
    number: "04",
    category: "revenue",
    hasSandbox: true,
    ar: {
      name: "خدمة العملاء",
      title: "يجيب من مصادرك وحدها، ويقول «لا أعرف» حين لا يعرف",
      summary: "يجيب على أسئلة العملاء اعتمادًا على سياسات الشركة وأسعارها وبيانات منتجاتها الموثقة، دون سواها.",
      detail: "تُفهرَس سياسات الشركة وقوائم الأسعار وبيانات المنتجات والأسئلة الشائعة لتصبح المصدر الوحيد للوكيل. يجيب من هذه المادة، وحين لا تتضمن الإجابة يقولها صراحةً بدل أن يقدّر. أما ما يحتاج حكمًا أو صلاحية أو استثناءً — استرداد خارج السياسة، شكوى، سؤال تعاقدي — فيُصعَّد إلى موظف بالاسم مع تاريخ المحادثة وسجل العميل وملخص المطلوب، حتى لا يُطلب من العميل أن يعيد كلامه.",
      operatesAcross: ["واتساب", "الدردشة", "البريد الإلكتروني", "أنظمة الدعم", "CRM"],
      included: [
        "فهرسة وثائق الشركة نفسها",
        "لا إجابة خارج المادة المصدر",
        "قواعد تصعيد محددة حسب نوع السؤال",
        "اللهجة العربية والإنجليزية داخل المحادثة الواحدة"
      ]
    },
    en: {
      name: "Customer Service",
      title: "Answers from your sources alone, and says so when it does not know",
      summary: "Answers customer questions using your own documented policies, prices and product data as its only source.",
      detail: "Your policies, price lists, product data and frequently asked questions are indexed and become the agent's sole source of information. It answers from that material, and where an answer is not contained in it the agent says so rather than estimating. Matters requiring judgement, authority or exception — refunds outside policy, complaints, contractual questions — are escalated to a named individual together with the conversation history, the customer record, and a summary of what has been requested, so the customer is not asked to repeat themselves.",
      operatesAcross: ["WhatsApp", "Web chat", "Email", "Help desk", "CRM"],
      included: [
        "Indexing of the client's own documentation",
        "No answer given beyond the source material",
        "Escalation rules defined by question type",
        "Arabic dialect and English within a single conversation"
      ]
    }
  },
  {
    slug: "accounts-receivable",
    number: "05",
    category: "revenue",
    hasSandbox: true,
    ar: {
      name: "تحصيل المستحقات",
      title: "متابعة منضبطة للتحصيل، ونزاع يُحال لا يُجادَل",
      summary: "يتواصل مع العملاء أصحاب الفواتير المتأخرة وفق تسلسل محدد، ويسجّل كل رد.",
      detail: "يقرأ الوكيل تقرير أعمار الديون من نظام المحاسبة أو الفوترة، ويتواصل مع كل حساب متأخر وفق التسلسل الذي تحدده الشركة، مع تصاعد رسمية الرسالة كلما تقادمت الفاتورة. يرسل روابط الدفع، يجيب على الأسئلة المتعلقة بالفاتورة نفسها، يسجّل أي التزام بالسداد مع تاريخه، ويعود في ذلك التاريخ. أما الفواتير المتنازع عليها والحسابات التي تحتاج قرارًا تجاريًا أو قانونيًا فتُخرَج من التسلسل وتُحال إلى الفريق المالي.",
      operatesAcross: ["واتساب", "البريد الإلكتروني", "أنظمة المحاسبة والفوترة"],
      included: [
        "تسلسل تذكير مبني على عمر الفاتورة",
        "رابط دفع مع كل تواصل",
        "التزامات السداد مسجّلة ومتابَعة في تاريخها",
        "النزاعات تُخرَج من التسلسل وتُحال للمالية"
      ]
    },
    en: {
      name: "Accounts Receivable",
      title: "Disciplined collection follow-up, and disputes referred rather than argued",
      summary: "Contacts customers holding overdue invoices on a defined sequence and records every response.",
      detail: "The agent reads the ageing report from your accounting or billing system and contacts each overdue account according to the sequence you set, with the formality of the message increasing as the invoice ages. It issues payment links, answers questions on the invoice itself, records any commitment to pay together with the date given, and returns on that date. Disputed invoices, and accounts where a commercial or legal decision is required, are removed from the sequence and referred to the finance team.",
      operatesAcross: ["WhatsApp", "Email", "Accounting and billing systems"],
      included: [
        "A reminder sequence structured by invoice age",
        "A payment link issued with each contact",
        "Commitments to pay recorded and followed up on the stated date",
        "Disputes removed from the sequence and referred to finance"
      ]
    }
  },

  // ─── Documents, Data & Systems ─────────────────────────────────────────────
  {
    slug: "document-processing",
    number: "06",
    category: "documents",
    hasSandbox: true,
    ar: {
      name: "معالجة المستندات",
      title: "يقرأ المستند، يتحقق منه، ويرفع ما لا يتطابق للمراجعة",
      summary: "يقرأ المستندات المُرسلة، يستخرج الحقول التي تحددها الشركة، ويطابقها مع السجلات القائمة.",
      detail: "تصل المستندات إلى الشركة كصور ملتقطة بالهاتف، ومسوحات، وملفات PDF، بالعربية والإنجليزية، وغالبًا بجودة رديئة. يقرأها الوكيل، يستخرج الحقول المحددة — رقم الفاتورة، المبلغ، الرقم الضريبي، التواريخ، أرقام الهوية، شروط العقد — ويقارن كل قيمة بالسجل المقابل في نظام الشركة. القيم المتطابقة تُكتب دون تدخل. والقيم غير المتطابقة، أو الخارجة عن النطاق المتوقع، تُحفظ في قائمة استثناءات للمراجعة مع تحديد موضع الاختلاف بدقة.",
      operatesAcross: ["واتساب", "البريد الإلكتروني", "الأقراص المشتركة", "أنظمة ERP والمحاسبة"],
      included: [
        "قراءة ضوئية للنصوص بالعربية والإنجليزية",
        "استخراج الحقول وفق مواصفات الشركة",
        "تحقق مقابل السجل القائم المقابل",
        "قائمة استثناءات تُبيّن الاختلاف المرصود"
      ]
    },
    en: {
      name: "Document Processing",
      title: "Reads the document, validates it, and raises what does not reconcile",
      summary: "Reads submitted documents, extracts the fields you specify, and validates them against existing records.",
      detail: "Documents reach a business as photographs taken on a telephone, as scans and as PDFs, in Arabic and English, and frequently at poor quality. The agent reads them, extracts the fields you specify — invoice number, amount, tax registration, dates, identification numbers, contract terms — and checks each value against the corresponding record in your system. Values that reconcile are written through without intervention. Values that do not reconcile, or that fall outside an expected range, are held in an exception queue for review, with the specific discrepancy identified.",
      operatesAcross: ["WhatsApp", "Email", "Shared drives", "ERP and accounting systems"],
      included: [
        "Arabic and English optical character recognition",
        "Field extraction to the client's specification",
        "Validation against the corresponding existing record",
        "An exception queue that states the discrepancy found"
      ]
    }
  },
  {
    slug: "crm-control",
    number: "07",
    category: "documents",
    hasSandbox: true,
    ar: {
      name: "ضبط الـ CRM",
      title: "سجلّ يُكتب أثناء العمل، لا بعده",
      summary: "يكتب كل تفاعل ونتيجة في الـ CRM لحظة حدوثها، ويطبّق قواعد بيانات الشركة.",
      detail: "بدل الاعتماد على الموظفين لتحديث السجلات لاحقًا، يكتب الوكيل في الـ CRM أثناء وقوع العمل: يسجّل كل محادثة، يُقدّم مرحلة الصفقة عند تحقق شرطها المحدد، يوثّق النتيجة وسببها، ويُرفق النص. يكتشف جهات الاتصال والشركات المكررة ويدمجها وفق قواعد المطابقة التي تحددها الشركة، يُكمل الحقول المطلوبة حين تتوفر المعلومة في موضع آخر من السجل، ويصدر لمدير المبيعات قائمة أسبوعية بالسجلات الناقصة.",
      operatesAcross: ["منصات CRM الرئيسية، قراءة وكتابة، بصلاحيات على مستوى الحقل"],
      included: [
        "تسجيل التفاعل في وقت وقوع العمل",
        "تقدّم المراحل وفق شروط تحددها الشركة",
        "اكتشاف السجلات المكررة ودمجها",
        "تقرير أسبوعي عن جودة البيانات للمدير المسؤول"
      ]
    },
    en: {
      name: "CRM Control",
      title: "A record written as the work happens, not after it",
      summary: "Writes every interaction and outcome back to the CRM as work occurs, and enforces your data rules.",
      detail: "Rather than depending on staff to update records after the event, the agent writes to the CRM as work takes place: it logs each conversation, advances the deal stage when the condition defined for that stage is met, records the outcome and the reason for it, and attaches the transcript. It identifies and merges duplicate contacts and companies according to your matching rules, completes required fields where the information exists elsewhere in the record, and issues a weekly list of records that remain incomplete to the sales manager.",
      operatesAcross: ["Major CRM platforms, read and write, under field-level permissions"],
      included: [
        "Interaction logging at the time the work occurs",
        "Stage progression against conditions defined by the client",
        "Duplicate identification and merging",
        "A weekly data-quality report to the responsible manager"
      ]
    }
  },
  {
    slug: "workflow-automation",
    number: "08",
    category: "documents",
    ar: {
      name: "أتمتة سير العمل والعمليات",
      title: "نُزيل النقل والملاحقة والانتظار بين الخطوات",
      summary: "يربط خطوات العملية التي تمر اليوم بين عدة أشخاص وأنظمة، ويؤتمت التوجيه والاعتماد والتصعيد مع سجل كامل لكل خطوة.",
      detail: "نوثّق العملية كما تجري فعلًا — بمن ينتظر من، وبما يحدث حين تنقص معلومة — ثم نؤتمت التسليم بين الخطوات. الطلب الوارد يُتحقق منه، يُوجَّه إلى المعتمِد الصحيح، يُصعَّد حين يتجاوز مدة الانتظار المتفق عليها، ويُكتب في كل نظام يمر به، مع إشعار مقدّم الطلب في كل مرحلة. أما الخطوات التي تحتاج قرارًا بشريًا فتبقى مع الإنسان؛ الذي يُزال هو النقل والملاحقة والانتظار بينها.",
      operatesAcross: ["تطبيقات الشركة القائمة، مرتبطة عبر API"],
      included: [
        "خريطة عملية موثقة قبل بدء أي بناء",
        "قواعد التوجيه والاعتماد متفق عليها كتابةً",
        "تصعيد تلقائي عند تجاوز الحدود الزمنية",
        "معالجة محددة لكل استثناء يُرصد أثناء التوثيق"
      ]
    },
    en: {
      name: "Workflow & Process Automation",
      title: "We remove the transcription, the chasing and the waiting between steps",
      summary: "Connects the steps of a process that currently passes between several people and several systems.",
      detail: "We document a process as it actually operates — including who waits for whom, and what occurs when information is missing — and then automate the handoffs between steps. An incoming request is validated, routed to the correct approver, escalated when it exceeds the agreed waiting time, and written to each system it touches, with the requester notified at each stage. Steps requiring human decision remain with a person; what is removed is the transcription, the chasing and the waiting between them.",
      operatesAcross: ["The client's existing applications, connected by API"],
      included: [
        "A documented process map produced before any build begins",
        "Routing and approval rules agreed in writing",
        "Automatic escalation against defined time thresholds",
        "A defined treatment for every exception identified during mapping"
      ]
    }
  },
  {
    slug: "internal-knowledge-assistant",
    number: "09",
    category: "documents",
    ar: {
      name: "مساعد المعرفة الداخلي",
      title: "إجابة لموظفيك، مع ذكر المصدر الذي جاءت منه",
      summary: "يجيب أسئلة الموظفين حول السياسات والأسعار والإجراءات من وثائق الشركة الداخلية، مع ذكر المصدر وضبط الوصول حسب الدور.",
      detail: "تُفهرَس أدلة الموظفين وقوائم الأسعار وإجراءات التشغيل المعيارية وشروط الموردين والتعاميم الداخلية وتصبح قابلة للبحث بلغة طبيعية. يسأل الموظف بالعربية أو الإنجليزية ويحصل على إجابة تذكر الوثيقة المصدر وقسمها، فتكون الإجابة قابلة للتحقق من الأصل. والوصول يتبع هيكل الصلاحيات في الشركة: موظف الفرع والمدير المالي يريان مادتين مختلفتين. وتتلقى الشركة تقريرًا شهريًا بأكثر المواضيع سؤالًا، وهو ما يشير إلى مواضع الحاجة في التوثيق أو التدريب.",
      operatesAcross: ["واتساب", "الويب", "منصات المحادثة الداخلية"],
      included: [
        "فهرسة الوثائق الداخلية للشركة",
        "مصدر مذكور مع كل إجابة",
        "وصول محكوم بالدور الوظيفي",
        "تقرير شهري بأكثر المواضيع تكرارًا"
      ]
    },
    en: {
      name: "Internal Knowledge Assistant",
      title: "An answer for your staff, with the source it came from",
      summary: "Answers staff questions on policy, pricing and procedure from your internal documentation.",
      detail: "Staff handbooks, price lists, standard operating procedures, supplier terms and internal circulars are indexed and made searchable in plain language. A member of staff asks a question in Arabic or English and receives an answer that cites the source document and section, so that the answer can be verified against the original. Access follows your own permission structure: a branch employee and a finance manager are shown different material. You receive a monthly report of the topics most frequently asked, which indicates where documentation or training requires attention.",
      operatesAcross: ["WhatsApp", "Web", "Internal chat platforms"],
      included: [
        "Indexing of the client's internal documentation",
        "A cited source on every answer given",
        "Access controlled by role",
        "A monthly report of the topics most frequently raised"
      ]
    }
  },

  // ─── Integration Services ──────────────────────────────────────────────────
  {
    slug: "website-app-assistant",
    number: "10",
    category: "integration",
    ar: {
      name: "مساعد الموقع والتطبيق",
      title: "مساعد داخل موقعك، بتصميمك، بسطر واحد",
      summary: "مساعد مدمج في موقع الشركة أو تطبيقها، يُركَّب بوسم سكربت واحد أو حزمة SDK، ويعمل بتصميم الشركة وبالعربية والإنجليزية.",
      detail: "يُوضع المساعد على الموقع بوسم سكربت واحد، أو داخل تطبيق الجوال عبر SDK، ويُنسَّق على تصميم الشركة: الألوان والخطوط والموضع وسلوك الفتح. يجيب من محتوى الموقع وبيانات المنتجات، يوجّه الزائر إلى الصفحة أو المنتج الصحيح، يجمع بيانات التواصل ممن يُظهر نية شرائية، يكتبها في الـ CRM، ويحوّل المحادثة إلى موظف عند الطلب أو عند بلوغ حدوده المحددة. يعمل بالعربية والإنجليزية، ويكمل المحادثة على واتساب إذا فضّل الزائر ذلك.",
      operatesAcross: ["أي موقع إلكتروني", "تطبيقات iOS و Android"],
      included: [
        "تركيب بوسم سكربت واحد أو SDK للجوال",
        "تنسيق على تصميم الشركة القائم",
        "بيانات التواصل تُكتب مباشرة في الـ CRM",
        "تحويل إلى موظف بالاسم مع إرفاق المحادثة"
      ]
    },
    en: {
      name: "Website & In-App AI Assistant",
      title: "An assistant inside your site, in your design, in one line",
      summary: "An assistant embedded within your website or mobile application, installed as a single script tag or an SDK.",
      detail: "The assistant is placed on the website with one script tag, or within a mobile application through an SDK, and is styled to your own design: colours, typography, placement and opening behaviour. It answers questions from the site's content and your product data, directs visitors to the correct page or product, collects contact details from visitors demonstrating intent, writes those details into the CRM, and transfers the conversation to a member of staff on request or when its defined limits are reached. It operates in Arabic and English, and continues the conversation on WhatsApp where the visitor prefers that channel.",
      operatesAcross: ["Any website", "iOS and Android applications"],
      included: [
        "Installation by a single script tag or mobile SDK",
        "Styled to the client's existing design",
        "Captured contact details written directly to the CRM",
        "Transfer to a named member of staff with the conversation attached"
      ]
    }
  },
  {
    slug: "ecommerce-integration",
    number: "11",
    category: "integration",
    ar: {
      name: "تكامل منصات التجارة الإلكترونية",
      title: "يجيب عن حالة الطلب بالحالة الفعلية، لا بالتقدير",
      summary: "يربط الوكيل بمتجر الشركة ليقرأ بيانات الطلبات والمنتجات والمخزون الحية، ويتعامل مع الاستفسارات والإرجاع ضمن حدود محددة.",
      detail: "يُربط الوكيل بـ Shopify أو WooCommerce أو سلة أو زد عبر واجهة المنصة. عندها يصبح قادرًا على الإجابة عن سؤال حالة الطلب بحالة الشحنة الفعلية، وتأكيد توفر الصنف وأي نسخة منه، وذكر السعر الصحيح شاملًا أي عرض ساري. يتواصل مع من تركوا سلالهم، يسجّل طلبات الإرجاع والاستبدال على الطلب الأصلي، ويعالج فواتير الموردين إلى نظام المحاسبة. أما الإجراءات التي تغيّر الطلب — استرداد، إلغاء، تغيير عنوان — فلا تُنفَّذ إلا ضمن حدود تضعها الشركة مسبقًا.",
      operatesAcross: ["Shopify", "WooCommerce", "سلة", "زد"],
      included: [
        "قراءة حية للطلبات والمخزون والأسعار",
        "تواصل مع العملاء الذين تركوا سلالهم",
        "طلبات الإرجاع والاستبدال مسجّلة على الطلب الأصلي",
        "الإجراءات المغيّرة للطلب محكومة بحدود تضعها الشركة"
      ]
    },
    en: {
      name: "E-commerce Platform Integration",
      title: "Answers an order question with the actual status, not an estimate",
      summary: "Connects the agent to your online store so that it reads live order, product and stock data.",
      detail: "The agent is connected to Shopify, WooCommerce, Salla or Zid through the platform's API. It is then able to answer an order-status question with the actual shipment status, confirm whether an item is in stock and in which variant, and quote the correct price including any promotion currently active. It contacts customers who have abandoned a cart, records return and exchange requests against the original order, and processes supplier invoices into the accounting system. Actions that alter an order — refund, cancellation, change of address — are performed only within limits you set in advance.",
      operatesAcross: ["Shopify", "WooCommerce", "Salla", "Zid"],
      included: [
        "Live order, stock and pricing lookup",
        "Contact with customers who abandon a cart",
        "Return and exchange requests recorded against the original order",
        "Order-altering actions bounded by limits set by the client"
      ]
    }
  },
  {
    slug: "booking-pos-integration",
    number: "12",
    category: "integration",
    ar: {
      name: "تكامل الحجز ونقاط البيع والتقويم",
      title: "الجدول الذي يعمل به فريقك هو الجدول الذي رآه العميل",
      summary: "اتصال ثنائي الاتجاه بنظام الحجز أو نقطة البيع أو التقويم، لقراءة التوافر والأسعار وكتابة الحجوزات المؤكدة مباشرة.",
      detail: "صلاحية القراءة تتيح للوكيل رؤية التوافر الحقيقي ومدة الخدمة والموظف المسؤول والسعر قبل أن يعرض وقتًا على العميل. وصلاحية الكتابة تتيح له وضع الحجز المؤكد مباشرة في النظام، فيكون الجدول الذي يعمل به الفريق هو نفسه الذي أُعطي للعميل. وحين يحتفظ نظام نقاط البيع ببيانات المنتجات والأسعار يقرأ الوكيل منه بدل قائمة منفصلة قد تتقادم. والإلغاءات تُحرَّر ويُعرض الموعد الناتج على قائمة الانتظار.",
      operatesAcross: ["أنظمة العيادات والمطاعم والصالونات والورش", "منصات نقاط البيع", "تقويم Google و Microsoft"],
      included: [
        "قراءة التوافر مع المدة والموظف المسؤول والسعر",
        "الحجوزات المؤكدة تُكتب مباشرة في نظام الشركة",
        "المواعيد المحرَّرة تُعرض على قائمة الانتظار عند الإلغاء",
        "الأسعار تُقرأ من نقطة البيع لا من قائمة منفصلة"
      ]
    },
    en: {
      name: "Booking, POS & Calendar Integration",
      title: "The schedule your team works from is the schedule the customer was given",
      summary: "A two-way connection to your booking system, point of sale or calendar that reads live availability and writes confirmed bookings directly.",
      detail: "Read access allows the agent to see genuine availability, service duration, staff assignment and price before it offers a time to a customer. Write access allows it to place the confirmed booking directly into the system, so that the schedule the team works from is the schedule the customer was given. Where a point-of-sale system holds product and price data, the agent reads from it rather than from a separate list that can fall out of date. Cancellations are released and the resulting slot is offered to the waitlist.",
      operatesAcross: ["Clinic, restaurant, salon and workshop systems", "POS platforms", "Google and Microsoft calendars"],
      included: [
        "Availability read with duration, staff assignment and price",
        "Confirmed bookings written directly into the client's system",
        "Released slots offered to the waitlist on cancellation",
        "Pricing read from the point of sale rather than a separate list"
      ]
    }
  },

  // ─── Channels ──────────────────────────────────────────────────────────────
  {
    slug: "whatsapp-business-api",
    number: "13",
    category: "channels",
    ar: {
      name: "واجهة واتساب للأعمال",
      title: "نتولى التوثيق المعقّد، ويبقى الرقم ملكك",
      summary: "نؤسس واجهة WhatsApp Business API الرسمية للشركة ونشغّل الوكيل عليها، مع حفظ سجلات الموافقة وحالة الرسائل وبقاء ملكية الرقم للشركة.",
      detail: "نتولى العملية التي تجدها أغلب المؤسسات معرقلة: توثيق Meta Business Manager، تسجيل رقم الشركة، اعتماد الاسم الظاهر، وتقديم قوالب الرسائل للموافقة بالعربية والإنجليزية. وبعد التشغيل يعمل الوكيل على القناة بكامل قدرات الواجهة — إدارة الجلسات، الرسائل القالبية خارج نافذة الأربع والعشرين ساعة، سجلات الموافقة، وتقارير حالة الرسائل. وتظل ملكية الرقم وحساب Business Manager للشركة طوال الوقت.",
      operatesAcross: ["WhatsApp Business Platform (Cloud API)"],
      included: [
        "توثيق النشاط التجاري وتسجيل الرقم",
        "صياغة قوالب الرسائل وتقديمها للموافقة",
        "حفظ سجلات الموافقة والاشتراك",
        "ملكية الرقم والحساب تبقى للشركة"
      ]
    },
    en: {
      name: "WhatsApp Business API",
      title: "We handle the difficult verification, and the number stays yours",
      summary: "Establishes the official WhatsApp Business API for you and operates the agent on it.",
      detail: "We complete the process most organisations find obstructive: Meta Business Manager verification, registration of your number, approval of the display name, and submission of message templates for approval in Arabic and English. Once live, the agent operates on the channel with full API capability — session management, template messaging outside the twenty-four-hour window, opt-in records, and message-status reporting. You retain ownership of the number and of the Business Manager account throughout.",
      operatesAcross: ["WhatsApp Business Platform (Cloud API)"],
      included: [
        "Business verification and number registration",
        "Message templates drafted and submitted for approval",
        "Opt-in and consent records maintained",
        "Ownership of the number and account retained by the client"
      ]
    }
  },
  {
    slug: "voice-agents",
    number: "14",
    category: "channels",
    ar: {
      name: "وكلاء الاتصال الصوتي",
      title: "يرد على المكالمة فورًا، ويترك تسجيلًا ونصًا وملخصًا",
      summary: "يجيب على المكالمات الواردة ويجري المكالمات الصادرة بالعربية والإنجليزية، مع تسجيل ونص لكل مكالمة.",
      detail: "في المكالمة الواردة يجيب الوكيل فورًا، يتعرّف على المتصل مقابل الـ CRM حين يوجد سجل، يعالج الطلب ضمن نطاقه المحدد — حجز، حالة طلب، ساعات العمل، رصيد حساب — ويحوّل إلى موظف حين يستدعي الأمر ذلك. وفي المكالمات الصادرة ينفّذ العمل الكمّي: تأكيدات المواعيد وتذكيراتها، إشعارات التسليم، استطلاعات الرضا، والمرحلة الأولى من التحصيل. وكل مكالمة تُسجَّل وتُفرَّغ نصًا وتُلخَّص في سجل العميل.",
      operatesAcross: ["أرقام الهاتف القائمة للشركة، عبر مزوّد اتصالات"],
      included: [
        "رد على المكالمات الواردة مع التعرف على المتصل مقابل الـ CRM",
        "مكالمات صادرة للتأكيد والتذكير والتحصيل",
        "تحويل إلى موظف مع سياق المكالمة",
        "تسجيل ونص وملخص مقابل كل مكالمة"
      ]
    },
    en: {
      name: "Voice AI Agents",
      title: "Answers immediately, and leaves a recording, a transcript and a summary",
      summary: "Answers inbound calls and places outbound calls in Arabic and English, with a recording and transcript of each.",
      detail: "On an inbound call the agent answers immediately, identifies the caller against the CRM where a record exists, handles the request within its defined scope — booking, order status, opening hours, account balance — and transfers to a member of staff where the matter requires one. On outbound calls it performs the volume work: appointment confirmations and reminders, delivery notifications, satisfaction checks and first-stage collections. Every call is recorded, transcribed and summarised into the customer record.",
      operatesAcross: ["The client's existing telephone numbers, through a telephony provider"],
      included: [
        "Inbound answering with caller identification against the CRM",
        "Outbound confirmation, reminder and collection calls",
        "Transfer to a member of staff with the call context",
        "A recording, transcript and summary against every call"
      ]
    }
  },

  // ─── Intelligence & Enablement ─────────────────────────────────────────────
  {
    slug: "custom-model-development",
    number: "15",
    category: "intelligence",
    ar: {
      name: "تطوير النماذج المخصصة والضبط الدقيق",
      title: "تستلم نتائج مقيسة، لا وعدًا بالدقة",
      summary: "نكيّف النموذج على مفردات الشركة ووثائقها ولهجتها حين لا تكفي النماذج العامة، ونقيس الدقة على حالات حقيقية قبل العمل وبعده.",
      detail: "النماذج العامة تؤدي جيدًا على اللغة العامة، وأقل جودة على الخاص: رموز المنتجات الداخلية، المصطلحات السريرية والتقنية، اللهجة المحلية، والاختصارات التي تستخدمها مؤسسة بعينها. وحين يثبت اختبار الدقة أن هذا يؤثر على النتائج، نجمع مجموعة تدريب من مادة الشركة نفسها، ونطبّق الضبط الدقيق أو الاسترجاع وفق ما تدعمه الأدلة، ونقيس الدقة على مجموعة محجوزة من الحالات الحقيقية قبل العمل وبعده. وتستلم الشركة النتائج المقيسة لا التطمين.",
      operatesAcross: ["وثائق الشركة ونصوصها وسجلاتها"],
      included: [
        "قياس دقة أساسي قبل بدء العمل",
        "مجموعة تدريب مبنية من مادة الشركة نفسها",
        "اختيار الضبط الدقيق أو الاسترجاع بناءً على الأدلة",
        "تقييم موثق على حالات حقيقية محجوزة"
      ]
    },
    en: {
      name: "Custom Model Development & Fine-Tuning",
      title: "You receive measured results, not an assurance of accuracy",
      summary: "Adapts a model to your own vocabulary, documents and dialect where general models are not sufficiently accurate.",
      detail: "General models perform well on general language and less well on the specific: internal product codes, clinical and technical terminology, regional dialect, and the shorthand a particular organisation uses. Where accuracy testing demonstrates that this is affecting results, we assemble a training set from your own material, apply fine-tuning or retrieval according to what the evidence supports, and measure accuracy against a held-out set of genuine cases before and after the work. You receive the measured results rather than an assurance.",
      operatesAcross: ["The client's own documents, transcripts and records"],
      included: [
        "A baseline accuracy measurement taken before work begins",
        "A training set assembled from the client's own material",
        "Fine-tuning or retrieval selected on the evidence",
        "Documented evaluation against genuine held-out cases"
      ]
    }
  },
  {
    slug: "analytics-dashboards",
    number: "16",
    category: "intelligence",
    ar: {
      name: "البيانات والتقارير ولوحات التحليل",
      title: "كل رقم يُفتح على المحادثات التي تقف خلفه",
      summary: "لوحة تعرض ما نفّذه الوكلاء، بأي كلفة وبأي أثر، مع إمكان الانتقال من كل رقم إلى المحادثات الفردية التي تقف خلفه.",
      detail: "كل إجراء ينفّذه الوكيل يُسجَّل. وتعرض اللوحة هذا السجل كمعلومة إدارية: الحجم المُعالَج بحسب القناة والساعة، ونسبة ما حُسم دون تدخل بشري، وأسباب التصعيد، وأزمنة الاستجابة والحل، وكلفة الحالة الواحدة مقابل كلفة العمل نفسه يدويًا. وأي رقم يمكن فتحه على المحادثات الفردية التي تقف خلفه. وتصدر البيانات نفسها شهريًا في حزمة مراجعة مكتوبة.",
      operatesAcross: ["الويب، بصلاحيات وصول حسب الدور"],
      included: [
        "تقارير الحجم والحسم والتصعيد",
        "قياس مستمر لأزمنة الاستجابة والحل",
        "كلفة الحالة مقابل الأساس اليدوي",
        "تنقّل من أي رقم إلى المحادثات التي خلفه"
      ]
    },
    en: {
      name: "Data, Reporting & Analytics Dashboards",
      title: "Every figure opens onto the conversations beneath it",
      summary: "A dashboard reporting what the agents performed, at what cost, and to what effect.",
      detail: "Every action an agent takes is logged. The dashboard presents that log as management information: volume handled by channel and by hour, the proportion resolved without human involvement, the reasons for escalation, response and resolution times, and cost per resolution measured against the cost of the same work performed manually. Any figure can be opened to the individual conversations beneath it. The same data is issued monthly as a written review pack.",
      operatesAcross: ["Web, with access granted by role"],
      included: [
        "Volume, resolution and escalation reporting",
        "Response and resolution times measured continuously",
        "Cost per resolution against the manual baseline",
        "Drill-down from any figure to the underlying conversations"
      ]
    }
  },
  {
    slug: "training-enablement",
    number: "17",
    category: "intelligence",
    ar: {
      name: "التدريب وتمكين الفريق",
      title: "ثلاث فئات، ثلاثة تدريبات مختلفة",
      summary: "ندرّب موظفي الشركة على الإشراف على الأنظمة المُسلَّمة وتشغيلها وتوسيعها، مع أدلة تشغيل وتدريب مخصص للمشرفين والمديرين.",
      detail: "نخاطب ثلاث فئات كلًّا على حدة. المشرفون يُدرَّبون على قائمة التصعيد: كيف يقرأون ما فعله الوكيل، وكيف يصححونه، وكيف يعود التصحيح إلى النظام. والمديرون يُدرَّبون على التقارير: أي الأرقام يشير إلى مشكلة تستدعي إجراءً وأيها لا. والفرق التي تنوي بناء أتمتة بسيطة بنفسها تُدرَّب على ذلك ضمن الحدود المتفق عليها. وتُقدَّم أدلة التشغيل ووثائق التسليم في كل حالة.",
      operatesAcross: ["في مقر الشركة أو عن بُعد، بالعربية أو الإنجليزية"],
      included: [
        "تدريب المشرفين على قائمة التصعيد",
        "إحاطة المديرين بالتقارير وحدودها",
        "ورش عملية للبُناة الداخليين",
        "أدلة تشغيل ووثائق تسليم"
      ]
    },
    en: {
      name: "AI Training & Team Enablement",
      title: "Three audiences, three different trainings",
      summary: "Trains your staff to supervise, operate and extend the delivered systems, with operating guides and separate sessions for supervisors and managers.",
      detail: "Three audiences are addressed separately. Supervisors are trained on the escalation queue: how to read what the agent did, how to correct it, and how the correction is fed back. Managers are trained on the reporting: which figures indicate a problem requiring action and which do not. Teams intending to build straightforward automations themselves are trained to do so within the boundaries agreed with the client. Written runbooks and handover documentation are provided in every case.",
      operatesAcross: ["On site or remote, in Arabic or English"],
      included: [
        "Supervisor training on the escalation queue",
        "Manager briefing on the reporting and its thresholds",
        "Practical workshops for internal builders",
        "Runbooks and handover documentation"
      ]
    }
  }
];

module.exports = { CATEGORIES, SERVICES };
