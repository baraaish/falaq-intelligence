// Inputs and thresholds for the sandbox in assets/agent-sandbox.js.
//
// The engine implements Falaq's four published rules generically, so this file
// carries only what differs per agent: the inputs a visitor can set, the
// threshold, and the wording shown when each rule fires. Keep the wording
// truthful — the panel is a demonstration of the real guardrails, and a rule
// described here as blocking must actually block in the engine.
//
// Scoring: each input contributes `weight` when satisfied. `required` inputs
// are Rule 01 — nothing is scored until all of them are answered.

const RULES = {
  "lead-qualification": {
    threshold: 75,
    inputs: [
      { id: "budget", type: "range", min: 0, max: 200000, step: 10000, value: 0, weight: 30,
        satisfied: "gt0", ar: { label: "الميزانية المعلنة", unit: "دينار", empty: "لم تُذكر" }, en: { label: "Stated budget", unit: "JOD", empty: "not stated" } },
      { id: "timeline", type: "choice", value: "", weight: 30,
        ar: { label: "الجدية الزمنية", empty: "غير محددة", options: [{ v: "month", l: "خلال شهر" }, { v: "quarter", l: "خلال ٣ أشهر" }, { v: "browsing", l: "يتصفح فقط" }] },
        en: { label: "Timing", empty: "not stated", options: [{ v: "month", l: "Within a month" }, { v: "quarter", l: "Within 3 months" }, { v: "browsing", l: "Just browsing" }] } },
      { id: "authority", type: "toggle", value: false, weight: 25,
        ar: { label: "يتحدث صاحب القرار" }, en: { label: "Speaking to the decision maker" } },
      { id: "fit", type: "toggle", value: false, weight: 15,
        ar: { label: "الطلب ضمن ما تقدّمه" }, en: { label: "Request matches what you offer" } },
      { id: "conflict", type: "toggle", value: false, weight: 0, conflict: true,
        ar: { label: "معلومات متناقضة في المحادثة" }, en: { label: "Conflicting information in the conversation" } }
    ],
    required: ["budget", "timeline", "authority"],
    weak: { timeline: ["browsing"] },
    ar: {
      hot: "ساخن", warm: "دافئ", blocked: "لم يُصنَّف",
      actionHot: "يُحوَّل فورًا إلى مندوب بالاسم، أو يُحجز موعد مباشرة",
      actionWarm: "يدخل تسلسل متابعة، ولا يُشغل وقت المبيعات الآن",
      handoffHot: "مندوب المبيعات المسؤول",
      handoffReview: "مراجعة موظف قبل أي تصنيف"
    },
    en: {
      hot: "Hot", warm: "Warm", blocked: "Not scored",
      actionHot: "Routed immediately to a named salesperson, or a time is booked directly",
      actionWarm: "Enters a follow-up sequence without consuming sales time now",
      handoffHot: "The responsible salesperson",
      handoffReview: "Employee review before any scoring"
    }
  },

  "booking-recovery": {
    threshold: 65,
    inputs: [
      { id: "slot", type: "choice", value: "", weight: 40,
        ar: { label: "الوقت المطلوب في نظامك", empty: "لم يُتحقق منه", options: [{ v: "free", l: "شاغر" }, { v: "taken", l: "محجوز" }] },
        en: { label: "Requested time in your system", empty: "not checked", options: [{ v: "free", l: "Free" }, { v: "taken", l: "Taken" }] } },
      { id: "contact", type: "toggle", value: false, weight: 30,
        ar: { label: "رقم تواصل مؤكد" }, en: { label: "Confirmed contact number" } },
      { id: "service", type: "toggle", value: false, weight: 30,
        ar: { label: "نوع الخدمة ومدتها محددان" }, en: { label: "Service type and duration identified" } },
      { id: "conflict", type: "toggle", value: false, weight: 0, conflict: true,
        ar: { label: "تعارض مع حجز قائم" }, en: { label: "Clashes with an existing booking" } }
    ],
    required: ["slot", "contact", "service"],
    weak: { slot: ["taken"] },
    ar: {
      hot: "قابل للحجز", warm: "بديل مطلوب", blocked: "لم يُحجز",
      actionHot: "يُثبَّت الحجز في نظامك مباشرة ويُرسل التأكيد والتذكير",
      actionWarm: "تُعرض أوقات بديلة من التوافر نفسه — لا وعد بوقت غير موجود",
      handoffHot: "يُكتب في نظام الحجز مباشرة",
      handoffReview: "موظف الاستقبال يراجع التعارض"
    },
    en: {
      hot: "Bookable", warm: "Alternative needed", blocked: "Not booked",
      actionHot: "The booking is written into your system with confirmation and reminder",
      actionWarm: "Alternatives are offered from the same availability — never a time that does not exist",
      handoffHot: "Written directly into the booking system",
      handoffReview: "Front desk reviews the clash"
    }
  },

  "ecommerce-integration": {
    threshold: 75,
    inputs: [
      { id: "order", type: "toggle", value: false, weight: 35,
        ar: { label: "رقم الطلب مطابق في المتجر" }, en: { label: "Order number matches in the store" } },
      { id: "identity", type: "toggle", value: false, weight: 35,
        ar: { label: "هوية العميل مؤكدة" }, en: { label: "Customer identity confirmed" } },
      { id: "action", type: "choice", value: "", weight: 30,
        ar: { label: "الإجراء المطلوب", empty: "غير محدد", options: [{ v: "status", l: "استعلام عن الحالة" }, { v: "refund", l: "استرداد أو إلغاء" }] },
        en: { label: "Requested action", empty: "not specified", options: [{ v: "status", l: "Status enquiry" }, { v: "refund", l: "Refund or cancellation" }] } },
      { id: "conflict", type: "toggle", value: false, weight: 0, conflict: true,
        ar: { label: "الإجراء خارج الحدود التي وضعتها" }, en: { label: "Action outside the limits you set" } }
    ],
    required: ["order", "identity", "action"],
    weak: { action: ["refund"] },
    ar: {
      hot: "ينفَّذ", warm: "يحتاج إذنًا", blocked: "لم يُنفَّذ",
      actionHot: "يُنفَّذ الإجراء ويُسجَّل على الطلب الأصلي",
      actionWarm: "الإجراءات المغيّرة للطلب تحتاج تأكيدًا ضمن حدودك المعلنة",
      handoffHot: "يُكتب في المتجر مباشرة",
      handoffReview: "موظف خدمة العملاء يقرر"
    },
    en: {
      hot: "Performed", warm: "Needs authority", blocked: "Not performed",
      actionHot: "The action is performed and recorded against the original order",
      actionWarm: "Order-altering actions require confirmation inside the limits you published",
      handoffHot: "Written directly to the store",
      handoffReview: "A support agent decides"
    }
  },

  "booking-pos-integration": {
    threshold: 65,
    inputs: [
      { id: "availability", type: "choice", value: "", weight: 40,
        ar: { label: "التوافر في نظامك", empty: "لم يُقرأ", options: [{ v: "free", l: "متاح" }, { v: "full", l: "ممتلئ" }] },
        en: { label: "Availability in your system", empty: "not read", options: [{ v: "free", l: "Available" }, { v: "full", l: "Full" }] } },
      { id: "party", type: "toggle", value: false, weight: 30,
        ar: { label: "عدد الأشخاص والمدة محددان" }, en: { label: "Party size and duration set" } },
      { id: "price", type: "toggle", value: false, weight: 30,
        ar: { label: "السعر مقروء من نقطة البيع" }, en: { label: "Price read from the point of sale" } },
      { id: "conflict", type: "toggle", value: false, weight: 0, conflict: true,
        ar: { label: "طلب خاص يحتاج موافقة الإدارة" }, en: { label: "Special request needing manager approval" } }
    ],
    required: ["availability", "party", "price"],
    weak: { availability: ["full"] },
    ar: {
      hot: "يُحجز", warm: "قائمة انتظار", blocked: "لم يُحجز",
      actionHot: "يُكتب الحجز المؤكد في نظامك — جدول واحد للطرفين",
      actionWarm: "يُضاف لقائمة الانتظار ويُعرض عليه أول موعد يُحرَّر",
      handoffHot: "يُكتب في نظام الحجز مباشرة",
      handoffReview: "المدير يوافق على الطلب الخاص"
    },
    en: {
      hot: "Booked", warm: "Waitlisted", blocked: "Not booked",
      actionHot: "The confirmed booking is written into your system — one schedule for both sides",
      actionWarm: "Added to the waitlist and offered the first released slot",
      handoffHot: "Written directly into the booking system",
      handoffReview: "A manager approves the special request"
    }
  }
};

