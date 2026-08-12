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

// Long-form page copy, one entry per service that has it. Extracted from the
// seven hand-built React pages this replaced; those pages held genuine
// bilingual marketing copy that the catalogue entries above do not carry.
//
// Deliberately NOT carried over from those pages: the hardcoded demo panels
// (a fake chat transcript scored 87/100, invented lead counts, an invented
// receivables aging split). Where a mock had a real label under the invented
// number — the scoring criteria, the aging buckets, the dashboard metric
// names — the label survives and the number does not.
//
// A service without an entry here renders the shorter catalogue layout; the
// generator treats every section below as optional.
const SERVICE_PAGES = {
  "lead-qualification": {
    "ar": {
      "hero": {
        "eyebrow": "وكيل ذكاء اصطناعي لاستقبال وتأهيل العملاء المحتملين",
        "headline": "وكيل ذكاء اصطناعي لتأهيل العملاء وتحويلهم إلى فرص مبيعات",
        "brief": "يستقبل وكيل فلق العملاء المحتملين من واتساب والموقع والإعلانات، يجمع البيانات المطلوبة، يطبق Lead Scoring وفق قواعدك، ثم يحجز موعدًا أو يحوّل العميل إلى موظف المبيعات المناسب.",
        "sub": "بدل الرد المتأخر والأسئلة غير الموحدة، يعمل نظام تأهيل العملاء تلقائيًا على مدار الساعة: يتحقق من البيانات، يكتشف السجلات المكررة، يصنف العميل إلى ساخن أو دافئ أو بارد، ويوثق المصدر والنتيجة داخل CRM أو Google Sheets.",
        "primary": "احصل على هذه الخدمة الآن",
        "secondary": "شاهد كيف يعمل النظام",
        "scroll": "مرر للأسفل"
      },
      "pressures": [
        "رد متأخر على العميل",
        "أسئلة تأهيل غير موحدة",
        "عملاء مكررون في الأنظمة",
        "Leads بلا تصنيف واضح",
        "مصدر العميل غير معروف",
        "عملاء ساخنون بلا متابعة فورية",
        "مواعيد تُفوَّت",
        "معلومات ناقصة عن العميل",
        "عملاء غير مؤهلين يستهلكون وقت المبيعات",
        "قنوات متعددة بلا نظام موحد"
      ],
      "rules": {
        "label": "لماذا فلق",
        "headline": "تأهيل بقواعد واضحة، لا تصنيف تقديري",
        "lead": "كل درجة، كل تصنيف، وكل إجراء يمر بضوابط محددة مسبقًا توافق عليها.",
        "items": [
          {
            "num": "01",
            "title": "لا ينتقل بلا حقول إلزامية",
            "text": "لا يُصنَّف أي عميل قبل جمع الحقول الإلزامية المتفق عليها، مهما بدا مهتمًا."
          },
          {
            "num": "02",
            "title": "لا يترك عميلاً ساخنًا بلا رد فوري",
            "text": "العميل المصنف \"ساخن\" يُحوَّل أو يُحجز له موعد مباشرة، دون انتظار دوره في الطابور."
          },
          {
            "num": "03",
            "title": "لا يقرر بمفرده عند التعارض",
            "text": "عند وجود معلومات متناقضة أو غير واضحة يُحوَّل الملف لمراجعة موظف بدل تصنيف تلقائي خاطئ."
          },
          {
            "num": "04",
            "title": "يسجل كل محادثة ومصدر",
            "text": "كل تفاعل، مصدره، ودرجته يُحفظ في سجل كامل قابل للمراجعة داخل CRM."
          }
        ]
      },
      "channels": {
        "label": "القنوات المدعومة",
        "headline": "يستقبل العميل من أي قناة يتواصل منها",
        "lead": "نقطة استقبال وتأهيل واحدة موحدة، أيًا كان مصدر العميل.",
        "items": [
          "WhatsApp Business",
          "نماذج الموقع",
          "الدردشة داخل الموقع",
          "Facebook Lead Ads",
          "Instagram Lead Ads",
          "البريد الإلكتروني",
          "صفحات الهبوط",
          "CRM الحالي",
          "Google Sheets"
        ],
        "hubTitle": "نقطة تأهيل واحدة",
        "hubLead": "كل عميل، من أي قناة، يدخل نفس مسار الاستقبال والتقييم."
      },
      "stages": {
        "label": "رحلة العميل",
        "headline": "كيف يعمل وكيل تأهيل العملاء من أول رسالة إلى التحويل",
        "lead": "أربع مراحل لأتمتة استقبال العميل وجمع بياناته وتقييمه وتنفيذ الإجراء المناسب.",
        "items": [
          {
            "num": "01",
            "title": "الاستقبال",
            "text": "يسجل وقت الوصول، يحدد المصدر والحملة، يتحقق إن كان عميلاً جديدًا أو موجودًا سابقًا، ويرسل ترحيبًا مناسبًا للمصدر والخدمة."
          },
          {
            "num": "02",
            "title": "جمع المعلومات",
            "text": "يطرح أسئلة تأهيل مخصصة لنشاطك، ولا ينتقل للمرحلة التالية قبل التحقق من اكتمال الحقول الإلزامية."
          },
          {
            "num": "03",
            "title": "التقييم",
            "text": "يمنح العميل درجة وفق معايير متفق عليها، ويصنفه إلى ساخن، دافئ، بارد، غير مؤهل، أو يحتاج مراجعة."
          },
          {
            "num": "04",
            "title": "تنفيذ الإجراء",
            "text": "يحجز موعدًا، يحوّل العميل لموظف، يبدأ سلسلة متابعة، أو يغلق الملف مع تسجيل السبب — بحسب التصنيف."
          }
        ]
      },
      "tiers": {
        "label": "نظام تقييم العملاء",
        "headline": "كل عميل يحصل على درجة تأهيل واضحة",
        "lead": "المعايير والنسب قابلة للتخصيص الكامل حسب نشاطك — هذا مثال توضيحي على عميل حقيقي.",
        "criteria": [
          "ملاءمة الميزانية",
          "قرب موعد الشراء",
          "ملاءمة الخدمة",
          "الموقع الجغرافي",
          "كون الشخص صاحب القرار",
          "اكتمال المعلومات",
          "التفاعل والاستجابة"
        ],
        "items": [
          { "name": "ساخن", "text": "تحويل فوري لموظف المبيعات أو حجز موعد مباشر" },
          { "name": "دافئ", "text": "إضافة لسلسلة متابعة مجدولة" },
          { "name": "بارد", "text": "وضعه في حملة رعاية طويلة" },
          { "name": "غير مؤهل", "text": "إغلاق الملف مع تسجيل السبب" },
          { "name": "يحتاج مراجعة", "text": "تحويل لموظف للتحقق من التناقض" }
        ]
      },
      "contrast": {
        "label": "الفرق الحقيقي",
        "headline": "ماذا يحدث لذلك العميل الجديد، في كلتا الحالتين؟",
        "lead": "نفس العميل، نفس الفرصة — لكن مصيرين مختلفين تمامًا.",
        "withoutLabel": "بدون فلق AI",
        "withLabel": "مع فلق AI",
        "without": ["عميل جديد يرسل رسالة", "يبقى بلا رد لساعات", "يتواصل مع منافس أسرع", "الفرصة تُفقد دون تسجيل السبب"],
        "withoutNote": "لا أحد رد بسرعة كافية — والعميل انتقل لمنافس بينما الرسالة تنتظر في القائمة.",
        "with": [
          "عميل جديد يرسل رسالة",
          "يُستقبل ويُؤهَّل فورًا",
          "يحصل على درجة وتصنيف واضح",
          "يُوجَّه للإجراء الصحيح تلقائيًا",
          "الفرصة موثقة وقابلة للمتابعة لحظيًا"
        ],
        "withNote": "العميل حصل على رد فوري وتوجيه صحيح، والفرصة موثقة بالكامل داخل CRM."
      },
      "reporting": {
        "label": "الرؤية الكاملة",
        "headline": "لوحة متابعة تكشف صحة قناة استقبال العملاء",
        "lead": "كل عميل جديد، كل تصنيف، كل موعد محجوز — في مكان واحد يحدَّث لحظيًا.",
        "panelTitle": "لوحة متابعة العملاء",
        "metrics": ["عملاء جدد", "عملاء ساخنون", "مواعيد محجوزة", "غير مؤهلين", "نسبة اكتمال التأهيل"]
      },
      "exceptions": {
        "label": "حالات خاصة",
        "headline": "حالات لا تُترك لتقدير النظام وحده",
        "lead": "كل حالة استثنائية لها سياسة تعامل واضحة، لا قرار عشوائي.",
        "policyLabel": "سياسة التعامل",
        "items": [
          {
            "title": "العميل يرفض الإجابة عن الأسئلة",
            "text": "يُسجَّل بالحد الأدنى من المعلومات ويُصنَّف \"يحتاج مراجعة\" دون إجبار العميل على الاستمرار."
          },
          {
            "title": "العميل يطلب موظفًا مباشرة",
            "text": "تُحوَّل المحادثة فورًا لموظف مع ملخص لما جرى، دون إكمال بقية الأسئلة."
          },
          {
            "title": "رسالة صوتية أو صورة",
            "text": "تُحفظ المرفقات في ملف العميل وتُحوَّل الحالة لموظف إن تعذّر فهم المحتوى تلقائيًا."
          },
          {
            "title": "العميل غاضب",
            "text": "تُحوَّل المحادثة فورًا لموظف مع علم بأولوية عالية، دون محاولة تهدئة آلية."
          },
          { "title": "رقم موجود مسبقًا في CRM", "text": "يُسترجع آخر تواصل مع العميل، ولا يُنشأ سجل مكرر." },
          { "title": "عميل سابق لديه شكوى", "text": "يُنبَّه الموظف بالسجل السابق قبل بدء أي تأهيل جديد." },
          {
            "title": "عميل خارج أوقات العمل",
            "text": "يستقبل ترحيبًا يوضح موعد الرد، ويُسجَّل الطلب للمتابعة في أول وقت عمل."
          },
          {
            "title": "معلومات متناقضة عن العميل",
            "text": "يُعلَّم الملف \"يحتاج مراجعة\" بدل تصنيف تلقائي قد يكون خاطئًا."
          }
        ]
      },
      "deliverables": {
        "label": "ما تحصل عليه",
        "headline": "نظام استقبال وتأهيل جاهز، لا مجرد رد آلي",
        "lead": "كل ما تحتاجه لاستقبال كل عميل وتأهيله ومتابعته دون أن يضيع في الطابور.",
        "items": [
          "وكيل محادثة مخصص لنشاطك",
          "شجرة أسئلة تأهيل قابلة للتخصيص",
          "نظام Lead Scoring بمعايير واضحة",
          "ربط كامل مع CRM أو قاعدة بيانات",
          "كشف تكرار للعملاء",
          "توزيع تلقائي للعملاء على الموظفين",
          "حجز مواعيد تلقائي",
          "لوحة أداء وتقرير بمصادر العملاء"
        ]
      },
      "faq": {
        "label": "أسئلة شائعة",
        "headline": "كل ما تحتاج معرفته قبل البدء",
        "items": [
          {
            "q": "كيف يحدد النظام إن كان العميل ساخنًا أم باردًا؟",
            "a": "وفق معايير تقييم توافق عليها معنا مسبقًا: الميزانية، قرب الشراء، ملاءمة الخدمة، الموقع، وصلاحية القرار — ثم يمنح درجة ويصنف العميل تلقائيًا."
          },
          {
            "q": "ماذا يحدث لو رفض العميل الإجابة عن الأسئلة؟",
            "a": "يُسجَّل بالمعلومات المتاحة ويُصنَّف \"يحتاج مراجعة\" دون إجبار العميل على الاستمرار."
          },
          {
            "q": "هل يمكن تخصيص أسئلة التأهيل حسب نشاطنا؟",
            "a": "نعم، تُبنى شجرة الأسئلة والمعايير بالكامل وفق خدماتك ونشاطك، ويمكن تعديلها في أي وقت."
          },
          {
            "q": "ماذا يحدث للعميل المصنف \"ساخنًا\"؟",
            "a": "يُحوَّل فورًا للموظف المناوب أو يُحجز له موعد مباشرة دون انتظار الدور."
          },
          {
            "q": "هل يكتشف النظام العملاء المكررين؟",
            "a": "نعم، يبحث عن رقم الهاتف أو البريد داخل CRM ويسترجع آخر تواصل قبل إنشاء أي سجل جديد."
          },
          {
            "q": "هل يمكن ربط النظام بقنواتنا الحالية مثل واتساب والإعلانات؟",
            "a": "نعم، يدعم واتساب، الموقع، الدردشة، إعلانات فيسبوك وانستغرام، البريد، وصفحات الهبوط، مع ربط بالـCRM الحالي أو Google Sheets."
          }
        ]
      },
      "engage": {
        "label": "ابدأ الآن",
        "headline": "جاهز تستقبل كل عميل محتمل وتؤهله في ثوانٍ بدل ساعات؟",
        "lead": "عبّئ النموذج وسيتواصل معك فريقنا خلال وقت قصير لبدء تركيب نظام استقبال وتأهيل العملاء على قنواتك الحالية.",
        "points": [
          "يعمل مع القنوات التي تستخدمها فعليًا دون تغييرها",
          "معايير تقييم وتصنيف قابلة للتخصيص الكامل",
          "ربط مباشر مع CRM الحالي أو Google Sheets"
        ]
      }
    },
    "en": {
      "hero": {
        "eyebrow": "AI Agent for Lead Reception & Qualification",
        "headline": "AI lead qualification agent that turns inquiries into sales opportunities",
        "brief": "Falaq receives leads from WhatsApp, your website, and ad campaigns, collects required data, applies your lead-scoring rules, then books a meeting or routes the lead to the right sales representative.",
        "sub": "Instead of slow replies and inconsistent questions, the qualification workflow runs around the clock: it validates data, detects duplicate records, classifies every lead as hot, warm, cold, or unqualified, and logs the source and result in your CRM or Google Sheets.",
        "primary": "Get This Service Now",
        "secondary": "See how it works",
        "scroll": "Scroll down"
      },
      "pressures": [
        "Slow customer replies",
        "Inconsistent qualification questions",
        "Duplicate customers across systems",
        "Leads with no clear tier",
        "Unknown lead source",
        "Hot leads with no instant follow-up",
        "Missed appointments",
        "Incomplete customer info",
        "Unqualified leads eating sales time",
        "Multiple channels, no unified system"
      ],
      "rules": {
        "label": "Why Falaq",
        "headline": "Qualification with clear rules, not a guess",
        "lead": "Every score, every tier, every action passes through controls you approve in advance.",
        "items": [
          {
            "num": "01",
            "title": "Never skips a mandatory field",
            "text": "No customer is scored before the agreed mandatory fields are collected, no matter how interested they seem."
          },
          {
            "num": "02",
            "title": "Never leaves a hot lead waiting",
            "text": "A lead tagged \"hot\" is transferred or booked instantly, without waiting its turn in the queue."
          },
          {
            "num": "03",
            "title": "Never decides alone on conflicts",
            "text": "When information is contradictory or unclear, the file goes to a rep for review instead of a wrong auto-tier."
          },
          {
            "num": "04",
            "title": "Logs every conversation and source",
            "text": "Every interaction, its source, and its score is saved to a full, reviewable CRM record."
          }
        ]
      },
      "channels": {
        "label": "Supported channels",
        "headline": "Receives the customer from whichever channel they use",
        "lead": "One unified reception and qualification point, whatever the lead’s source.",
        "items": [
          "WhatsApp Business",
          "Website forms",
          "On-site live chat",
          "Facebook Lead Ads",
          "Instagram Lead Ads",
          "Email",
          "Landing pages",
          "Existing CRM",
          "Google Sheets"
        ],
        "hubTitle": "One qualification point",
        "hubLead": "Every customer, from any channel, enters the same reception and scoring path."
      },
      "stages": {
        "label": "The customer journey",
        "headline": "How the AI lead qualification workflow routes every new inquiry",
        "lead": "Four automated stages receive the lead, collect information, score readiness, and trigger the right sales action.",
        "items": [
          {
            "num": "01",
            "title": "Reception",
            "text": "Logs the arrival time, identifies the source and campaign, checks whether the customer is new or returning, and sends a welcome fit for the source and service."
          },
          {
            "num": "02",
            "title": "Info gathering",
            "text": "Asks qualifying questions tailored to your business, and never moves forward before the mandatory fields are complete."
          },
          {
            "num": "03",
            "title": "Scoring",
            "text": "Scores the customer against agreed criteria and tiers them as hot, warm, cold, unqualified, or needs review."
          },
          {
            "num": "04",
            "title": "Action",
            "text": "Books an appointment, transfers to a rep, starts a follow-up sequence, or closes the file with a logged reason — depending on the tier."
          }
        ]
      },
      "tiers": {
        "label": "Lead scoring engine",
        "headline": "Every customer gets a clear qualification score",
        "lead": "Criteria and weights are fully customizable to your business — this is a live example on a real lead.",
        "criteria": [
          "Budget fit",
          "Purchase timing",
          "Service fit",
          "Location",
          "Decision-maker",
          "Info completeness",
          "Engagement"
        ],
        "items": [
          { "name": "Hot", "text": "Instant transfer to a sales rep or direct booking" },
          { "name": "Warm", "text": "Added to a scheduled follow-up sequence" },
          { "name": "Cold", "text": "Placed in a long-term nurture campaign" },
          { "name": "Unqualified", "text": "Closed with the reason logged" },
          { "name": "Needs review", "text": "Sent to a rep to resolve the conflict" }
        ]
      },
      "contrast": {
        "label": "The real difference",
        "headline": "What happens to that new lead, either way?",
        "lead": "Same customer, same opportunity — two completely different outcomes.",
        "withoutLabel": "Without Falaq AI",
        "withLabel": "With Falaq AI",
        "without": [
          "New lead sends a message",
          "Sits unanswered for hours",
          "Reaches out to a faster competitor",
          "The opportunity is lost with no logged reason"
        ],
        "withoutNote": "No one replied fast enough — the lead moved to a competitor while the message waited in the queue.",
        "with": [
          "New lead sends a message",
          "Greeted and qualified instantly",
          "Gets a clear score and tier",
          "Routed to the right action automatically",
          "Opportunity documented and reviewable in real time"
        ],
        "withNote": "The lead got an instant reply and the right routing, fully documented in the CRM."
      },
      "reporting": {
        "label": "Full visibility",
        "headline": "A dashboard that shows the health of your intake",
        "lead": "Every new lead, every tier, every booked appointment — in one place, updated live.",
        "panelTitle": "Lead Dashboard",
        "metrics": ["New leads", "Hot leads", "Booked appointments", "Unqualified", "Qualification rate"]
      },
      "exceptions": {
        "label": "Special cases",
        "headline": "Cases never left to the system’s judgment alone",
        "lead": "Every exceptional case has a clear handling policy, not a random call.",
        "policyLabel": "Handling policy",
        "items": [
          {
            "title": "Customer refuses to answer questions",
            "text": "Logged with the minimum info available and tagged \"needs review\" — never forced to continue."
          },
          {
            "title": "Customer asks for a human directly",
            "text": "The conversation is transferred instantly to a rep with a summary, without finishing the remaining questions."
          },
          {
            "title": "A voice note or image message",
            "text": "Attachments are saved to the customer file, and the case is transferred to a rep if content can’t be parsed automatically."
          },
          {
            "title": "An angry customer",
            "text": "The conversation is transferred instantly to a rep flagged high priority, with no automated attempt to de-escalate."
          },
          {
            "title": "Number already exists in the CRM",
            "text": "The last contact history is retrieved, and no duplicate record is created."
          },
          {
            "title": "A past customer with a complaint",
            "text": "The rep is alerted to the prior record before any new qualification begins."
          },
          {
            "title": "Customer messages outside working hours",
            "text": "They get a welcome that states response time, and the request is logged for the next working hour."
          },
          {
            "title": "Contradictory information",
            "text": "The file is flagged \"needs review\" instead of a possibly wrong auto-tier."
          }
        ]
      },
      "deliverables": {
        "label": "What you get",
        "headline": "A ready intake & qualification system, not just an auto-reply",
        "lead": "Everything you need to receive, qualify, and follow up on every lead without losing it in the queue.",
        "items": [
          "A chat agent tailored to your business",
          "A customizable qualification question tree",
          "A lead scoring system with clear criteria",
          "Full integration with your CRM or database",
          "Duplicate lead detection",
          "Automatic distribution to reps",
          "Automatic appointment booking",
          "A performance dashboard and source report"
        ]
      },
      "faq": {
        "label": "FAQ",
        "headline": "Everything you need to know before you start",
        "items": [
          {
            "q": "How does the system decide if a lead is hot or cold?",
            "a": "Against scoring criteria agreed with you in advance: budget, purchase timing, service fit, location, and decision authority — then it scores and tiers the lead automatically."
          },
          {
            "q": "What happens if a customer refuses to answer?",
            "a": "They’re logged with the available info and tagged \"needs review\" — never forced to continue."
          },
          {
            "q": "Can we customize the qualification questions?",
            "a": "Yes, the question tree and criteria are built entirely around your services and can be adjusted anytime."
          },
          {
            "q": "What happens to a lead tagged \"hot\"?",
            "a": "They’re transferred instantly to the on-duty rep or booked directly, with no wait in the queue."
          },
          {
            "q": "Does it detect duplicate customers?",
            "a": "Yes, it checks the phone or email against the CRM and retrieves the last contact history before creating any new record."
          },
          {
            "q": "Can it connect to our existing channels like WhatsApp and ads?",
            "a": "Yes, it supports WhatsApp, the website, live chat, Facebook and Instagram Lead Ads, email, and landing pages, with a link to your existing CRM or Google Sheets."
          }
        ]
      },
      "engage": {
        "label": "Start now",
        "headline": "Ready to greet and qualify every lead in seconds instead of hours?",
        "lead": "Fill in the form and our team will reach out shortly to start setting up lead reception and qualification on your existing channels.",
        "points": [
          "Works with the channels you already use, unchanged",
          "Fully customizable scoring and tiering rules",
          "Direct link to your existing CRM or Google Sheets"
        ]
      }
    }
  },

  "quote-follow-up": {
    "ar": {
      "hero": {
        "eyebrow": "وكيل ذكاء اصطناعي لمتابعة عروض الأسعار — B2B",
        "headline": "أتمتة متابعة عروض الأسعار وتحويل الصمت إلى فرص مبيعات",
        "brief": "يرتبط وكيل فلق بعروض الأسعار وCRM، يرسل متابعة تلقائية مناسبة لمرحلة الصفقة، يصنف رد العميل واعتراضه، وينبه موظف المبيعات عند ظهور نية شراء أو حاجة إلى قرار بشري.",
        "sub": "يمنع نظام متابعة عروض الأسعار ضياع الصفقات بعد الإرسال؛ فهو يسجل وصول العرض وفتحه، يوقف الرسائل فور رد العميل، ويتابع أسباب التردد مثل السعر أو الموافقة الداخلية أو طلب التعديل دون منح خصم أو تغيير الشروط تلقائيًا.",
        "primary": "احصل على هذه الخدمة الآن",
        "secondary": "شاهد كيف يعمل النظام",
        "scroll": "مرر للأسفل"
      },
      "rules": {
        "label": "لماذا فلق",
        "headline": "أتمتة تتصرف كأفضل موظف مبيعات لديك",
        "lead": "ليست رسائل عشوائية، بل نظام يفهم مرحلة كل صفقة ويتصرف بصلاحيات واضحة.",
        "items": [
          {
            "num": "01",
            "title": "لا يقرر نيابة عنك",
            "text": "لا يمنح خصمًا، ولا يعدّل السعر أو نطاق الخدمة دون صلاحية معتمدة منك."
          },
          {
            "num": "02",
            "title": "يسلّم للموظف في الوقت الصحيح",
            "text": "عند طلب مكالمة أو اعتراض حساس، يحوّل الصفقة فورًا لمسؤول المبيعات المختص."
          },
          {
            "num": "03",
            "title": "كل شيء مسجّل في CRM",
            "text": "كل رسالة، كل رد، كل قرار — سجل كامل قابل للمراجعة لحظة بلحظة."
          },
          {
            "num": "04",
            "title": "يتوقف فور الرد",
            "text": "ما إن يرد العميل حتى يوقف التسلسل تلقائيًا — لا رسائل متكررة أو متعارضة."
          }
        ]
      },
      "stages": {
        "label": "كيف يعمل",
        "headline": "كيف تعمل متابعة عروض الأسعار تلقائيًا من الإرسال إلى الإغلاق",
        "lead": "خمس مراحل توثق العرض، تتابع العميل، تصنف الرد، وتدخل موظف المبيعات في اللحظة المناسبة.",
        "items": [
          {
            "num": "01",
            "title": "تأكيد الإرسال وربط العرض بسجل العميل",
            "text": "بمجرد أن يغادر عرض السعر جهازك، يسجّل فلق تاريخ ووقت الإرسال بالضبط، ويربط ملف العرض تلقائيًا بسجل العميل داخل نظام إدارة العلاقات (CRM). في نفس اللحظة، تصل للعميل رسالة تأكيد قصيرة توضح أن العرض وصل بنجاح، مع وسيلة مباشرة لطرح أي سؤال قبل أن يبدأ في المراجعة. كما ينشئ النظام موعد متابعة تلقائي في التقويم، حتى لا يعتمد الأمر على تذكّر أحد الموظفين."
          },
          {
            "num": "02",
            "title": "تتبّع فتح العرض وقياس مستوى الاهتمام",
            "text": "إذا كانت أداة إرسال العروض تدعم تتبّع الفتح، يسجّل فلق أول لحظة يفتح فيها العميل الملف، ويحسب عدد مرات الفتح تباعًا. فتح واحد قد يعني فضولًا عابرًا، لكن فتح العرض ثلاث مرات أو أكثر خلال يومين يُعتبر إشارة اهتمام حقيقية، فيرفع النظام أولوية الصفقة تلقائيًا وينبّه الموظف المختص بأن العميل يراجع العرض بجدية أكبر من المعتاد."
          },
          {
            "num": "03",
            "title": "تسلسل متابعة تلقائي عند الصمت",
            "text": "إن مرّ وقت معيّن دون رد من العميل، يبدأ فلق تسلسل متابعة مرتّب على مراحل بدل رسالة واحدة متكررة: متابعة أولى للتأكد من وصول العرض بوضوح، ثم متابعة ثانية للسؤال إن كانت هناك استفسارات تحتاج توضيحًا، ثم متابعة ثالثة تحاول فهم سبب التأخير تحديدًا، وأخيرًا رسالة ختامية قبل نقل الصفقة إلى حالة غير نشطة. يتوقف هذا التسلسل بالكامل وفورًا في اللحظة التي يرد فيها العميل، بلا استثناء."
          },
          {
            "num": "04",
            "title": "تصنيف رد العميل تلقائيًا وتحديد الإجراء",
            "text": "عندما يرد العميل أخيرًا، يقرأ فلق محتوى الرد ويصنّفه ضمن حالات معروفة مثل: موافق، يحتاج تعديلًا، يرى أن السعر مرتفع، يقارن بعرض منافس، ينتظر موافقة داخلية، يريد مكالمة، أو رفض العرض صراحة. بناءً على هذا التصنيف، ينفّذ النظام الإجراء المناسب مباشرة — مثل إرسال دراسة حالة أو حجز مكالمة أو تسجيل الاعتراض لمراجعته لاحقًا — دون أن يتخذ أي قرار يخص السعر أو الشروط من تلقاء نفسه."
          },
          {
            "num": "05",
            "title": "تنبيه فريق المبيعات في اللحظة المناسبة",
            "text": "في أي لحظة تظهر فيها إشارة قوية على نية شراء حقيقية، أو يصل رد يحتاج قرارًا بشريًا كطلب خصم أو اعتراض تعاقدي، يرسل فلق تنبيهًا فوريًا لموظف المبيعات المسؤول عن هذا العميل تحديدًا، مرفقًا بملخص كامل لما حدث: تاريخ الإرسال، عدد مرات الفتح، وتصنيف آخر رد. بهذا يدخل الموظف المحادثة وهو يعرف بالضبط أين توقف العميل، دون الحاجة لمراجعة السجل من البداية."
          }
        ]
      },
      "contrast": {
        "label": "الفرق الحقيقي",
        "headline": "ماذا يحدث لنفس عرض السعر، في الحالتين؟",
        "lead": "نفس العرض، نفس العميل — لكن مسارين مختلفين تمامًا في النتيجة.",
        "withoutLabel": "بدون فلق AI",
        "withLabel": "مع فلق AI",
        "without": ["العرض يُسجَّل في CRM", "لا توجد متابعة تلقائية", "العميل ينسى الرد على العرض", "الصفقة تُفقد بصمت"],
        "withoutNote": "لا تنبيه لأي أحد، ولا سبب واضح لفقدان الصفقة — وربما يكون العميل قد ذهب بالفعل لمنافس أسرع.",
        "with": [
          "العرض يُسجَّل في CRM",
          "متابعة تلقائية فورية",
          "تصنيف رد العميل تلقائيًا",
          "تنبيه فريق المبيعات في الوقت المناسب",
          "تحديث الصفقة في CRM"
        ],
        "withNote": "صفقة جديدة مغلقة بنجاح — دون أي جهد يدوي من فريقك."
      },
      "reporting": {
        "label": "الرؤية الكاملة",
        "headline": "لوحة متابعة تكشف أين تتسرب صفقاتك",
        "lead": "كل عرض، كل رد، كل سبب توقف — في مكان واحد يحدَّث لحظيًا.",
        "panelTitle": "لوحة متابعة العروض",
        "metrics": ["العروض المرسلة", "العروض المفتوحة", "بلا رد", "مقبولة", "مرفوضة"]
      },
      "deliverables": {
        "label": "ما تحصل عليه",
        "headline": "نظام متابعة جاهز، لا مجرد أداة",
        "lead": "كل ما تحتاجه لتحويل عروض الأسعار إلى صفقات مغلقة.",
        "items": [
          "Workflow متابعة مرتبط بمرحلة عرض السعر",
          "قوالب متابعة مخصصة حسب حالة كل عميل",
          "تصنيف تلقائي لأسباب التردد والاعتراضات",
          "إشعارات فورية لحظة ظهور نية الشراء",
          "تقرير أسباب خسارة العروض ومعدل التحويل",
          "تحديث تلقائي لمراحل الصفقة داخل الـCRM",
          "تنبيه للعروض المقتربة من انتهاء صلاحيتها",
          "إمكانية إيقاف المتابعة يدويًا لأي عميل"
        ]
      },
      "faq": {
        "label": "أسئلة شائعة",
        "headline": "كل ما تحتاج معرفته قبل البدء",
        "items": [
          {
            "q": "هل يمكن للوكيل تقديم خصم دون علمي؟",
            "a": "أبدًا. الوكيل لا يقدّم خصمًا ولا يعدّل السعر أو نطاق الخدمة من تلقاء نفسه — أي طلب من هذا النوع يُحوَّل مباشرة لموظف المبيعات المخوّل."
          },
          {
            "q": "ماذا لو لم يرد العميل إطلاقًا؟",
            "a": "ينفّذ النظام تسلسل متابعة متدرج (تأكيد، استفسار، سبب التأخير) ثم ينقل الصفقة لحالة غير نشطة مع تنبيه للموظف المسؤول — لا تضيع الصفقة بصمت."
          },
          {
            "q": "هل يمكن إيقاف المتابعة لعميل معيّن؟",
            "a": "نعم، بضغطة واحدة من لوحة المتابعة، ويتوقف النظام فورًا عن إرسال أي رسالة جديدة لهذا العميل."
          },
          {
            "q": "كيف تُصنَّف ردود العملاء؟",
            "a": "يحلل النظام الرد ويصنّفه (موافق، يحتاج تعديلًا، السعر مرتفع، يقارن بمنافس، يريد مكالمة، رفض...) وينفّذ الإجراء المناسب لكل حالة تلقائيًا."
          },
          {
            "q": "هل تُسجَّل كل المتابعات في نظام CRM الخاص بي؟",
            "a": "نعم، كل رسالة وكل رد وكل قرار يُسجَّل بالكامل في الـCRM المتصل، مع سجل زمني قابل للمراجعة في أي وقت."
          },
          {
            "q": "ما الذي لا يشمله النظام افتراضيًا؟",
            "a": "تصميم عروض الأسعار من الصفر، التفاوض الكامل بدل الموظف، اعتماد الخصومات أو الشروط القانونية، وتوقيع العقود نيابة عنك — هذه قرارات تبقى بين يديك دائمًا."
          }
        ]
      },
      "engage": {
        "label": "ابدأ الآن",
        "headline": "جاهز توقف تسريب صفقاتك؟",
        "lead": "عبّئ النموذج وسيتواصل معك فريقنا خلال وقت قصير لبدء تركيب النظام على عروض أسعارك الحالية.",
        "points": ["لا حاجة لتغيير نظامك الحالي", "إعداد وتدريب لفريق المبيعات", "لوحة متابعة كاملة من اليوم الأول"]
      }
    },
    "en": {
      "hero": {
        "eyebrow": "AI Follow-up Agent for Sales Quotes — B2B",
        "headline": "AI quote follow-up automation that turns silence into sales opportunities",
        "brief": "Falaq connects to your quoting system and CRM, sends follow-ups matched to the deal stage, classifies replies and objections, and alerts the sales owner when buying intent or a human decision appears.",
        "sub": "The workflow prevents quotes from disappearing after they are sent. It logs delivery and opens, stops messages as soon as the client replies, and tracks hesitation such as price, internal approval, or requested changes without offering discounts or changing terms on its own.",
        "primary": "Get This Service Now",
        "secondary": "See how it works",
        "scroll": "Scroll down"
      },
      "rules": {
        "label": "Why Falaq",
        "headline": "Automation that acts like your best sales rep",
        "lead": "Not random messages — a system that understands every deal stage and acts within clear permissions.",
        "items": [
          {
            "num": "01",
            "title": "Never decides on your behalf",
            "text": "No discount, no price change, no scope change without your approval."
          },
          {
            "num": "02",
            "title": "Hands off at the right moment",
            "text": "On a call request or sensitive objection, the deal routes instantly to the right sales rep."
          },
          {
            "num": "03",
            "title": "Everything logged in your CRM",
            "text": "Every message, every reply, every decision — a full, reviewable timeline."
          },
          {
            "num": "04",
            "title": "Stops the moment they reply",
            "text": "As soon as a client responds, the sequence halts — no repeated or conflicting messages."
          }
        ]
      },
      "stages": {
        "label": "How it works",
        "headline": "How automated quote follow-up works from delivery to close",
        "lead": "Five stages log the quote, follow up, classify the response, and involve the sales representative at the right moment.",
        "items": [
          {
            "num": "01",
            "title": "Confirm the send & link the client record",
            "text": "The moment a quote leaves your system, Falaq logs the exact send date and time and automatically links the quote file to the client’s record inside your CRM. At the same time, the client receives a short confirmation message showing the quote arrived safely, with a direct way to ask questions before they start reviewing it. The system also creates an automatic follow-up reminder on the calendar, so nothing depends on a rep remembering to check back."
          },
          {
            "num": "02",
            "title": "Track opens and gauge real interest",
            "text": "If your quoting tool supports open-tracking, Falaq logs the exact moment the client first opens the file, then counts every open after that. One open might just be curiosity, but opening a quote three or more times within two days is treated as a genuine buying signal — the system automatically raises that deal’s priority and alerts the responsible rep that the client is reviewing more closely than usual."
          },
          {
            "num": "03",
            "title": "An automatic, staged follow-up sequence",
            "text": "If a set amount of time passes with no reply, Falaq starts a staged sequence instead of one repeated message: a first follow-up confirming the quote arrived clearly, a second asking whether anything needs clarifying, and a third specifically trying to understand the reason for the delay. A final message goes out before the deal is marked inactive. The entire sequence stops instantly, without exception, the moment the client replies."
          },
          {
            "num": "04",
            "title": "Classify the reply and trigger the right action",
            "text": "When the client finally replies, Falaq reads the message and classifies it into known categories: approved, needs changes, price is too high, comparing a competitor’s offer, waiting on internal approval, wants a call, or an outright decline. Based on that classification, the system triggers the matching action right away — sending a case study, booking a call, or logging the objection for review — without ever deciding anything about price or contract terms on its own."
          },
          {
            "num": "05",
            "title": "Alert your sales team at the right moment",
            "text": "The instant a strong buying signal appears, or a reply needs a human decision (like a discount request or a contractual objection), Falaq sends an immediate alert to the specific rep responsible for that client, attached with a full summary: send date, number of opens, and the latest reply classification. The rep walks into the conversation already knowing exactly where things stand, with nothing to dig up first."
          }
        ]
      },
      "contrast": {
        "label": "The real difference",
        "headline": "What happens to the same quote, either way?",
        "lead": "Same quote, same client — two completely different outcomes.",
        "withoutLabel": "Without Falaq AI",
        "withLabel": "With Falaq AI",
        "without": ["Quote logged in CRM", "No automatic follow-up", "Client forgets to reply", "The deal is lost, silently"],
        "withoutNote": "No alert to anyone, no clear reason for the loss — the client may have already gone to a faster competitor.",
        "with": [
          "Quote logged in CRM",
          "Instant automatic follow-up",
          "Reply auto-classified",
          "Sales team alerted at the right time",
          "Deal updated in CRM"
        ],
        "withNote": "A new deal closed successfully — with zero manual effort from your team."
      },
      "reporting": {
        "label": "Full visibility",
        "headline": "A dashboard that shows where deals leak",
        "lead": "Every quote, every reply, every stall reason — in one place, updated live.",
        "panelTitle": "Quote Follow-up Dashboard",
        "metrics": ["Quotes sent", "Opened", "No response", "Accepted", "Rejected"]
      },
      "deliverables": {
        "label": "What you get",
        "headline": "A ready follow-up system, not just a tool",
        "lead": "Everything you need to turn quotes into closed deals.",
        "items": [
          "A follow-up workflow tied to the quote stage",
          "Follow-up templates tailored to each client status",
          "Automatic classification of objections & hesitation",
          "Instant alerts the moment buying intent appears",
          "Loss-reason report and quote-to-deal conversion rate",
          "Automatic deal-stage updates inside your CRM",
          "Alerts for quotes nearing expiry",
          "One-click manual stop for any client"
        ]
      },
      "faq": {
        "label": "FAQ",
        "headline": "Everything you need to know before you start",
        "items": [
          {
            "q": "Can the agent offer a discount without me knowing?",
            "a": "Never. The agent never offers a discount or changes price/scope on its own — any such request routes straight to an authorized sales rep."
          },
          {
            "q": "What if the client never replies?",
            "a": "The system runs a staged sequence (confirm, inquire, probe delay) then marks the deal inactive with an alert to the responsible rep — nothing dies silently."
          },
          {
            "q": "Can I stop follow-up for a specific client?",
            "a": "Yes, one click from the dashboard stops any new message to that client instantly."
          },
          {
            "q": "How are client replies classified?",
            "a": "The system analyzes the reply and classifies it (approved, needs edits, price too high, comparing competitors, wants a call, declined…) then triggers the matching action automatically."
          },
          {
            "q": "Is every follow-up logged in my CRM?",
            "a": "Yes — every message, reply, and decision is fully logged in your connected CRM with a reviewable timeline."
          },
          {
            "q": "What isn’t included by default?",
            "a": "Designing quotes from scratch, full negotiation in place of a rep, approving discounts or legal terms, and signing contracts on your behalf — these decisions always stay with you."
          }
        ]
      },
      "engage": {
        "label": "Start now",
        "headline": "Ready to stop losing deals to silence?",
        "lead": "Fill in the form and our team will reach out shortly to start installing the system on your current quotes.",
        "points": [
          "No need to replace your current system",
          "Setup & training for your sales team",
          "Full dashboard from day one"
        ]
      }
    }
  },

  "booking-recovery": {
    "ar": {
      "hero": {
        "eyebrow": "وكيل ذكاء اصطناعي لاستعادة المكالمات الفائتة وحجز المواعيد — B2B",
        "headline": "وكيل ذكاء اصطناعي للحجوزات واستعادة المكالمات الفائتة",
        "brief": "يرد وكيل فلق على المكالمات الفائتة برسالة فورية، يجمع بيانات العميل، يعرض المواعيد المتاحة، يثبت الحجز في التقويم، ويرسل التأكيد والتذكير تلقائيًا.",
        "sub": "يعمل نظام إدارة الحجوزات على مدار الساعة لمنع ضياع العملاء وتقليل عدم الحضور. يتحقق من التوفر الحقيقي، يمنع الحجز المزدوج، يدعم إعادة الجدولة والإلغاء، ويحوّل الاستثناءات إلى الموظف المختص.",
        "primary": "احصل على هذه الخدمة الآن",
        "secondary": "شاهد كيف يعمل النظام",
        "scroll": "مرر للأسفل"
      },
      "rules": {
        "label": "لماذا فلق",
        "headline": "أتمتة تدير الحجز كأفضل موظف استقبال لديك",
        "lead": "ليست ردودًا عشوائية، بل نظام يتحقق من كل التفاصيل قبل تثبيت أي موعد.",
        "items": [
          {
            "num": "01",
            "title": "يمنع الحجز المزدوج دائمًا",
            "text": "يتحقق من كل الأوقات المتاحة فعليًا قبل التثبيت، فلا يتعارض موعدان على نفس الموظف أو الفرع أبدًا."
          },
          {
            "num": "02",
            "title": "يميّز العميل الجديد عن الحالي",
            "text": "يبحث في قاعدة العملاء فور استقبال أي مكالمة أو رسالة، ليرسل الرد المناسب لتاريخ العميل مع الخدمة."
          },
          {
            "num": "03",
            "title": "لا يتجاوز صلاحياته",
            "text": "لا يعتمد عربونًا أو استثناءً من سياسة الإلغاء من تلقاء نفسه — أي حالة استثنائية تُحوَّل للموظف المختص."
          },
          {
            "num": "04",
            "title": "كل تفاصيل الحجز مسجّلة",
            "text": "كل مكالمة، كل رسالة، وكل تغيير في الموعد يُسجَّل بالكامل ليكون قابلًا للمراجعة في أي وقت."
          }
        ]
      },
      "stages": {
        "label": "كيف يعمل",
        "headline": "كيف يحول وكيل الحجوزات المكالمة الفائتة إلى موعد مؤكد",
        "lead": "خمس مراحل للرد وجمع البيانات والتحقق من التوفر وتثبيت الموعد وتقليل عدم الحضور.",
        "items": [
          {
            "num": "01",
            "title": "استقبال المكالمة الفائتة والرد الفوري",
            "text": "بمجرد تسجيل مكالمة لم يُجب عليها، يستقبل فلق حدث المكالمة فورًا، ويبحث عن رقم المتصل داخل قاعدة العملاء ليحدد إن كان عميلًا جديدًا أو حاليًا. خلال ثوانٍ معدودة، يرسل فلق رسالة تلقائية مناسبة لحالة هذا العميل تحديدًا، ويسأله بلطف عن سبب اتصاله، بدلًا من ترك المكالمة دون أي رد يوحي بالإهمال أو ضعف الاستجابة."
          },
          {
            "num": "02",
            "title": "جمع بيانات الحجز والتحقق من الأوقات المتاحة",
            "text": "بعد أن يرد العميل، يبدأ فلق بجمع بيانات الحجز الأساسية عبر المحادثة: اسم العميل، نوع الخدمة المطلوبة، الفرع، والموظف أو التخصص إن وُجد، إضافة إلى التاريخ والوقت المفضلين. في نفس الوقت، يتحقق النظام من الأوقات المتاحة فعليًا في التقويم، فلا يُعرض على العميل أي وقت غير متاح أصلًا."
          },
          {
            "num": "03",
            "title": "تثبيت الموعد ومنع أي تعارض",
            "text": "بمجرد اختيار العميل لوقت متاح، يمنع فلق أي احتمال لحجز مزدوج على نفس الموظف أو المورد، ويطبّق مدة الخدمة والوقت الفاصل بينها وبين الموعد التالي تلقائيًا. بعدها يثبّت الحجز في تقويم الموظف المعني مباشرة، ويرسل للعميل رسالة تأكيد فورية تتضمن التاريخ والوقت وموقع الفرع."
          },
          {
            "num": "04",
            "title": "متابعة التأكيد والتذكير قبل الموعد",
            "text": "قبل الموعد بوقت مناسب، يرسل فلق تذكيرًا للعميل مع رابط لتأكيد الحضور أو طلب إعادة الجدولة أو الإلغاء. إذا لم يصل أي رد، يعيد فلق التذكير مرة أخرى وينبّه الموظف المختص، ويُحدّث حالة الموعد تلقائيًا في النظام بحسب رد العميل أو غيابه."
          },
          {
            "num": "05",
            "title": "معالجة عدم الحضور تلقائيًا",
            "text": "إذا لم يحضر العميل رغم التأكيد، يسجّل فلق حالة عدم الحضور فورًا، ويرسل رسالة متابعة تعرض موعدًا بديلًا، مع تطبيق سياسة العربون أو التقييد إن كانت معتمدة من قبل العميل. كما يُحتسب سجل عدم الحضور تلقائيًا ليُؤخذ بالاعتبار في أي حجز مستقبلي لهذا العميل."
          }
        ]
      },
      "contrast": {
        "label": "الفرق الحقيقي",
        "headline": "ماذا يحدث لتلك المكالمة الفائتة، في الحالتين؟",
        "lead": "نفس المكالمة، نفس العميل — لكن نتيجتين مختلفتين تمامًا.",
        "withoutLabel": "بدون فلق AI",
        "withLabel": "مع فلق AI",
        "without": ["مكالمة فائتة تصل", "لا يوجد رد فوري", "العميل يتصل بمنافس آخر", "الموعد ذهب لمكان آخر"],
        "withoutNote": "لا أحد يعرف أن هذه المكالمة كانت عميلًا محتملًا — والفرصة ضاعت خلال دقائق معدودة.",
        "with": [
          "مكالمة فائتة تصل",
          "رد تلقائي فوري خلال ثوانٍ",
          "جمع بيانات الحجز والتحقق من الأوقات",
          "تثبيت الموعد ومنع التعارض",
          "تذكير العميل قبل الموعد"
        ],
        "withNote": "موعد مؤكد على التقويم الصحيح — دون أن يفوت فريقك أي مكالمة."
      },
      "reporting": {
        "label": "الرؤية الكاملة",
        "headline": "لوحة متابعة تكشف أداء الحجز والمكالمات",
        "lead": "كل مكالمة، كل حجز، كل تذكير — في مكان واحد يحدَّث لحظيًا.",
        "panelTitle": "لوحة متابعة المواعيد",
        "metrics": ["المكالمات المستعادة", "المواعيد المحجوزة", "لم يحضر", "مؤكدة", "ملغاة"]
      },
      "deliverables": {
        "label": "ما تحصل عليه",
        "headline": "نظام حجز متكامل، لا مجرد تقويم",
        "lead": "كل ما تحتاجه لتحويل كل مكالمة أو رسالة إلى موعد مؤكد.",
        "items": [
          "ربط نظام المكالمات إن كان يوفر التكامل",
          "ربط تقويم واحد أو عدة تقاويم",
          "صفحة أو محادثة حجز كاملة",
          "رسائل تأكيد وتذكير تلقائية",
          "Workflow كامل للإلغاء وإعادة الجدولة",
          "منع الحجز المزدوج بالكامل",
          "قوائم انتظار عند امتلاء المواعيد",
          "لوحة تحليل كاملة لأداء المواعيد"
        ]
      },
      "faq": {
        "label": "أسئلة شائعة",
        "headline": "كل ما تحتاج معرفته قبل البدء",
        "items": [
          {
            "q": "ماذا لو لم تتوفر أي أوقات مناسبة؟",
            "a": "يعرض النظام أقرب الأوقات المتاحة فعليًا، ويمكن إضافة العميل لقائمة انتظار تلقائيًا إذا رغب، لينبّهه فور توفر موعد مناسب."
          },
          {
            "q": "هل يمكن أن يحدث حجز مزدوج بالخطأ؟",
            "a": "لا. يتحقق فلق من كل الأوقات المتاحة قبل أي تثبيت نهائي، ولا يسمح إطلاقًا بحجزين على نفس الموظف أو المورد في نفس الوقت."
          },
          {
            "q": "ماذا يحدث إذا لم يحضر العميل؟",
            "a": "يسجَّل النظام حالة عدم الحضور تلقائيًا، يرسل رسالة متابعة بموعد بديل، ويطبّق سياسة العربون أو التقييد إن كانت معتمدة من العميل مسبقًا."
          },
          {
            "q": "هل يستطيع العميل إلغاء الموعد أو إعادة جدولته بنفسه؟",
            "a": "نعم، عبر رابط مباشر يصل ضمن رسائل التأكيد والتذكير، وضمن مهلة الإلغاء التي يحددها العميل مسبقًا."
          },
          {
            "q": "هل نحتاج نظام اتصالات جديد لتفعيل استعادة المكالمات؟",
            "a": "لا يشمل ذلك افتراضيًا شراء أو تركيب نظام اتصالات جديد؛ يعمل فلق على ربط ما هو متاح لديك بالفعل إن كان يدعم التكامل."
          },
          {
            "q": "ما الذي لا يشمله النظام افتراضيًا؟",
            "a": "إدارة جداول الموظفين نيابة عن العميل، إنشاء بوابة دفع جديدة، وقرارات قبول الحالات العاجلة دون قواعد واضحة متفق عليها مسبقًا."
          }
        ]
      },
      "engage": {
        "label": "ابدأ الآن",
        "headline": "جاهز توقف ضياع كل مكالمة فائتة؟",
        "lead": "عبّئ النموذج وسيتواصل معك فريقنا خلال وقت قصير لبدء تركيب نظام الحجز واستعادة المكالمات.",
        "points": [
          "لا حاجة لتغيير نظام الاتصالات الحالي",
          "إعداد وربط التقويم خلال أيام قليلة",
          "لوحة متابعة كاملة من اليوم الأول"
        ]
      }
    },
    "en": {
      "hero": {
        "eyebrow": "AI Agent for Missed Call Recovery & Booking — B2B",
        "headline": "AI booking agent for appointments and missed-call recovery",
        "brief": "Falaq replies to missed calls instantly, collects customer details, offers available times, books the appointment in the right calendar, and sends confirmations and reminders automatically.",
        "sub": "The booking workflow runs around the clock to recover opportunities and reduce no-shows. It checks real availability, prevents double booking, supports rescheduling and cancellation, and sends exceptions to the responsible employee.",
        "primary": "Get This Service Now",
        "secondary": "See how it works",
        "scroll": "Scroll down"
      },
      "rules": {
        "label": "Why Falaq",
        "headline": "Automation that runs booking like your best receptionist",
        "lead": "Not random replies — a system that checks every detail before locking in an appointment.",
        "items": [
          {
            "num": "01",
            "title": "Never allows double-booking",
            "text": "It checks real availability before confirming, so no two appointments ever clash on the same staff member or resource."
          },
          {
            "num": "02",
            "title": "Knows a new client from a returning one",
            "text": "It searches your client base the instant a call or message comes in, to send the reply that fits that client’s history."
          },
          {
            "num": "03",
            "title": "Never oversteps its permissions",
            "text": "It never approves a deposit or a cancellation exception on its own — exceptions always route to the right staff member."
          },
          {
            "num": "04",
            "title": "Every booking detail is logged",
            "text": "Every call, every message, every change to an appointment is fully logged and reviewable at any time."
          }
        ]
      },
      "stages": {
        "label": "How it works",
        "headline": "How the AI booking agent turns a missed call into a confirmed appointment",
        "lead": "Five stages reply, collect details, check availability, confirm the booking, and reduce no-shows.",
        "items": [
          {
            "num": "01",
            "title": "Catch the missed call and reply instantly",
            "text": "The moment a call goes unanswered, Falaq picks up the event immediately and looks up the caller’s number in your client base to tell whether it’s a new caller or an existing client. Within seconds, Falaq sends a tailored automatic message and politely asks the reason for the call — instead of leaving it unanswered, which reads as neglect."
          },
          {
            "num": "02",
            "title": "Collect booking details and check real availability",
            "text": "Once the client replies, Falaq starts collecting the essentials through the conversation: name, requested service, branch, and staff member or specialty if relevant, plus a preferred date and time. At the same time, it checks actual calendar availability, so the client is never shown a slot that isn’t really open."
          },
          {
            "num": "03",
            "title": "Lock in the appointment and prevent any clash",
            "text": "The moment the client picks an available slot, Falaq rules out any chance of double-booking the same staff member or resource, and automatically applies the service duration plus any buffer time before the next appointment. It then locks the booking straight into that staff member’s calendar and sends the client an instant confirmation with date, time, and branch location."
          },
          {
            "num": "04",
            "title": "Follow up on confirmation and remind before the visit",
            "text": "At the right time before the appointment, Falaq sends a reminder with a link to confirm attendance, reschedule, or cancel. If nothing comes back, Falaq sends the reminder again and alerts the responsible staff member, updating the appointment status automatically based on the client’s reply or silence."
          },
          {
            "num": "05",
            "title": "Handle no-shows automatically",
            "text": "If the client doesn’t show up despite confirming, Falaq logs the no-show immediately, sends a follow-up message offering an alternative slot, and applies the deposit or restriction policy if one is in place. The no-show is also recorded automatically to factor into any future booking from that client."
          }
        ]
      },
      "contrast": {
        "label": "The real difference",
        "headline": "What happens to that missed call, either way?",
        "lead": "Same call, same client — two completely different outcomes.",
        "withoutLabel": "Without Falaq AI",
        "withLabel": "With Falaq AI",
        "without": [
          "A call goes missed",
          "No instant reply",
          "The client calls a competitor instead",
          "The appointment goes elsewhere"
        ],
        "withoutNote": "No one even knows this missed call was a potential client — the opportunity was gone within minutes.",
        "with": [
          "A call goes missed",
          "Instant automatic reply within seconds",
          "Booking details collected & availability checked",
          "Appointment locked in, no clash",
          "Client reminded before the visit"
        ],
        "withNote": "A confirmed appointment on the right calendar — without your team missing a single call."
      },
      "reporting": {
        "label": "Full visibility",
        "headline": "A dashboard that shows how booking is really performing",
        "lead": "Every call, every booking, every reminder — in one place, updated live.",
        "panelTitle": "Booking Follow-up Dashboard",
        "metrics": ["Calls recovered", "Appointments booked", "No-shows", "Confirmed", "Cancelled"]
      },
      "deliverables": {
        "label": "What you get",
        "headline": "A complete booking system, not just a calendar",
        "lead": "Everything you need to turn every call or message into a confirmed appointment.",
        "items": [
          "Phone system integration, where supported",
          "One calendar or multiple calendars connected",
          "A full booking page or chat flow",
          "Automatic confirmation & reminder messages",
          "A complete cancel & reschedule workflow",
          "Full double-booking prevention",
          "Waitlists when slots are fully booked",
          "A complete appointment analytics dashboard"
        ]
      },
      "faq": {
        "label": "FAQ",
        "headline": "Everything you need to know before you start",
        "items": [
          {
            "q": "What if there are no suitable slots available?",
            "a": "The system shows the nearest real availability, and can automatically add the client to a waitlist if they want, alerting them the moment a fitting slot opens up."
          },
          {
            "q": "Could a double-booking happen by mistake?",
            "a": "No. Falaq checks real availability before any final confirmation, and never allows two bookings on the same staff member or resource at the same time."
          },
          {
            "q": "What happens if the client doesn’t show up?",
            "a": "The system logs the no-show automatically, sends a follow-up offering an alternative slot, and applies the deposit or restriction policy if the client has one in place."
          },
          {
            "q": "Can the client cancel or reschedule on their own?",
            "a": "Yes, through a direct link included in confirmation and reminder messages, within whatever cancellation window the client has defined."
          },
          {
            "q": "Do we need a new phone system to enable call recovery?",
            "a": "That’s not included by default — buying or installing a new phone system isn’t part of this. Falaq connects to what you already have, where integration is supported."
          },
          {
            "q": "What isn’t included by default?",
            "a": "Managing staff schedules on the client’s behalf, building a new payment gateway, and deciding to accept urgent cases without clear, pre-agreed rules."
          }
        ]
      },
      "engage": {
        "label": "Start now",
        "headline": "Ready to stop losing every missed call?",
        "lead": "Fill in the form and our team will reach out shortly to start setting up your booking and call-recovery system.",
        "points": [
          "No need to replace your current phone system",
          "Calendar setup & connection within days",
          "Full dashboard from day one"
        ]
      }
    }
  },

  "customer-service": {
    "ar": {
      "hero": {
        "eyebrow": "وكيل ذكاء اصطناعي لخدمة العملاء التنفيذية — B2B",
        "headline": "وكيل خدمة عملاء بالذكاء الاصطناعي يحل الطلبات وينفذ الإجراءات",
        "brief": "يفهم وكيل فلق طلب العميل بالعربية أو الإنجليزية، يتحقق من هويته، يبحث في قاعدة المعرفة وبيانات الطلب، ثم ينفذ الإجراء المسموح داخل CRM أو نظام التذاكر والطلبات.",
        "sub": "ليس مجرد Chatbot للأسئلة الشائعة؛ يمكنه إعادة إرسال فاتورة، فتح تذكرة، إنشاء طلب إرجاع أو حجز صيانة ضمن صلاحياتك. الحالات الحساسة والعملاء الغاضبون والقرارات المالية تنتقل إلى موظف الدعم مع ملخص كامل للمحادثة.",
        "primary": "احصل على هذه الخدمة الآن",
        "secondary": "شاهد كيف يعمل النظام",
        "scroll": "مرر للأسفل"
      },
      "rules": {
        "label": "لماذا فلق",
        "headline": "أتمتة تحل الطلب، لا تكتفي بالرد عليه",
        "lead": "ضوابط واضحة على كل إجراء، وقاعدة معرفة كاملة تمنعه من اختراع أي معلومة.",
        "items": [
          {
            "num": "01",
            "title": "لا يعرض بيانات قبل التحقق",
            "text": "يتحقق من هوية العميل أولًا قبل أي عرض لبياناته أو حالة طلبه — لا استثناء."
          },
          {
            "num": "02",
            "title": "لا يخترع سياسة أو معلومة",
            "text": "يستمد كل إجابة من قاعدة معرفة معتمدة فقط: الأسعار، السياسات، شروط الضمان وغيرها."
          },
          {
            "num": "03",
            "title": "ينفّذ ضمن صلاحياتك بدقة",
            "text": "أنت من يحدد أي إجراء يُنفَّذ تلقائيًا، وأيها يحتاج تأكيد العميل أو موافقة موظف."
          },
          {
            "num": "04",
            "title": "يحوّل الحالات الحرجة فورًا",
            "text": "عميل غاضب، شكوى قانونية، أو معلومة حساسة — تتحول المحادثة لموظف الدعم مباشرة."
          }
        ]
      },
      "stages": {
        "label": "كيف يعمل",
        "headline": "كيف يعمل وكيل خدمة العملاء من الرسالة إلى حل الطلب",
        "lead": "خمس مراحل للتحقق من العميل وتصنيف الطلب والبحث في المعرفة وتنفيذ الإجراء أو التصعيد.",
        "items": [
          {
            "num": "01",
            "title": "استقبال الرسالة وتحديد الهوية واللغة",
            "text": "فور وصول رسالة العميل عبر أي قناة، يحدد فلق لغة المحادثة تلقائيًا، ثم يبدأ بتحديد هوية العميل عبر البيانات المتاحة (رقم الهاتف، البريد، أو رقم الطلب). لا تُعرض أي بيانات شخصية أو تفاصيل طلب قبل اكتمال هذا التحقق، حماية لخصوصية العميل ولضمان أن الرد يصل للشخص الصحيح فعلًا."
          },
          {
            "num": "02",
            "title": "تصنيف الطلب وقياس درجة الاستعجال",
            "text": "يحلل فلق نص الرسالة ليحدد نوع الطلب (استفسار أم إجراء)، ويقيس درجة الاستعجال ونبرة العميل في نفس الوقت. هذا التصنيف المبكر يحدد المسار الصحيح للرد فورًا، بدل معاملة كل رسالة بنفس الطريقة بغض النظر عن حساسيتها أو أولويتها الفعلية."
          },
          {
            "num": "03",
            "title": "استرجاع البيانات والبحث في قاعدة المعرفة",
            "text": "بعد التصنيف، يسترجع فلق بيانات العميل وطلباته السابقة ذات الصلة، ثم يبحث داخل قاعدة معرفة منظمة مبنية من سياسات الشركة، الأسئلة المتكررة، شروط الضمان، وأدلة حل المشكلات — ليختار الإجراء أو الإجابة المسموح بها بالضبط لهذه الحالة، دون تخمين أو اختراع معلومة غير موثقة."
          },
          {
            "num": "04",
            "title": "طلب التأكيد وتنفيذ الإجراء المسموح",
            "text": "قبل أي تعديل فعلي على بيانات العميل أو طلبه، يطلب فلق تأكيدًا صريحًا منه. بعد التأكيد، ينفّذ الإجراء ضمن الصلاحيات المحددة مسبقًا فقط — سواء كان إعادة إرسال فاتورة، فتح تذكرة، إنشاء طلب إرجاع، أو حجز موعد صيانة — ثم يبلغ العميل فورًا بنتيجة ما تم تنفيذه."
          },
          {
            "num": "05",
            "title": "توثيق النتيجة وتقييم العميل والتصعيد عند الحاجة",
            "text": "بعد إبلاغ العميل، يوثّق فلق العملية كاملة بالتفصيل، ويطلب تقييمًا مختصرًا لتجربته. إذا فشل الإجراء أو كانت الحالة تحتاج قرارًا خارج صلاحيات الوكيل — تعويض، شكوى قانونية، أو عميل غاضب — تُصعَّد المحادثة فورًا لموظف الدعم المختص مع كامل السياق."
          }
        ]
      },
      "contrast": {
        "label": "الفرق الحقيقي",
        "headline": "ماذا يحدث لطلب ذلك العميل، في كلتا الحالتين؟",
        "lead": "نفس الرسالة، نفس العميل — لكن تجربتين مختلفتين تمامًا.",
        "withoutLabel": "بدون فلق AI",
        "withLabel": "مع فلق AI",
        "without": [
          "رسالة عميل تصل",
          "رد عام لا يحل شيئًا",
          "تكرار الطلب على أكثر من موظف",
          "العميل يفقد الثقة ويترك تقييمًا سلبيًا"
        ],
        "withoutNote": "لا أحد تحقق من هوية العميل أو حالة طلبه الفعلية — الوقت ضاع والثقة معه.",
        "with": [
          "رسالة عميل تصل",
          "تحقق فوري من الهوية والتصنيف",
          "بحث في قاعدة المعرفة واسترجاع البيانات",
          "تنفيذ الإجراء المسموح بعد التأكيد",
          "توثيق النتيجة وتقييم إيجابي"
        ],
        "withNote": "طلب محلول فعليًا خلال دقائق — وسجل كامل موثّق في نظامك."
      },
      "reporting": {
        "label": "الرؤية الكاملة",
        "headline": "لوحة متابعة تكشف أداء خدمة العملاء الفعلي",
        "lead": "كل محادثة، كل إجراء، كل تصعيد — في مكان واحد يحدَّث لحظيًا.",
        "panelTitle": "لوحة متابعة طلبات الدعم",
        "metrics": ["إجمالي المحادثات", "محلولة من أول تواصل", "محوّلة لموظف", "رضا العملاء", "إجراءات فاشلة"]
      },
      "deliverables": {
        "label": "ما تحصل عليه",
        "headline": "وكيل دعم تنفيذي، لا مجرد Chatbot للإجابات",
        "lead": "كل ما تحتاجه لحل الطلبات المتكررة تلقائيًا وتحويل الحساس منها لموظفك.",
        "items": [
          "وكيل دعم يعمل عبر عدة قنوات معًا",
          "قاعدة معرفة منظمة من سياساتك الفعلية",
          "نظام تصنيف وتوزيع التذاكر تلقائيًا",
          "ربط مباشر مع CRM أو نظام الطلبات لديك",
          "نظام تحقق من هوية العميل قبل أي إجراء",
          "تحويل فوري لموظف عند الحاجة مع كامل السياق",
          "ملخص تلقائي لكل حالة ولوحة مراقبة كاملة",
          "تقارير أسباب التواصل وتقييم رضا العملاء"
        ]
      },
      "faq": {
        "label": "أسئلة شائعة",
        "headline": "كل ما تحتاج معرفته قبل البدء",
        "items": [
          {
            "q": "هل يعرض الوكيل بيانات العميل دون تحقق؟",
            "a": "أبدًا. لا تُعرض أي بيانات أو تفاصيل طلب قبل التحقق الكامل من هوية العميل — هذا شرط أساسي غير قابل للتجاوز في كل محادثة."
          },
          {
            "q": "ماذا لو كان طلب العميل خارج صلاحيات الوكيل؟",
            "a": "تُحوَّل الحالة فورًا لموظف الدعم المختص مع ملخص كامل للمحادثة والسياق، دون أن يضطر العميل لإعادة شرح مشكلته من الصفر."
          },
          {
            "q": "هل يمكن أن يتخذ الوكيل قرار تعويض مالي بنفسه؟",
            "a": "لا. قرارات التعويض المالي أو القانونية تبقى دائمًا خارج صلاحيات الوكيل ما لم تُحدَّد قواعد واضحة ومعتمدة منك مسبقًا لكل حالة."
          },
          {
            "q": "من أين يستمد الوكيل إجاباته؟",
            "a": "فقط من قاعدة معرفة منظمة تبنيها من سياساتك الفعلية: الأسعار المعتمدة، شروط الضمان، سياسات الاسترجاع، وأدلة حل المشكلات — لا يخترع أي معلومة غير موثقة."
          },
          {
            "q": "هل تُسجَّل كل الإجراءات التي ينفذها الوكيل؟",
            "a": "نعم، كل إجراء وكل قرار يُسجَّل بالكامل مع سياق المحادثة، ليكون قابلًا للمراجعة من فريقك في أي وقت."
          },
          {
            "q": "ما الذي لا يشمله النظام افتراضيًا؟",
            "a": "اتخاذ قرارات تعويض دون قواعد معتمدة، التعامل القانوني مع النزاعات، الوصول إلى بيانات غير مصرح بها، وبناء نظام ERP أو CRM كامل من الصفر."
          }
        ]
      },
      "engage": {
        "label": "ابدأ الآن",
        "headline": "جاهز تحل طلبات عملائك بدل تأجيلها؟",
        "lead": "عبّئ النموذج وسيتواصل معك فريقنا خلال وقت قصير لبدء تركيب وكيل خدمة العملاء التنفيذي.",
        "points": ["يعمل على قنواتك الحالية كما هي", "صلاحيات مخصصة بالكامل لكل إجراء", "لوحة متابعة كاملة من اليوم الأول"]
      }
    },
    "en": {
      "hero": {
        "eyebrow": "AI Agent for Executive Customer Service Resolution — B2B",
        "headline": "AI customer service agent that resolves requests and executes actions",
        "brief": "Falaq understands customer requests in Arabic or English, verifies identity, searches your knowledge base and order data, then performs the permitted action inside your CRM, help desk, or order system.",
        "sub": "It is more than an FAQ chatbot. The agent can resend an invoice, open a ticket, create a return request, or book maintenance within your permissions. Sensitive cases, angry customers, and financial decisions move to a support employee with the full conversation summary.",
        "primary": "Get This Service Now",
        "secondary": "See how it works",
        "scroll": "Scroll down"
      },
      "rules": {
        "label": "Why Falaq",
        "headline": "Automation that resolves the request, not just answers it",
        "lead": "Clear controls on every action, and a full knowledge base that stops it from ever inventing an answer.",
        "items": [
          {
            "num": "01",
            "title": "Never shows data before verification",
            "text": "It verifies the customer’s identity first, before showing any data or order status — no exceptions."
          },
          {
            "num": "02",
            "title": "Never invents a policy or fact",
            "text": "Every answer comes strictly from an approved knowledge base: pricing, policies, warranty terms, and more."
          },
          {
            "num": "03",
            "title": "Executes strictly within your permissions",
            "text": "You decide exactly which actions run automatically, which need customer confirmation, and which need staff approval."
          },
          {
            "num": "04",
            "title": "Escalates critical cases instantly",
            "text": "An angry customer, a legal complaint, or sensitive information — the conversation routes straight to a support agent."
          }
        ]
      },
      "stages": {
        "label": "How it works",
        "headline": "How the AI customer service agent moves from message to resolution",
        "lead": "Five stages verify the customer, classify the request, search approved knowledge, execute an action, or escalate the case.",
        "items": [
          {
            "num": "01",
            "title": "Receive the message, verify identity and language",
            "text": "The moment a customer message arrives on any channel, Falaq detects the conversation language automatically, then begins verifying the customer’s identity using available data (phone number, email, or order number). No personal data or order detail is shown before this verification is complete — protecting customer privacy and making sure the reply reaches the right person."
          },
          {
            "num": "02",
            "title": "Classify the request and gauge urgency",
            "text": "Falaq analyzes the message to determine the request type (an inquiry or an action), while measuring urgency and reading the customer’s tone at the same time. This early classification sets the right path for the reply immediately, instead of treating every message the same regardless of its actual sensitivity or priority."
          },
          {
            "num": "03",
            "title": "Retrieve records and search the knowledge base",
            "text": "After classification, Falaq retrieves the customer’s relevant data and past orders, then searches an organized knowledge base built from company policies, FAQs, warranty terms, and troubleshooting guides — to select exactly the action or answer permitted for this case, without guessing or inventing anything undocumented."
          },
          {
            "num": "04",
            "title": "Ask for confirmation, then execute the permitted action",
            "text": "Before making any real change to a customer’s data or order, Falaq asks for explicit confirmation. Once confirmed, it executes strictly within the pre-defined permissions — whether that’s resending an invoice, opening a ticket, creating a return request, or booking a maintenance visit — then informs the customer of the outcome right away."
          },
          {
            "num": "05",
            "title": "Log the outcome, ask for a rating, escalate if needed",
            "text": "After informing the customer, Falaq documents the entire interaction in detail and asks for a brief rating of the experience. If the action fails, or the case needs a decision outside the agent’s permissions — compensation, a legal complaint, or an angry customer — the conversation escalates instantly to the right support agent with full context."
          }
        ]
      },
      "contrast": {
        "label": "The real difference",
        "headline": "What happens to that customer’s request, either way?",
        "lead": "Same message, same customer — two completely different experiences.",
        "withoutLabel": "Without Falaq AI",
        "withLabel": "With Falaq AI",
        "without": [
          "A customer message arrives",
          "A generic reply that resolves nothing",
          "The request repeats across several agents",
          "The customer loses trust and leaves a negative rating"
        ],
        "withoutNote": "No one verified the customer’s identity or their real order status — time was lost, and so was the trust.",
        "with": [
          "A customer message arrives",
          "Instant identity check and classification",
          "Knowledge base search and record retrieval",
          "Permitted action executed after confirmation",
          "Outcome logged and a positive rating"
        ],
        "withNote": "A request actually resolved within minutes — with a full record logged in your system."
      },
      "reporting": {
        "label": "Full visibility",
        "headline": "A dashboard that shows how support is really performing",
        "lead": "Every conversation, every action, every escalation — in one place, updated live.",
        "panelTitle": "Support Requests Dashboard",
        "metrics": [
          "Total conversations",
          "Resolved on first contact",
          "Escalated to staff",
          "Customer satisfaction",
          "Failed actions"
        ]
      },
      "deliverables": {
        "label": "What you get",
        "headline": "An executive support agent, not just an answering chatbot",
        "lead": "Everything you need to resolve repetitive requests automatically and escalate sensitive ones to your team.",
        "items": [
          "A support agent working across multiple channels at once",
          "A knowledge base organized from your actual policies",
          "Automatic ticket classification and routing",
          "Direct integration with your CRM or order system",
          "A customer identity verification system before any action",
          "Instant handoff to staff with full context, when needed",
          "An automatic case summary and a full monitoring dashboard",
          "Contact-reason reports and customer satisfaction ratings"
        ]
      },
      "faq": {
        "label": "FAQ",
        "headline": "Everything you need to know before you start",
        "items": [
          {
            "q": "Does the agent show customer data without verification?",
            "a": "Never. No data or order detail is shown before the customer’s identity is fully verified — this is a non-negotiable rule in every conversation."
          },
          {
            "q": "What if the request is outside the agent’s permissions?",
            "a": "The case escalates instantly to the right support agent with a full conversation summary and context, so the customer never has to re-explain their issue from scratch."
          },
          {
            "q": "Can the agent decide on financial compensation by itself?",
            "a": "No. Financial or legal compensation decisions always stay outside the agent’s permissions unless you’ve pre-defined clear, approved rules for that specific case."
          },
          {
            "q": "Where does the agent get its answers from?",
            "a": "Only from an organized knowledge base built from your actual policies: approved pricing, warranty terms, return policies, and troubleshooting guides — it never invents undocumented information."
          },
          {
            "q": "Is every action the agent takes logged?",
            "a": "Yes, every action and every decision is fully logged with conversation context, reviewable by your team at any time."
          },
          {
            "q": "What isn’t included by default?",
            "a": "Making compensation decisions without approved rules, legal handling of disputes, access to unauthorized data, and building a full ERP or CRM system from scratch."
          }
        ]
      },
      "engage": {
        "label": "Start now",
        "headline": "Ready to resolve customer requests instead of delaying them?",
        "lead": "Fill in the form and our team will reach out shortly to start setting up your executive customer service agent.",
        "points": [
          "Works on your existing channels as-is",
          "Fully custom permissions for every action",
          "Full dashboard from day one"
        ]
      }
    }
  },

  "accounts-receivable": {
    "ar": {
      "hero": {
        "eyebrow": "وكيل ذكاء اصطناعي لتحصيل الفواتير المتأخرة — B2B",
        "headline": "أتمتة تحصيل المستحقات ومتابعة الفواتير المتأخرة بالذكاء الاصطناعي",
        "brief": "يربط وكيل فلق بنظام الفواتير أو المحاسبة، يرسل تذكيرات دفع مهنية قبل وبعد الاستحقاق، يسجل وعود الدفع والاعتراضات، ويصعّد الحالات التي تحتاج قرارًا إلى المحاسب.",
        "sub": "يصنف نظام تحصيل المستحقات كل حساب حسب مدة التأخير، ويطبق تسلسل متابعة مختلفًا لكل شريحة مع رابط الدفع وبيانات الفاتورة. تتوقف الرسائل تلقائيًا فور تسجيل السداد، ولا يمنح النظام خصمًا أو تمديدًا دون موافقة معتمدة.",
        "primary": "احصل على هذه الخدمة الآن",
        "secondary": "شاهد كيف يعمل النظام",
        "scroll": "مرر للأسفل"
      },
      "rules": {
        "label": "لماذا فلق",
        "headline": "أتمتة تحصّل المستحقات، لا تكتفي بالتذكير بها",
        "lead": "نبرة مهنية ثابتة، وضوابط واضحة على كل رسالة وكل إجراء تصعيد.",
        "items": [
          {
            "num": "01",
            "title": "لا تهديد ولا لهجة عدائية",
            "text": "كل رسالة تحصيل تبقى مهنية بحتة، مهما طالت مدة التأخير أو تكررت المتابعة."
          },
          {
            "num": "02",
            "title": "لا يقرر خصمًا أو تمديدًا بنفسه",
            "text": "أي تنازل عن مبلغ أو تمديد لموعد السداد يحتاج صلاحية معتمدة من المحاسب مسبقًا."
          },
          {
            "num": "03",
            "title": "يتوقف فور السداد",
            "text": "ما إن تُسجَّل الدفعة حتى تتوقف كل رسائل المتابعة تلقائيًا — بلا استثناء."
          },
          {
            "num": "04",
            "title": "يحوّل أي اعتراض للمحاسب فورًا",
            "text": "اعتراض على مبلغ أو فاتورة يوقف التصعيد التلقائي وينقل الحالة كاملة لمسؤول الحسابات."
          }
        ]
      },
      "stages": {
        "label": "كيف يعمل",
        "headline": "كيف تعمل أتمتة تحصيل المستحقات من الفاتورة إلى السداد",
        "lead": "خمس مراحل لإرسال الفاتورة وتصنيف التأخير ومتابعة الدفع وإدارة الاعتراضات والتصعيد.",
        "items": [
          {
            "num": "01",
            "title": "إرسال الفاتورة والتأكد من وصولها",
            "text": "فور اعتماد الفاتورة، يرسلها فلق للعميل مرفقة برقمها وقيمتها وتاريخ استحقاقها ورابط دفع مباشر، ثم يتأكد من وصولها فعليًا. أي استفسار بسيط من العميل في هذه المرحلة يُجاب عليه فورًا، دون انتظار موعد الاستحقاق."
          },
          {
            "num": "02",
            "title": "تذكير يوم الاستحقاق وتأكيد نية السداد",
            "text": "في يوم الاستحقاق بالضبط، يرسل فلق تذكيرًا مهنيًا يعرض وسائل الدفع المتاحة ويطلب تأكيد موعد السداد. أي اعتراض يذكره العميل هنا يُسجَّل فورًا بدل تجاهله أو الاستمرار في التذكير كالمعتاد."
          },
          {
            "num": "03",
            "title": "تصنيف الحساب إلى شريحة تأخير وتفعيل التسلسل المناسب",
            "text": "إذا تجاوز الاستحقاق دون سداد، يصنّف فلق الحساب ضمن شرائح واضحة — من يوم إلى 7 أيام، 8 إلى 30، 31 إلى 60، أو أكثر من 60 يومًا — ويطبّق تسلسل رسائل مختلفًا تمامًا لكل شريحة، بدل معاملة كل الحسابات المتأخرة بنفس النبرة والوتيرة."
          },
          {
            "num": "04",
            "title": "إدارة الاعتراضات وتصنيف السبب",
            "text": "عندما يعترض العميل على الفاتورة، يصنّف فلق سبب الاعتراض — مبلغ غير صحيح، خدمة غير مكتملة، فاتورة مكررة، طلب تمديد أو تقسيط، أو غيرها — ويوقف رسائل التصعيد التصاعدية مؤقتًا فور تسجيل الاعتراض، دون اتخاذ أي قرار نيابة عن المحاسب."
          },
          {
            "num": "05",
            "title": "تسجيل وعد الدفع والتصعيد للمحاسب عند الحاجة",
            "text": "إذا وعد العميل بموعد سداد، يسجّله فلق ويذكّره به عند اقترابه. وإذا انتهى وعد الدفع دون تنفيذ، أو كان الحساب يحتاج قرارًا خارج صلاحيات النظام، يُصعَّد فورًا لموظف المحاسبة المختص مع ملخص كامل للحالة."
          }
        ]
      },
      "buckets": {
        "label": "أعمار الديون",
        "headline": "توزيع المستحقات حسب شريحة التأخير",
        "lead": "رؤية فورية لأين تتركز الفواتير المتأخرة، لتوجيه المتابعة أولًا نحو الأخطر.",
        "items": ["غير متأخرة", "متأخر 1–7 أيام", "متأخر 8–30 يومًا", "متأخر 31–60 يومًا", "أكثر من 60 يومًا"]
      },
      "contrast": {
        "label": "الفرق الحقيقي",
        "headline": "ماذا يحدث لتلك الفاتورة المتأخرة، في كلتا الحالتين؟",
        "lead": "نفس الفاتورة، نفس العميل — لكن مصيرين مختلفين تمامًا.",
        "withoutLabel": "بدون فلق AI",
        "withLabel": "مع فلق AI",
        "without": [
          "الفاتورة تتجاوز الاستحقاق",
          "لا متابعة منتظمة",
          "تراكم فواتير متأخرة متعددة",
          "تدفق نقدي متأخر وجهد يدوي ضائع"
        ],
        "withoutNote": "لا أحد صنّف الحساب أو تابعه بجدول واضح — والمبلغ يبقى عالقًا دون سبب مسجَّل.",
        "with": [
          "الفاتورة تتجاوز الاستحقاق",
          "تصنيف فوري حسب شريحة التأخير",
          "تسلسل تذكير مناسب لكل حالة",
          "تسجيل وعد الدفع أو تصعيد للمحاسب",
          "تحصيل موثّق وإيقاف تلقائي بعد السداد"
        ],
        "withNote": "فاتورة محصّلة أو حالة موثّقة بوضوح — وسجل كامل قابل للمراجعة في نظامك."
      },
      "reporting": {
        "label": "الرؤية الكاملة",
        "headline": "لوحة متابعة تكشف أداء التحصيل الفعلي",
        "lead": "كل فاتورة، كل وعد دفع، كل اعتراض — في مكان واحد يحدَّث لحظيًا.",
        "panelTitle": "لوحة متابعة التحصيل",
        "metrics": [
          "إجمالي المستحقات",
          "محصّلة",
          "وعود دفع قائمة",
          "اعتراضات مفتوحة",
          "نسبة التحصيل",
          "غير متأخرة",
          "متأخر 1–7 أيام",
          "متأخر 8–30 يومًا"
        ]
      },
      "deliverables": {
        "label": "ما تحصل عليه",
        "headline": "نظام تحصيل جاهز، لا مجرد رسائل تذكير",
        "lead": "كل ما تحتاجه لتحويل الفواتير المتأخرة إلى نقد محصَّل وموثّق.",
        "items": [
          "ربط مباشر بنظام الفواتير أو المحاسبة",
          "تصنيف تلقائي حسب شرائح التأخير",
          "قوالب رسائل تذكير وتصعيد مخصصة",
          "روابط دفع مرفقة تلقائيًا بكل رسالة",
          "تسجيل وعود الدفع ومتابعتها بموعدها",
          "إيقاف تلقائي للمتابعة فور السداد",
          "لوحة أعمار ديون وتقارير أداء التحصيل",
          "سجل كامل لكل تواصل مع كل عميل"
        ]
      },
      "faq": {
        "label": "أسئلة شائعة",
        "headline": "كل ما تحتاج معرفته قبل البدء",
        "items": [
          {
            "q": "هل يرسل الوكيل تذكيرًا لفاتورة مدفوعة بالفعل؟",
            "a": "لا. يتحقق فلق أولًا من حالة الفاتورة في نظامك المحاسبي قبل إرسال أي رسالة، ولا تُرسل تذكيرات لفواتير مسددة بأي حال."
          },
          {
            "q": "ماذا يحدث عند فتح العميل اعتراضًا على الفاتورة؟",
            "a": "تتوقف رسائل التصعيد التصاعدية فورًا، وتُنقل الحالة كاملة مع سببها إلى المحاسب المختص لمراجعتها والبت فيها."
          },
          {
            "q": "هل يمكن للوكيل منح تمديد أو خصم بنفسه؟",
            "a": "لا. أي تمديد لموعد السداد أو خصم على المبلغ يحتاج صلاحية معتمدة مسبقًا من فريق المحاسبة لكل حالة على حدة."
          },
          {
            "q": "كيف تُصنَّف الحسابات المتأخرة؟",
            "a": "حسب شرائح واضحة: 1–7 أيام، 8–30 يومًا، 31–60 يومًا، وأكثر من 60 يومًا، بالإضافة لحالات خاصة كالنزاع أو العميل الاستراتيجي — ولكل شريحة تسلسل رسائل مختلف."
          },
          {
            "q": "هل تُسجَّل كل الرسائل ووعود الدفع؟",
            "a": "نعم، كل رسالة وكل وعد دفع يُسجَّل بالكامل، وتتطابق لوحة المتابعة مع بيانات نظامك المحاسبي."
          },
          {
            "q": "ما الذي لا يشمله النظام افتراضيًا؟",
            "a": "اتخاذ إجراء قانوني، التواصل العدائي أو التهديد، تسوية النزاعات المالية، ومنح خصومات أو تمديدات دون موافقة معتمدة."
          }
        ]
      },
      "engage": {
        "label": "ابدأ الآن",
        "headline": "جاهز تحصّل مستحقاتك بدل انتظارها؟",
        "lead": "عبّئ النموذج وسيتواصل معك فريقنا خلال وقت قصير لبدء تركيب نظام التحصيل على فواتيرك الحالية.",
        "points": ["يعمل على نظام الفواتير الحالي لديك", "قواعد تصعيد مخصصة لكل شريحة تأخير", "لوحة أعمار ديون من اليوم الأول"]
      }
    },
    "en": {
      "hero": {
        "eyebrow": "AI Agent for Overdue Invoice Collection — B2B",
        "headline": "AI accounts receivable automation for overdue invoice follow-up",
        "brief": "Falaq connects to your invoicing or accounting system, sends professional payment reminders before and after the due date, records promises and disputes, and escalates decisions to accounting.",
        "sub": "The accounts receivable workflow classifies every account by days overdue and applies a different follow-up sequence to each bucket with invoice details and a payment link. Messages stop automatically when payment is recorded, and no discount or extension is granted without approval.",
        "primary": "Get This Service Now",
        "secondary": "See how it works",
        "scroll": "Scroll down"
      },
      "rules": {
        "label": "Why Falaq",
        "headline": "Automation that collects, not just reminds",
        "lead": "A consistently professional tone, with clear controls on every message and every escalation.",
        "items": [
          {
            "num": "01",
            "title": "No threats, no hostile tone",
            "text": "Every collection message stays strictly professional, no matter how long the delay or how many follow-ups it takes."
          },
          {
            "num": "02",
            "title": "Never decides a discount or extension itself",
            "text": "Any waiver of amount or extension of the due date needs pre-approved authority from accounting."
          },
          {
            "num": "03",
            "title": "Stops the moment payment lands",
            "text": "As soon as a payment is logged, every follow-up message stops automatically — no exceptions."
          },
          {
            "num": "04",
            "title": "Routes any dispute to accounting instantly",
            "text": "An objection to an amount or invoice halts automatic escalation and hands the full case to the accounts owner."
          }
        ]
      },
      "stages": {
        "label": "How it works",
        "headline": "How accounts receivable automation moves an invoice to payment",
        "lead": "Five stages deliver the invoice, classify the delay, follow up, manage disputes, and escalate when accounting must decide.",
        "items": [
          {
            "num": "01",
            "title": "Send the invoice and confirm delivery",
            "text": "The moment an invoice is approved, Falaq sends it to the client with its number, amount, due date, and a direct payment link, then confirms it actually arrived. Any simple question from the client at this stage gets an immediate answer, without waiting for the due date."
          },
          {
            "num": "02",
            "title": "Due-date reminder and payment confirmation",
            "text": "On the exact due date, Falaq sends a professional reminder showing available payment methods and asks the client to confirm their payment date. Any objection raised here is logged immediately instead of being ignored or met with another generic reminder."
          },
          {
            "num": "03",
            "title": "Classify the account into a delay bucket and trigger the right sequence",
            "text": "If the due date passes unpaid, Falaq classifies the account into clear buckets — 1 to 7 days, 8 to 30, 31 to 60, or more than 60 days — and applies an entirely different message sequence for each bucket, instead of treating every overdue account with the same tone and pace."
          },
          {
            "num": "04",
            "title": "Manage disputes and classify the reason",
            "text": "When a client disputes an invoice, Falaq classifies the reason — wrong amount, incomplete service, duplicate invoice, a request for an extension or installments, and more — and pauses the escalating follow-up the instant the dispute is logged, without ever deciding anything on accounting’s behalf."
          },
          {
            "num": "05",
            "title": "Log payment promises and escalate to accounting when needed",
            "text": "If the client promises a payment date, Falaq logs it and reminds them as it approaches. If a promise passes unfulfilled, or the account needs a decision outside the system’s permissions, it escalates instantly to the responsible accounting staff with a full case summary."
          }
        ]
      },
      "buckets": {
        "label": "Debt aging",
        "headline": "Receivables broken down by delay bucket",
        "lead": "Instant visibility into where overdue invoices concentrate, so follow-up targets the riskiest first.",
        "items": ["Not overdue", "Overdue 1–7 days", "Overdue 8–30 days", "Overdue 31–60 days", "Over 60 days"]
      },
      "contrast": {
        "label": "The real difference",
        "headline": "What happens to that overdue invoice, either way?",
        "lead": "Same invoice, same client — two completely different outcomes.",
        "withoutLabel": "Without Falaq AI",
        "withLabel": "With Falaq AI",
        "without": [
          "Invoice passes its due date",
          "No regular follow-up",
          "Overdue invoices pile up",
          "Delayed cash flow and wasted manual effort"
        ],
        "withoutNote": "No one classified the account or tracked it on a clear schedule — the amount stays stuck with no logged reason.",
        "with": [
          "Invoice passes its due date",
          "Instantly classified by delay bucket",
          "The matching reminder sequence sent",
          "Payment promise logged or escalated to accounting",
          "Collected and documented, follow-up auto-stopped"
        ],
        "withNote": "The invoice is collected, or the case is clearly documented — with a full, reviewable record in your system."
      },
      "reporting": {
        "label": "Full visibility",
        "headline": "A dashboard that shows how collections are really performing",
        "lead": "Every invoice, every payment promise, every dispute — in one place, updated live.",
        "panelTitle": "Collections Dashboard",
        "metrics": [
          "Total receivables",
          "Collected",
          "Open promises",
          "Open disputes",
          "Collection rate",
          "Not overdue",
          "Overdue 1–7 days",
          "Overdue 8–30 days"
        ]
      },
      "deliverables": {
        "label": "What you get",
        "headline": "A ready collection system, not just reminder messages",
        "lead": "Everything you need to turn overdue invoices into documented, collected cash.",
        "items": [
          "Direct integration with your invoicing or accounting system",
          "Automatic classification by delay bucket",
          "Tailored reminder and escalation templates",
          "Payment links automatically attached to every message",
          "Payment promise logging and follow-up on schedule",
          "Automatic follow-up stop the moment payment lands",
          "An aging dashboard and collection performance reports",
          "A full communication log for every client"
        ]
      },
      "faq": {
        "label": "FAQ",
        "headline": "Everything you need to know before you start",
        "items": [
          {
            "q": "Does the agent remind a client about an already-paid invoice?",
            "a": "Never. Falaq checks the invoice status in your accounting system first, before sending anything — reminders never go out for settled invoices."
          },
          {
            "q": "What happens when a client disputes an invoice?",
            "a": "Escalating follow-up messages stop instantly, and the full case with its reason routes to the responsible accountant for review."
          },
          {
            "q": "Can the agent grant an extension or discount on its own?",
            "a": "No. Any extension or discount needs pre-approved authority from your accounting team for that specific case."
          },
          {
            "q": "How are overdue accounts classified?",
            "a": "Into clear buckets: 1–7 days, 8–30 days, 31–60 days, and 60+ days, plus special cases like disputes or strategic clients — each bucket gets a different message sequence."
          },
          {
            "q": "Are all messages and payment promises logged?",
            "a": "Yes, every message and payment promise is fully logged, and the dashboard matches your accounting system’s data."
          },
          {
            "q": "What isn’t included by default?",
            "a": "Taking legal action, hostile communication or threats, settling financial disputes, and granting discounts or extensions without approval."
          }
        ]
      },
      "engage": {
        "label": "Start now",
        "headline": "Ready to collect what you’re owed instead of waiting on it?",
        "lead": "Fill in the form and our team will reach out shortly to start setting up the collection system on your current invoices.",
        "points": [
          "Works on your existing invoicing system",
          "Custom escalation rules for every delay bucket",
          "Full aging dashboard from day one"
        ]
      }
    }
  },

  "document-processing": {
    "ar": {
      "hero": {
        "eyebrow": "وكيل ذكاء اصطناعي لمعالجة المستندات والفواتير الواردة",
        "headline": "معالجة المستندات والفواتير بالذكاء الاصطناعي من الاستلام إلى الترحيل",
        "brief": "يستقبل وكيل فلق المستندات من البريد والمجلدات والنماذج، يصنفها، يستخرج الحقول المطلوبة عبر OCR والذكاء الاصطناعي، يتحقق منها، ثم يرحل البيانات إلى ERP أو CRM أو النظام المحاسبي.",
        "sub": "يختصر نظام معالجة المستندات إدخال بيانات فواتير الموردين وأوامر الشراء وعروض الأسعار. يكشف الملفات المكررة والحقول الناقصة، يمنح كل حقل درجة ثقة، ويرسل القيم المنخفضة أو المتعارضة إلى مراجعة بشرية قبل اعتمادها.",
        "primary": "احصل على هذه الخدمة الآن",
        "secondary": "شاهد كيف يعمل النظام",
        "scroll": "مرر للأسفل"
      },
      "pressures": [
        "فواتير الموردين",
        "عروض الأسعار",
        "أوامر الشراء",
        "إيصالات",
        "عقود",
        "طلبات عملاء",
        "نماذج تسجيل",
        "كشوف حساب",
        "تقارير",
        "شهادات",
        "مستندات شحن",
        "نماذج تأمين",
        "ملفات PDF وصور ممسوحة"
      ],
      "rules": {
        "label": "لماذا فلق",
        "headline": "معالجة مستندات تتحقق قبل أن تعتمد، لا مجرد قراءة آلية",
        "lead": "ضوابط واضحة على كل حقل مستخرج، وعلى كل قرار اعتماد أو تصعيد.",
        "items": [
          {
            "num": "01",
            "title": "لا يعتمد حقلاً منخفض الثقة",
            "text": "أي حقل مستخرج بثقة منخفضة يُطلب إدخاله يدويًا بدل اعتماده تلقائيًا."
          },
          {
            "num": "02",
            "title": "يحفظ المستند الأصلي دائمًا",
            "text": "الملف الأصلي يبقى محفوظًا ومؤرشفًا مهما جرى عليه من معالجة أو تصحيح."
          },
          {
            "num": "03",
            "title": "يكتشف التكرار قبل الترحيل",
            "text": "يتحقق من رقم المستند وقيمته قبل تسجيله، فلا تُرحَّل فاتورة مكررة مرتين."
          },
          {
            "num": "04",
            "title": "يتوقف فورًا عند أي تعارض",
            "text": "بيانات متضاربة أو حقول غير مكتملة توقف العملية وتُرسلها لموظف مباشرة."
          }
        ]
      },
      "stages": {
        "label": "رحلة المستند",
        "headline": "كيف تعمل معالجة المستندات الذكية من الاستخراج إلى النظام",
        "lead": "خمس مراحل لاستقبال المستند وتصنيفه واستخراج البيانات والتحقق منها وترحيلها بشكل موثق.",
        "items": [
          {
            "num": "01",
            "title": "الاستقبال من أي قناة",
            "text": "يستقبل فلق المستند من البريد الإلكتروني، Google Drive، OneDrive، SharePoint، نموذج رفع، واتساب، نظام ERP، أو ماسح ضوئي مرتبط بمجلد — دون الحاجة لتوحيد قناة الاستقبال."
          },
          {
            "num": "02",
            "title": "التصنيف",
            "text": "يحدد فلق نوع المستند والمورد أو الجهة واللغة وعدد الصفحات وجودة الملف، ويتحقق إن كان مكررًا أو يحتاج معالجة خاصة قبل الانتقال للاستخراج."
          },
          {
            "num": "03",
            "title": "استخراج البيانات",
            "text": "يستخرج فلق كل حقل ذي صلة — اسم المورد، رقم الفاتورة، التواريخ، رقم أمر الشراء، البنود، الضريبة، الإجمالي — ويمنح كل حقل درجة ثقة مستقلة."
          },
          {
            "num": "04",
            "title": "التحقق",
            "text": "يطبّق فلق قواعد التحقق: هل المورد مسجل؟ هل الإجمالي يطابق البنود؟ هل أمر الشراء موجود؟ هل توجد حقول ناقصة؟ — ويعلّم كل حالة بوضوح."
          },
          {
            "num": "05",
            "title": "التنفيذ",
            "text": "بحسب نتيجة التحقق، يسجّل فلق المستند تلقائيًا، أو ينشئ مسودة مراجعة، أو يرسل طلب موافقة، أو يحوّله للمحاسب — ثم يحفظه في المجلد الصحيح ويربطه بسجل المورد."
          }
        ]
      },
      "tiers": {
        "label": "مستويات الثقة",
        "headline": "كل حقل مستخرج له درجة ثقة، وقرار مختلف بحسبها",
        "lead": "لا يُعامل فلق كل الحقول بنفس الطريقة — الثقة المرتفعة تُعتمد، والمنخفضة تُراجع، والمتعارضة تتوقف.",
        "items": [
          { "name": "ثقة مرتفعة", "text": "يُعتمد الحقل آليًا إذا سمحت السياسة، دون أي تدخل بشري." },
          { "name": "ثقة متوسطة", "text": "يُعرض الحقل على المراجع المختص للتأكيد السريع قبل الاعتماد." },
          { "name": "ثقة منخفضة", "text": "يُطلب إدخال الحقل يدويًا من الموظف المسؤول قبل المتابعة." },
          { "name": "تعارض", "text": "تتوقف العملية بالكامل وتُرسل الحالة لموظف المحاسبة فورًا." }
        ]
      },
      "contrast": {
        "label": "الفرق الحقيقي",
        "headline": "ماذا يحدث لذلك المستند الوارد، في كلتا الحالتين؟",
        "lead": "نفس المستند، نفس المورد — لكن مصيرين مختلفين تمامًا.",
        "withoutLabel": "بدون فلق AI",
        "withLabel": "مع فلق AI",
        "without": ["مستند يصل عبر البريد", "إدخال يدوي لكل حقل", "خطأ أو تكرار غير مكتشف", "تأخير في الترحيل والمراجعة"],
        "withoutNote": "لا أحد تحقق من التكرار أو صحة البيانات — والخطأ يظهر لاحقًا في نظامك المحاسبي.",
        "with": [
          "مستند يصل من أي قناة",
          "تصنيف واستخراج تلقائي للحقول",
          "تحقق فوري وكشف تكرار",
          "تصعيد الحالات منخفضة الثقة فقط",
          "ترحيل موثّق أو تحويل للمراجعة"
        ],
        "withNote": "مستند مُرحّل بدقة أو حالة موثّقة بوضوح — وسجل كامل قابل للمراجعة في نظامك."
      },
      "reporting": {
        "label": "الرؤية الكاملة",
        "headline": "لوحة متابعة تكشف أداء معالجة المستندات فعليًا",
        "lead": "كل مستند، كل استثناء، كل خطأ متكرر — في مكان واحد يحدَّث لحظيًا.",
        "panelTitle": "لوحة متابعة المعالجة",
        "metrics": ["مستندات مستلمة", "معالجة آليًا", "تحتاج مراجعة", "مرفوضة", "دقة الاستخراج"]
      },
      "deliverables": {
        "label": "ما تحصل عليه",
        "headline": "نظام معالجة جاهز، لا مجرد قارئ مستندات",
        "lead": "كل ما تحتاجه لتحويل المستندات الواردة إلى بيانات موثّقة وجاهزة للترحيل.",
        "items": [
          "قناة استقبال مركزية لكل المستندات",
          "مصنف مستندات حسب النوع والمورد",
          "استخراج حقول بدرجة ثقة لكل حقل",
          "قواعد تحقق مخصصة لنوع المستند",
          "كشف تكرار قبل الترحيل",
          "Workflow موافقات حسب حدود الصلاحية",
          "ربط مباشر مع ERP أو النظام المحاسبي",
          "أرشفة آلية وشاشة مراجعة الاستثناءات"
        ]
      },
      "faq": {
        "label": "أسئلة شائعة",
        "headline": "كل ما تحتاج معرفته قبل البدء",
        "items": [
          {
            "q": "ما أنواع المستندات التي يتعامل معها؟",
            "a": "فواتير الموردين، عروض الأسعار، أوامر الشراء، الإيصالات، العقود، طلبات العملاء، كشوف الحساب، وغيرها من ملفات PDF أو الصور الممسوحة — وفق ما يتفق عليه معك."
          },
          {
            "q": "ماذا يحدث لحقل مستخرج بثقة منخفضة؟",
            "a": "لا يُعتمد أبدًا تلقائيًا. يُطلب إدخاله يدويًا من الموظف المختص قبل أي ترحيل."
          },
          {
            "q": "ماذا لو تعارضت بيانات المستند مع النظام؟",
            "a": "تتوقف العملية بالكامل فورًا، وتُرسل الحالة مع كل التفاصيل لموظف المحاسبة للمراجعة والبت فيها."
          },
          {
            "q": "هل يقرأ المستندات ذات الخط اليدوي؟",
            "a": "يحاول ذلك، لكن دقة القراءة اليدوية غير مضمونة بالكامل — الحقول غير الواضحة تُصنَّف بثقة منخفضة وتُحال للمراجعة."
          },
          {
            "q": "هل يحتفظ بالملف الأصلي دائمًا؟",
            "a": "نعم، الملف الأصلي يُحفظ ويُؤرشف دون أي تعديل، بصرف النظر عن أي تصحيح يجري على البيانات المستخرجة."
          },
          {
            "q": "ماذا لو وصل تنسيق مستند جديد لم يسبق تدريب النظام عليه؟",
            "a": "يُصنَّف كحالة خاصة تحتاج معالجة إضافية، ويُحال لموظف المحاسبة لحين اعتماد نمط استخراج له."
          }
        ]
      },
      "engage": {
        "label": "ابدأ الآن",
        "headline": "جاهز توقف المعالجة اليدوية للمستندات الواردة؟",
        "lead": "عبّئ النموذج وسيتواصل معك فريقنا خلال وقت قصير لبدء تركيب نظام المعالجة على مستنداتك الحالية.",
        "points": [
          "يعمل على قنوات الاستقبال الحالية لديك",
          "قواعد تحقق مخصصة لكل نوع مستند",
          "لوحة متابعة ودقة استخراج من اليوم الأول"
        ]
      }
    },
    "en": {
      "hero": {
        "eyebrow": "AI Agent for Incoming Document & Invoice Processing",
        "headline": "AI document and invoice processing from intake to system entry",
        "brief": "Falaq receives documents from email, folders, and forms, classifies them, extracts required fields with OCR and AI, validates the data, then sends it to your ERP, CRM, or accounting system.",
        "sub": "The document processing workflow reduces manual data entry for supplier invoices, purchase orders, and quotes. It detects duplicates and missing fields, assigns confidence to every value, and routes low-confidence or conflicting data for human review before approval.",
        "primary": "Get This Service Now",
        "secondary": "See how it works",
        "scroll": "Scroll down"
      },
      "pressures": [
        "Supplier invoices",
        "Quotes",
        "Purchase orders",
        "Receipts",
        "Contracts",
        "Customer requests",
        "Registration forms",
        "Account statements",
        "Reports",
        "Certificates",
        "Shipping documents",
        "Insurance forms",
        "PDFs & scanned images"
      ],
      "rules": {
        "label": "Why Falaq",
        "headline": "Document processing that verifies before it approves",
        "lead": "Clear controls on every extracted field, and on every approval or escalation decision.",
        "items": [
          {
            "num": "01",
            "title": "Never approves a low-confidence field",
            "text": "Any field extracted with low confidence requires manual entry instead of automatic approval."
          },
          {
            "num": "02",
            "title": "Always keeps the original document",
            "text": "The source file stays preserved and archived no matter what processing or correction happens."
          },
          {
            "num": "03",
            "title": "Catches duplicates before posting",
            "text": "It checks the document number and value before logging it, so an invoice is never posted twice."
          },
          {
            "num": "04",
            "title": "Stops instantly on any conflict",
            "text": "Conflicting data or incomplete fields halt the process and route it straight to a staff member."
          }
        ]
      },
      "stages": {
        "label": "The document journey",
        "headline": "How AI document processing moves from extraction to system entry",
        "lead": "Five stages receive, classify, extract, validate, and post document data with a complete audit trail.",
        "items": [
          {
            "num": "01",
            "title": "Receive from any channel",
            "text": "Falaq receives the document from email, Google Drive, OneDrive, SharePoint, an upload form, WhatsApp, an ERP system, or a scanner linked to a folder — no need to unify the intake channel."
          },
          {
            "num": "02",
            "title": "Classify",
            "text": "Falaq determines the document type, the supplier or party, language, page count, and file quality, and checks whether it’s a duplicate or needs special handling before extraction."
          },
          {
            "num": "03",
            "title": "Extract the data",
            "text": "Falaq extracts every relevant field — supplier name, invoice number, dates, PO number, line items, tax, total — and assigns each field its own confidence score."
          },
          {
            "num": "04",
            "title": "Verify",
            "text": "Falaq applies verification rules: is the supplier registered? Does the total match the line items? Does the purchase order exist? Are any fields missing? — flagging each case clearly."
          },
          {
            "num": "05",
            "title": "Execute",
            "text": "Depending on the verification result, Falaq logs the document automatically, creates a review draft, sends an approval request, or routes it to the accountant — then files it correctly and links it to the supplier record."
          }
        ]
      },
      "tiers": {
        "label": "Confidence levels",
        "headline": "Every extracted field carries a confidence score — and a different decision follows",
        "lead": "Falaq doesn’t treat every field the same — high confidence is approved, low confidence is reviewed, and conflicts stop the process.",
        "items": [
          {
            "name": "High confidence",
            "text": "The field is approved automatically if policy allows, with zero human intervention."
          },
          {
            "name": "Medium confidence",
            "text": "The field is shown to the reviewer for a quick confirmation before approval."
          },
          {
            "name": "Low confidence",
            "text": "Manual entry is required from the responsible staff member before proceeding."
          },
          {
            "name": "Conflict",
            "text": "The process halts entirely and the case is sent to the accounting staff instantly."
          }
        ]
      },
      "contrast": {
        "label": "The real difference",
        "headline": "What happens to that incoming document, either way?",
        "lead": "Same document, same supplier — two completely different outcomes.",
        "withoutLabel": "Without Falaq AI",
        "withLabel": "With Falaq AI",
        "without": [
          "Document arrives by email",
          "Manual entry for every field",
          "Undetected error or duplicate",
          "Delayed posting and review"
        ],
        "withoutNote": "No one checked for duplicates or data accuracy — the error surfaces later in your accounting system.",
        "with": [
          "Document arrives from any channel",
          "Instant classification and field extraction",
          "Immediate verification and duplicate detection",
          "Only low-confidence cases escalated",
          "Documented posting or routed for review"
        ],
        "withNote": "The document is accurately posted, or the case is clearly documented — with a full, reviewable record in your system."
      },
      "reporting": {
        "label": "Full visibility",
        "headline": "A dashboard that shows how document processing is really performing",
        "lead": "Every document, every exception, every recurring error — in one place, updated live.",
        "panelTitle": "Processing Dashboard",
        "metrics": ["Documents received", "Auto-processed", "Needs review", "Rejected", "Extraction accuracy"]
      },
      "deliverables": {
        "label": "What you get",
        "headline": "A ready processing system, not just a document reader",
        "lead": "Everything you need to turn incoming documents into documented, posting-ready data.",
        "items": [
          "A central intake channel for every document",
          "A classifier by document type and supplier",
          "Field extraction with a confidence score per field",
          "Verification rules tailored to each document type",
          "Duplicate detection before posting",
          "An approval workflow by authority limits",
          "Direct integration with your ERP or accounting system",
          "Automatic archiving and an exception review screen"
        ]
      },
      "faq": {
        "label": "FAQ",
        "headline": "Everything you need to know before you start",
        "items": [
          {
            "q": "What document types does it handle?",
            "a": "Supplier invoices, quotes, purchase orders, receipts, contracts, customer requests, account statements, and other PDFs or scanned images — as agreed with you."
          },
          {
            "q": "What happens to a field extracted with low confidence?",
            "a": "It is never approved automatically. It requires manual entry from the responsible staff member before any posting."
          },
          {
            "q": "What if the document data conflicts with the system?",
            "a": "The process halts entirely and instantly, and the case with full details is sent to accounting staff for review."
          },
          {
            "q": "Does it read handwritten documents?",
            "a": "It attempts to, but handwriting accuracy isn’t fully guaranteed — unclear fields are classified as low confidence and routed for review."
          },
          {
            "q": "Does it always keep the original file?",
            "a": "Yes, the original file is preserved and archived unmodified, regardless of any correction made to the extracted data."
          },
          {
            "q": "What if a new document format arrives that the system hasn’t been trained on?",
            "a": "It’s flagged as a special case needing extra handling, and routed to accounting staff until an extraction pattern is approved for it."
          }
        ]
      },
      "engage": {
        "label": "Start now",
        "headline": "Ready to stop manually processing incoming documents?",
        "lead": "Fill in the form and our team will reach out shortly to start setting up the processing system on your current documents.",
        "points": [
          "Works on your existing intake channels",
          "Custom verification rules per document type",
          "A processing dashboard and accuracy reporting from day one"
        ]
      }
    }
  },

  "crm-control": {
    "ar": {
      "hero": {
        "eyebrow": "وكيل ذكاء اصطناعي لتنظيف CRM وضبط مسار المبيعات",
        "headline": "وكيل ذكاء اصطناعي لتنظيف CRM وضبط مسار المبيعات",
        "brief": "ينظف وكيل فلق بيانات العملاء، يوحد أرقام الهاتف والمدن، يكتشف السجلات المكررة، يوزع العملاء المحتملين وفق قواعدك، ويراقب الصفقات التي توقفت بلا نشاط أو متابعة.",
        "sub": "يحافظ نظام إدارة CRM على بيانات مبيعات دقيقة ومحدثة: يكمل الحقول الناقصة، يمنع بقاء Lead بلا مسؤول، ينبه عند تجاوز مهلة الاستجابة، ويقدم للإدارة تقريرًا واضحًا عن العملاء الجدد والصفقات المتوقفة وأداء المتابعة.",
        "primary": "احصل على هذه الخدمة الآن",
        "secondary": "شاهد كيف يعمل النظام",
        "scroll": "مرر للأسفل"
      },
      "pressures": [
        "تكرار العملاء",
        "أرقام غير موحدة",
        "حقول ناقصة",
        "Leads دون مسؤول",
        "صفقات متوقفة",
        "مراحل غير محدثة",
        "مصادر Leads غير معروفة",
        "تقارير مبيعات غير دقيقة",
        "عملاء لم تتم متابعتهم",
        "اختلاف البيانات بين الأنظمة"
      ],
      "rules": {
        "label": "لماذا فلق",
        "headline": "ضبط CRM بقواعد واضحة، لا تنظيف عشوائي",
        "lead": "كل عملية دمج أو حذف أو توزيع تمر بضوابط محددة مسبقًا.",
        "items": [
          {
            "num": "01",
            "title": "لا يحذف سجلاً تلقائيًا",
            "text": "لا يُحذف أي سجل إلا بموافقة صريحة من العميل، وكل حالة غير واضحة تُرسل للمراجعة."
          },
          {
            "num": "02",
            "title": "لا يدمج سجلاً غير مؤكد",
            "text": "عند تشابه سجلين يُحدَّد السجل الرئيسي وتُنقل أنشطته، مع الاحتفاظ بسجل العملية."
          },
          {
            "num": "03",
            "title": "لا يترك Lead بلا مسؤول",
            "text": "كل عميل جديد يُوزَّع فورًا، وأي تأخر في الاستجابة يُصعَّد تلقائيًا دون انتظار."
          },
          {
            "num": "04",
            "title": "يسجل كل تغيير",
            "text": "كل عملية دمج أو توزيع أو تحديث مرحلة تُحفظ في سجل قابل للمراجعة لاحقًا."
          }
        ]
      },
      "stages": {
        "label": "دورة عمل النظام",
        "headline": "كيف يعمل وكيل CRM من تنظيف البيانات إلى مراقبة الصفقات",
        "lead": "خمس مراحل لفحص السجلات وتوحيدها وتوزيع العملاء ومراقبة خط المبيعات وإصدار التقارير.",
        "items": [
          {
            "num": "01",
            "title": "الفحص المستمر",
            "text": "يفحص فلق سجلات CRM باستمرار: صيغ أرقام الهاتف، أسماء المدن، صحة البريد، ويكتشف الحقول الناقصة والسجلات المتشابهة أولاً بأول."
          },
          {
            "num": "02",
            "title": "التوحيد والدمج",
            "text": "يوحّد الصيغ، يحدد نسبة التشابه بين السجلات، ويدمجها وفق سياسة واضحة دون حذف أي نشاط مرتبط."
          },
          {
            "num": "03",
            "title": "التوزيع",
            "text": "يوزّع كل عميل جديد فورًا حسب المنطقة أو القطاع أو عبء العمل الحالي أو نظام Round Robin."
          },
          {
            "num": "04",
            "title": "المراقبة",
            "text": "يراقب الصفقات بلا نشاط، بلا موعد متابعة، أو عروض أسعار بلا رد، ويقترح أو ينفذ إجراء التصحيح المناسب."
          },
          {
            "num": "05",
            "title": "التقرير",
            "text": "يرسل تقريرًا دوريًا للإدارة يتضمن Leads الجديدة، الصفقات المتوقفة، وأداء كل موظف بوضوح."
          }
        ]
      },
      "escalation": {
        "label": "التوزيع والتصعيد",
        "headline": "عميل جديد لا ينتظر — يوزَّع فورًا، ويصعَّد تلقائيًا عند التأخر",
        "lead": "خمس مراحل تعمل تباعًا كلما تجاوز موظف مهلة الاستجابة المتفق عليها.",
        "items": [
          { "title": "إرسال تنبيه", "text": "يصل تنبيه فوري للموظف المسؤول فور تجاوز مهلة الاستجابة." },
          { "title": "إنشاء مهمة", "text": "تُنشأ مهمة متابعة مرتبطة بالعميل في لوحة الموظف مباشرة." },
          { "title": "إبلاغ المدير", "text": "إذا استمر التأخر، يصل إشعار فوري للمدير المباشر بالحالة." },
          { "title": "إعادة التوزيع", "text": "عند السماح بذلك، يُعاد توزيع العميل على موظف آخر متاح." },
          { "title": "تسجيل السبب", "text": "يُحفظ سبب إعادة التوزيع في سجل العملية للمراجعة لاحقًا." }
        ]
      },
      "contrast": {
        "label": "الفرق الحقيقي",
        "headline": "ماذا يحدث لذلك العميل الجديد، في كلتا الحالتين؟",
        "lead": "نفس العميل، نفس الفرصة — لكن مصيرين مختلفين تمامًا.",
        "withoutLabel": "بدون فلق AI",
        "withLabel": "مع فلق AI",
        "without": [
          "عميل جديد يصل إلى CRM",
          "يبقى بلا مسؤول لساعات",
          "الصفقة تتعثر دون تنبيه",
          "التقرير الشهري يكشف الخسارة متأخرًا"
        ],
        "withoutNote": "لا أحد لاحظ التأخر — والعميل تواصل مع منافس بينما السجل ينتظر في القائمة.",
        "with": [
          "عميل جديد يصل إلى CRM",
          "يُوزَّع فورًا وفق القواعد",
          "تنبيه تلقائي عند أي تأخر",
          "تصعيد للمدير إذا استمر التأخر",
          "صفقة موثقة وقابلة للمراجعة لحظيًا"
        ],
        "withNote": "العميل تمت متابعته في الوقت المناسب، والصفقة موثقة بكل تفاصيلها داخل CRM."
      },
      "reporting": {
        "label": "الرؤية الكاملة",
        "headline": "لوحة متابعة تكشف صحة CRM فعليًا",
        "lead": "كل سجل، كل تكرار، كل صفقة متوقفة — في مكان واحد يحدَّث لحظيًا.",
        "panelTitle": "لوحة متابعة CRM",
        "metrics": ["سجلات جديدة", "Leads موزَّعة", "Leads غير موزعة", "تكرار مكتشف", "اكتمال البيانات"]
      },
      "exceptions": {
        "label": "حالات خاصة",
        "headline": "حالات لا تُترك لتقدير النظام وحده",
        "lead": "كل حالة استثنائية لها سياسة تعامل واضحة، لا قرار عشوائي.",
        "policyLabel": "سياسة التعامل",
        "items": [
          {
            "title": "عميل تابع لأكثر من موظف",
            "text": "يُحدَّد مسؤول رئيسي واحد بوضوح، وتُسجَّل مشاركة الفريق الآخر دون ازدواج التوزيع."
          },
          { "title": "شركات لها عدة جهات اتصال", "text": "تُربط كل جهة اتصال بسجل الشركة الأم، دون تكرار السجل نفسه." },
          { "title": "نفس الرقم لأكثر من شخص", "text": "يُعلَّم السجل للمراجعة اليدوية بدل الدمج التلقائي." },
          { "title": "عميل سابق عاد من حملة جديدة", "text": "يُربط بسجله التاريخي، ولا يُعامل كعميل جديد بالكامل." },
          {
            "title": "اختلاف بيانات CRM عن نظام المحاسبة",
            "text": "تُرصد الفروقات وتُرسل للمراجعة قبل اعتماد أي تحديث."
          },
          { "title": "موظف في إجازة", "text": "تُعاد صفقاته تلقائيًا لموظف بديل وفق جدول التغطية." },
          { "title": "صفقة مشتركة بين فريقين", "text": "تُسجَّل مساهمة كل فريق دون احتساب مضاعف في التقارير." },
          {
            "title": "دمج قد يؤدي لفقد أنشطة",
            "text": "لا يُنفَّذ الدمج تلقائيًا؛ تُعرض الحالة على موظف لاتخاذ القرار."
          }
        ]
      },
      "deliverables": {
        "label": "ما تحصل عليه",
        "headline": "نظام ضبط جاهز، لا مجرد تنظيف لمرة واحدة",
        "lead": "كل ما تحتاجه لإبقاء CRM منظمًا ومسار المبيعات تحت المراقبة باستمرار.",
        "items": [
          "تدقيق شامل لبيانات CRM",
          "قواعد جودة بيانات مخصصة",
          "نظام كشف تكرار وتشابه",
          "محرك توزيع Leads تلقائي",
          "مراقبة SLA لزمن الاستجابة",
          "تنبيهات للصفقات المتوقفة",
          "تقارير دورية للإدارة",
          "سجل كامل بكل التغييرات"
        ]
      },
      "faq": {
        "label": "أسئلة شائعة",
        "headline": "كل ما تحتاج معرفته قبل البدء",
        "items": [
          {
            "q": "كيف يوزَّع العميل الجديد على الموظفين؟",
            "a": "حسب قواعد متفق عليها مسبقًا: المنطقة، القطاع، عبء العمل الحالي، أو نظام Round Robin — وتُطبَّق فورًا دون تدخل يدوي."
          },
          {
            "q": "ماذا يحدث إذا لم يستجب الموظف خلال المهلة؟",
            "a": "يصل تنبيه له، ثم مهمة، ثم إبلاغ للمدير، وإذا استمر التأخر يُعاد توزيع العميل مع تسجيل السبب."
          },
          {
            "q": "هل يحذف النظام سجلات العملاء تلقائيًا؟",
            "a": "لا. لا يُحذف أي سجل إلا بموافقة صريحة من العميل، وكل حالة غير واضحة تُرسل للمراجعة البشرية."
          },
          {
            "q": "كيف يتعامل مع السجلات المتشابهة؟",
            "a": "يحدد نسبة التشابه، يعرض الحقول المختلفة، يحدد السجل الرئيسي، وينقل الأنشطة المرتبطة قبل أي دمج."
          },
          {
            "q": "ما الذي يراقبه النظام في الصفقات المفتوحة؟",
            "a": "الصفقات بلا نشاط، بلا موعد متابعة، عروض أسعار بلا رد، ومراحل لا تتفق مع النشاط المسجل فعليًا."
          },
          {
            "q": "هل يمكن للمدير إيقاف قاعدة معينة؟",
            "a": "نعم، يمكن إيقاف أي قاعدة أو تعديلها في أي وقت دون التأثير على بقية النظام."
          }
        ]
      },
      "engage": {
        "label": "ابدأ الآن",
        "headline": "جاهز تضبط CRM قبل أن تكلفك الصفقات المتوقفة فرصًا حقيقية؟",
        "lead": "عبّئ النموذج وسيتواصل معك فريقنا خلال وقت قصير لبدء تركيب نظام ضبط CRM على بياناتك الحالية.",
        "points": [
          "يعمل مع CRM الحالي لديك دون استبداله",
          "قواعد توزيع ومراقبة قابلة للتخصيص الكامل",
          "تقارير وصورة يومية لأداء المبيعات من اليوم الأول"
        ]
      }
    },
    "en": {
      "hero": {
        "eyebrow": "AI Agent for CRM Cleanup & Sales Pipeline Control",
        "headline": "AI CRM agent for data cleanup and sales pipeline control",
        "brief": "Falaq cleans customer data, standardizes phone numbers and locations, detects duplicate records, assigns leads according to your rules, and monitors deals with no activity or next step.",
        "sub": "The CRM control workflow keeps sales data accurate and current: it fills missing fields, prevents leads from remaining unassigned, alerts employees when response time is exceeded, and gives management a clear report on new leads, stalled deals, and follow-up performance.",
        "primary": "Get This Service Now",
        "secondary": "See how it works",
        "scroll": "Scroll down"
      },
      "pressures": [
        "Duplicate customers",
        "Inconsistent numbers",
        "Missing fields",
        "Unassigned leads",
        "Stalled deals",
        "Outdated stages",
        "Unknown lead sources",
        "Inaccurate sales reports",
        "Unfollowed customers",
        "Mismatched systems"
      ],
      "rules": {
        "label": "Why Falaq",
        "headline": "CRM control with clear rules, not random cleanup",
        "lead": "Every merge, deletion, or distribution passes through predefined controls.",
        "items": [
          {
            "num": "01",
            "title": "Never auto-deletes a record",
            "text": "No record is deleted without explicit client approval, and every unclear case is sent for review."
          },
          {
            "num": "02",
            "title": "Never merges an unconfirmed match",
            "text": "When two records look similar, the primary record is set and its activities transferred, with a full log kept."
          },
          {
            "num": "03",
            "title": "Never leaves a lead unassigned",
            "text": "Every new customer is distributed instantly, and any delayed response escalates automatically."
          },
          {
            "num": "04",
            "title": "Logs every change",
            "text": "Every merge, distribution, or stage update is saved to a reviewable record."
          }
        ]
      },
      "stages": {
        "label": "The system cycle",
        "headline": "How the AI CRM agent cleans data and monitors the sales pipeline",
        "lead": "Five stages scan and standardize records, assign leads, monitor deal activity, and deliver management reports.",
        "items": [
          {
            "num": "01",
            "title": "Continuous scanning",
            "text": "Falaq continuously scans CRM records — phone formats, city names, email validity — catching missing fields and similar records as they appear."
          },
          {
            "num": "02",
            "title": "Unify & merge",
            "text": "It unifies formats, scores similarity between records, and merges them under a clear policy without losing any linked activity."
          },
          {
            "num": "03",
            "title": "Distribute",
            "text": "Every new customer is distributed instantly by region, sector, current workload, or a round-robin system."
          },
          {
            "num": "04",
            "title": "Monitor",
            "text": "It watches deals with no activity, no follow-up date, or unanswered quotes, and suggests or executes the right correction."
          },
          {
            "num": "05",
            "title": "Report",
            "text": "It sends management a periodic report covering new leads, stalled deals, and each rep’s performance clearly."
          }
        ]
      },
      "escalation": {
        "label": "Distribution & escalation",
        "headline": "A new lead doesn’t wait — distributed instantly, escalated automatically when delayed",
        "lead": "Five stages run in sequence whenever a rep misses the agreed response window.",
        "items": [
          {
            "title": "Send alert",
            "text": "An instant alert reaches the responsible rep the moment the response window is missed."
          },
          {
            "title": "Create task",
            "text": "A follow-up task tied to the customer is created directly on the rep’s board."
          },
          {
            "title": "Notify manager",
            "text": "If the delay continues, an instant notification reaches the direct manager."
          },
          { "title": "Reassign", "text": "When allowed, the customer is reassigned to another available rep." },
          { "title": "Log the reason", "text": "The reassignment reason is saved to the record for later review." }
        ]
      },
      "contrast": {
        "label": "The real difference",
        "headline": "What happens to that new customer, either way?",
        "lead": "Same customer, same opportunity — two completely different outcomes.",
        "withoutLabel": "Without Falaq AI",
        "withLabel": "With Falaq AI",
        "without": [
          "New customer hits the CRM",
          "Stays unassigned for hours",
          "The deal stalls with no alert",
          "The monthly report reveals the loss too late"
        ],
        "withoutNote": "No one noticed the delay — the customer reached out to a competitor while the record waited in the queue.",
        "with": [
          "New customer hits the CRM",
          "Instantly distributed per the rules",
          "Automatic alert on any delay",
          "Escalated to the manager if it continues",
          "Deal documented and reviewable in real time"
        ],
        "withNote": "The customer was followed up on time, and the deal is fully documented in the CRM."
      },
      "reporting": {
        "label": "Full visibility",
        "headline": "A dashboard that shows real CRM health",
        "lead": "Every record, every duplicate, every stalled deal — in one place, updated live.",
        "panelTitle": "CRM Control Dashboard",
        "metrics": ["New records", "Leads distributed", "Unassigned leads", "Duplicates found", "Data completeness"]
      },
      "exceptions": {
        "label": "Special cases",
        "headline": "Cases never left to the system’s judgment alone",
        "lead": "Every exceptional case has a clear handling policy, not a random call.",
        "policyLabel": "Handling policy",
        "items": [
          {
            "title": "A customer tied to more than one rep",
            "text": "One primary owner is clearly set, and the other team’s involvement is logged without duplicate distribution."
          },
          {
            "title": "Companies with multiple contacts",
            "text": "Each contact is linked to the parent company record, without duplicating the record itself."
          },
          {
            "title": "The same number for more than one person",
            "text": "The record is flagged for manual review instead of automatic merging."
          },
          {
            "title": "A past customer returning from a new campaign",
            "text": "Linked to their historical record, not treated as an entirely new customer."
          },
          {
            "title": "CRM data conflicting with the accounting system",
            "text": "Discrepancies are flagged and sent for review before any update is approved."
          },
          {
            "title": "A rep on leave",
            "text": "Their deals are automatically reassigned to a backup rep per the coverage schedule."
          },
          {
            "title": "A deal shared between two teams",
            "text": "Each team’s contribution is logged without double-counting in reports."
          },
          {
            "title": "A merge that could lose activity history",
            "text": "The merge is never auto-executed; the case is shown to a rep to decide."
          }
        ]
      },
      "deliverables": {
        "label": "What you get",
        "headline": "A ready control system, not a one-time cleanup",
        "lead": "Everything you need to keep the CRM organized and the sales pipeline under constant watch.",
        "items": [
          "A full CRM data audit",
          "Custom data quality rules",
          "Duplicate & similarity detection",
          "An automatic lead distribution engine",
          "SLA monitoring for response time",
          "Alerts for stalled deals",
          "Periodic reports for management",
          "A full log of every change"
        ]
      },
      "faq": {
        "label": "FAQ",
        "headline": "Everything you need to know before you start",
        "items": [
          {
            "q": "How is a new customer assigned to reps?",
            "a": "Per pre-agreed rules: region, sector, current workload, or round-robin — applied instantly with no manual step."
          },
          {
            "q": "What happens if a rep misses the response window?",
            "a": "An alert reaches them, then a task, then a manager notification, and if the delay continues the customer is reassigned with the reason logged."
          },
          {
            "q": "Does the system auto-delete customer records?",
            "a": "No. No record is deleted without explicit client approval, and every unclear case is sent for human review."
          },
          {
            "q": "How does it handle similar records?",
            "a": "It scores the similarity, shows the differing fields, sets the primary record, and transfers linked activities before any merge."
          },
          {
            "q": "What does it monitor in open deals?",
            "a": "Deals with no activity, no follow-up date, unanswered quotes, and stages that don’t match the logged activity."
          },
          {
            "q": "Can a manager turn off a specific rule?",
            "a": "Yes, any rule can be paused or adjusted at any time without affecting the rest of the system."
          }
        ]
      },
      "engage": {
        "label": "Start now",
        "headline": "Ready to control your CRM before stalled deals cost you real opportunities?",
        "lead": "Fill in the form and our team will reach out shortly to start setting up CRM control on your existing data.",
        "points": [
          "Works with your existing CRM — no replacement needed",
          "Fully customizable distribution and monitoring rules",
          "Reports and a daily sales picture from day one"
        ]
      }
    }
  }
};

module.exports = { CATEGORIES, SERVICES, SERVICE_PAGES };
