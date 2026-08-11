// Sectors served, taken from the "Ideal Client & Sectors Served" table in
// "FALAQ AI Company Profile final.docx". `firstAgent` is the profile's "usual
// first agent" column and must match a slug in content/services.js.

const SECTORS = [
  {
    slug: "healthcare",
    icon: "health",
    firstAgent: "booking-recovery",
    ar: {
      name: "مقدّمو الرعاية الصحية",
      subtypes: "عيادات · أسنان · مجمّعات طبية · مختبرات",
      title: "المواعيد التي لا تُحضر تكلّف أكثر من المواعيد التي لا تُحجز",
      summary: "حجز المواعيد وتذكيرها، استعادة المتخلفين عن الحضور، استقبال بيانات التأمين والهوية، وأسئلة المريض قبل الزيارة وبعدها.",
      automate: [
        "حجز المواعيد وإرسال التذكيرات قبلها",
        "استعادة المرضى المتخلفين عن الحضور وإعادة جدولتهم",
        "استقبال بيانات التأمين والهوية والتحقق منها",
        "أسئلة المريض قبل الزيارة وبعدها"
      ]
    },
    en: {
      name: "Healthcare providers",
      subtypes: "Clinics · Dental · Polyclinics · Labs",
      title: "An appointment not attended costs more than one never booked",
      summary: "Appointment booking and reminders, no-show recovery, insurance and identification intake, and patient questions before and after visits.",
      automate: [
        "Appointment booking and advance reminders",
        "No-show recovery and rebooking",
        "Insurance and identification intake with validation",
        "Patient questions before and after the visit"
      ]
    }
  },
  {
    slug: "education",
    icon: "education",
    firstAgent: "lead-qualification",
    ar: {
      name: "التعليم",
      subtypes: "مدارس · مراكز تدريب · معاهد",
      title: "موسم القبول يصل دفعة واحدة، والفريق لا",
      summary: "استفسارات القبول ومتابعتها، أوراق التسجيل، تذكيرات الرسوم، التواصل مع أولياء الأمور، وأسئلة المساقات والجداول.",
      automate: [
        "استفسارات القبول والرد عليها ومتابعتها",
        "استكمال أوراق التسجيل والتحقق منها",
        "تذكيرات الرسوم ومتابعة السداد",
        "التواصل مع أولياء الأمور وأسئلة المساقات والجداول"
      ]
    },
    en: {
      name: "Education",
      subtypes: "Schools · Training centres · Institutes",
      title: "Admissions arrive all at once; the team does not",
      summary: "Admissions enquiries and follow-up, enrolment paperwork, fee reminders, parent communication, and course and schedule questions.",
      automate: [
        "Admissions enquiries answered and followed up",
        "Enrolment paperwork completed and validated",
        "Fee reminders and payment follow-up",
        "Parent communication, course and schedule questions"
      ]
    }
  },
  {
    slug: "retail-ecommerce",
    icon: "retail",
    firstAgent: "ecommerce-integration",
    ar: {
      name: "التجزئة والتجارة الإلكترونية",
      subtypes: "متاجر إلكترونية · صالات عرض · موزّعون",
      title: "«وين طلبي؟» سؤال له إجابة دقيقة في نظامك",
      summary: "حالة الطلب والتسليم، أسئلة المنتجات والمخزون، استعادة السلات المتروكة، استقبال طلبات الإرجاع، ومعالجة فواتير الموردين.",
      automate: [
        "حالة الطلب والتسليم من بيانات الشحن الفعلية",
        "أسئلة المنتجات والتوفر والأسعار السارية",
        "استعادة العملاء الذين تركوا سلالهم",
        "استقبال طلبات الإرجاع ومعالجة فواتير الموردين"
      ]
    },
    en: {
      name: "Retail & e-commerce",
      subtypes: "Online stores · Showrooms · Distributors",
      title: "“Where is my order?” has an exact answer inside your system",
      summary: "Order and delivery status, product and stock questions, abandoned-cart recovery, returns intake, and supplier invoice processing.",
      automate: [
        "Order and delivery status from actual shipment data",
        "Product, stock and active-price questions",
        "Abandoned-cart recovery",
        "Returns intake and supplier invoice processing"
      ]
    }
  },
  {
    slug: "restaurants-hospitality",
    icon: "hospitality",
    firstAgent: "booking-pos-integration",
    ar: {
      name: "المطاعم والضيافة",
      subtypes: "مجموعات مطاعم · فنادق · قاعات",
      title: "الحجز والانتظار والمناسبات، دون أن يرن الهاتف مرتين",
      summary: "الحجوزات وقوائم الانتظار، استفسارات المناسبات والضيافة، أسئلة القائمة والمحسّسات، الرد على التقييمات، وعروض الحجوزات الجماعية.",
      automate: [
        "الحجوزات وإدارة قوائم الانتظار",
        "استفسارات المناسبات والضيافة الخارجية",
        "أسئلة القائمة والمكوّنات والمحسّسات",
        "الرد على التقييمات وعروض الحجز الجماعي"
      ]
    },
    en: {
      name: "Restaurants & hospitality",
      subtypes: "Restaurant groups · Hotels · Venues",
      title: "Reservations, waitlists and events without the phone ringing twice",
      summary: "Reservations and waitlists, event and catering enquiries, menu and allergen questions, review responses, and group booking quotations.",
      automate: [
        "Reservations and waitlist management",
        "Event and catering enquiries",
        "Menu, ingredient and allergen questions",
        "Review responses and group booking quotations"
      ]
    }
  },
  {
    slug: "sme-operations",
    icon: "b2b",
    firstAgent: "lead-qualification",
    ar: {
      name: "عمليات المنشآت الصغيرة والمتوسطة",
      subtypes: "عابر للقطاعات · من ١٠ إلى ٢٠٠ موظف",
      title: "العمل المتكرر نفسه، مهما اختلف القطاع",
      summary: "تأهيل العملاء، متابعة العروض، تحصيل المستحقات، نظافة الـ CRM، الاعتمادات الداخلية، والتقارير الدورية.",
      automate: [
        "تأهيل العملاء المحتملين ومتابعة عروض الأسعار",
        "تحصيل المستحقات المتأخرة",
        "نظافة بيانات الـ CRM وتحديثها",
        "الاعتمادات الداخلية والتقارير الدورية"
      ]
    },
    en: {
      name: "SME operations",
      subtypes: "Cross-sector · 10 to 200 staff",
      title: "The same repetitive work, whatever the sector",
      summary: "Lead qualification, quotation follow-up, receivables collection, CRM hygiene, internal approvals, and recurring reporting.",
      automate: [
        "Lead qualification and quotation follow-up",
        "Overdue receivables collection",
        "CRM data hygiene and updates",
        "Internal approvals and recurring reporting"
      ]
    }
  }
];

// Slugs the site used before the profile's sector list was adopted. They are
// redirected rather than deleted so existing links do not 404.
const RETIRED_SLUGS = ["content-teams", "logistics", "real-estate", "sales-marketing"];

module.exports = { SECTORS, RETIRED_SLUGS };