// Shown beside whichever rule fired. These are the four principles published on
// the site, so the panel proves the claim instead of restating it.
const RULE_TEXT = {
  ar: {
    r1: { id: "٠١", name: "لا ينتقل بلا حقول إلزامية", why: "لا يُصنَّف أي عميل قبل جمع الحقول الإلزامية المتفق عليها، مهما بدا مهتمًا." },
    r2: { id: "٠٢", name: "لا يترك حالة ساخنة بلا رد فوري", why: "ما يتجاوز الحد يُحوَّل أو يُنفَّذ مباشرة، دون انتظار دوره في الطابور." },
    r3: { id: "٠٣", name: "لا يقرر بمفرده عند التعارض", why: "عند وجود معلومات متناقضة يُحوَّل الملف لمراجعة موظف بدل تصنيف تلقائي خاطئ." },
    r4: { id: "٠٤", name: "يسجل كل محادثة ومصدر", why: "كل تفاعل ومصدره ودرجته يُحفظ في سجل كامل قابل للمراجعة." }
  },
  en: {
    r1: { id: "01", name: "No scoring without the mandatory fields", why: "No lead is scored before the agreed mandatory fields are collected, however interested it seems." },
    r2: { id: "02", name: "No hot case left without an immediate response", why: "Anything past the threshold is routed or executed at once, without waiting in the queue." },
    r3: { id: "03", name: "No unilateral decision on a conflict", why: "Where information conflicts, the case goes to an employee rather than an incorrect automatic decision." },
    r4: { id: "04", name: "Every conversation and source is logged", why: "Every interaction, its source and its score are kept in a complete, reviewable record." }
  }
};

module.exports = { RULES, RULE_TEXT };
