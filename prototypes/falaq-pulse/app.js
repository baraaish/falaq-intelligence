(function () {
  "use strict";

  var fieldOrder = ["business", "process", "pain", "channel", "volume", "handoff", "systems", "success"];
  var fieldLabels = {
    business: "النشاط",
    process: "العملية",
    pain: "المشكلة",
    channel: "القناة",
    volume: "الحجم",
    handoff: "التسليم",
    systems: "الأنظمة",
    success: "النجاح"
  };

  var scenarios = {
    blocked: {
      variables: {
        business: "عيادة أسنان",
        process: "",
        pain: "مواعيد ضائعة",
        channel: "واتساب",
        volume: "",
        handoff: "",
        systems: "",
        success: ""
      },
      triggerId: "TRIGGER / R1",
      status: "توقّف مقصود",
      name: "السياق الأساسي غير مكتمل",
      description: "لن يصنّف الوكيل الحالة قبل معرفة العملية الحالية.",
      foot: "الإجراء: اسأل عن العملية",
      confidence: "—",
      actionTitle: "سؤال عن العملية",
      actionDescription: "كيف تؤكدون المواعيد الآن؟",
      actionOwner: "يملكه الوكيل",
      owner: "agent",
      latency: "0.41s",
      reply: "قبل أن أقترح أي مسار: كيف تؤكدون المواعيد حاليًا؟",
      audit: ["R1 · أوقف التصنيف", "process · قيمة ناقصة", "signal · تم الحفظ"],
      events: ["طُبقت R1: أوقف التصنيف", "حُفظت القناة: واتساب", "استُخرج النشاط: عيادة"]
    },
    open: {
      variables: {
        business: "عيادة أسنان",
        process: "تأكيد يدوي",
        pain: "12 موعدًا ضائعًا",
        channel: "واتساب",
        volume: "",
        handoff: "تغيير الموعد",
        systems: "",
        success: ""
      },
      triggerId: "TRIGGER / R4",
      status: "السياق يتكوّن",
      name: "استمر في جمع المعلومات",
      description: "الأساس مكتمل، لكن الحالة تحتاج بيانات إضافية قبل أي إجراء.",
      foot: "الإجراء: سؤال توضيحي",
      confidence: "92%",
      actionTitle: "سؤال ذكي تالٍ",
      actionDescription: "الحجم والنظام المستخدم",
      actionOwner: "يملكه الوكيل",
      owner: "agent",
      latency: "0.84s",
      reply: "الصورة الأساسية واضحة. كم موعدًا تتعاملون معه أسبوعيًا، وأين تحفظون التقويم؟",
      audit: ["R4 · سُجل القرار", "handoff · تغيير الموعد", "process · تأكيد يدوي"],
      events: ["تفعّلت R4: تابع الفهم", "استُخرج حد التسليم", "اكتملت الحقول الأساسية"]
    },
    ready: {
      variables: {
        business: "عيادة أسنان",
        process: "تأكيد يدوي",
        pain: "12 موعدًا ضائعًا",
        channel: "واتساب",
        volume: "80 / أسبوع",
        handoff: "تغيير الموعد",
        systems: "Google Calendar",
        success: "خفض الغياب 40%"
      },
      triggerId: "TRIGGER / R2",
      status: "جاهز للتنفيذ",
      name: "حوّل الحالة إلى إجراء",
      description: "اكتملت البيانات وظهر اهتمام صريح. لا تترك الحالة بلا خطوة تالية.",
      foot: "الإجراء: أنشئ فرصة",
      confidence: "98%",
      actionTitle: "بدء التواصل",
      actionDescription: "جهّز ملخصًا وحدد مكالمة",
      actionOwner: "فريق الحلول + الوكيل",
      owner: "agent",
      latency: "1.12s",
      reply: "ممتاز — الحالة جاهزة. سأجهز ملخصًا تشغيليًا وأقترح موعدًا قصيرًا مع فريق الحلول.",
      audit: ["R2 · أنشئ الإجراء", "interest · صريح", "fields · 8 / 8"],
      events: ["تفعّلت R2: حالة جاهزة", "سُجل اهتمام صريح", "اكتملت 8 متغيرات"]
    },
    review: {
      variables: {
        business: "عيادة ← مطعم؟",
        process: "تأكيد يدوي",
        pain: "حجوزات ضائعة",
        channel: "واتساب",
        volume: "80 / أسبوع",
        handoff: "عند التعارض",
        systems: "Google Calendar",
        success: ""
      },
      triggerId: "TRIGGER / R3",
      status: "تعارض مكتشف",
      name: "أوقف القرار وسلّم لبشر",
      description: "تغيّر نوع النشاط ماديًا. الجاهزية تُسحب حتى يراجع موظف الحالة.",
      foot: "الإجراء: مراجعة بشرية",
      confidence: "CONFLICT",
      actionTitle: "تسليم آمن",
      actionDescription: "مراجعة نوع النشاط مع نور",
      actionOwner: "سارة / فريق الحلول",
      owner: "human",
      latency: "0.19s",
      reply: "لاحظت تعارضًا في نوع النشاط، لذلك أوقفت القرار الآلي وأحلت الملخص إلى سارة للمراجعة.",
      audit: ["R3 · أوقف الجاهزية", "business · تعارض", "handoff · سارة"],
      events: ["تفعّلت R3: تسليم بشري", "اكتُشف تعارض في النشاط", "سُحبت حالة الجاهزية"]
    }
  };

  var nodeInfo = {
    signal: {
      name: "إشارة واردة",
      icon: "cyan",
      description: "نقطة بداية كل تشغيل. تحتفظ بالقناة والنص والتوقيت قبل أن ينتقل شيء إلى الذاكرة."
    },
    variables: {
      name: "ذاكرة العمل",
      icon: "violet",
      description: "متغيرات حيّة تتحدث من كلام العميل. الناقص يبقى ناقصًا، والمستنتج يبقى قابلًا للفحص."
    },
    trigger: {
      name: "التريجر النشط",
      icon: "gold",
      description: "قاعدة تشغيل تغيّر السلوك فعليًا: تتابع، تنفذ، تتوقف، أو تسلّم الحالة إلى موظف."
    },
    action: {
      name: "الإجراء التالي",
      icon: "coral",
      description: "النتيجة الملموسة للتريجر؛ قد تكون سؤالًا أو إنشاء فرصة أو تسليمًا بشريًا."
    },
    audit: {
      name: "السجل الشفاف",
      icon: "mint",
      description: "أثر زمني مختصر يجعل كل انتقال قابلًا للشرح والمراجعة بدل أن يحدث داخل صندوق أسود."
    }
  };

  var icons = {
    signal: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v12H8l-4 3V5Z"/><path d="M8 9h8M8 13h5"/></svg>',
    variables: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4H5v16h3M16 4h3v16h-3"/><path d="m10 9 4 6M14 9l-4 6"/></svg>',
    trigger: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m13 2-8 11h6l-1 9 9-12h-6V2Z"/></svg>',
    action: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"/><path d="m8 12 3 3 5-6"/></svg>',
    audit: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h12v18H6z"/><path d="M9 8h6M9 12h6M9 16h4"/></svg>'
  };

  var channelLabels = { whatsapp: "واتساب", web: "ويب", email: "بريد" };
  var channelFooters = { whatsapp: "WHATSAPP", web: "WEB CHAT", email: "EMAIL" };
  var activeScenario = "open";
  var selectedNode = "signal";
  var activeChannel = "whatsapp";
  var updateTimer = null;
  var replyTimer = null;
  var eventClock = 43;

  var canvas = document.getElementById("decisionCanvas");
  var variableCloud = document.getElementById("variableCloud");
  var variableCount = document.getElementById("variableCount");
  var variableProgress = document.getElementById("variableProgress");
  var triggerId = document.getElementById("triggerId");
  var triggerStatus = document.getElementById("triggerStatus");
  var triggerName = document.getElementById("triggerName");
  var triggerDescription = document.getElementById("triggerDescription");
  var triggerFoot = document.getElementById("triggerFoot");
  var confidenceValue = document.getElementById("confidenceValue");
  var actionTitle = document.getElementById("actionTitle");
  var actionDescription = document.getElementById("actionDescription");
  var actionOwner = document.getElementById("actionOwner");
  var latencyValue = document.getElementById("latencyValue");
  var auditLines = document.getElementById("auditLines");
  var eventList = document.getElementById("eventList");
  var messages = document.getElementById("messages");
  var input = document.getElementById("chatInput");

  function filledCount(data) {
    return fieldOrder.filter(function (field) { return Boolean(data[field]); }).length;
  }

  function timeLabel() {
    eventClock += 1;
    return "10:" + String(eventClock).padStart(2, "0");
  }

  function renderVariables(data, changedFields) {
    var changed = changedFields || [];
    variableCloud.innerHTML = "";
    fieldOrder.forEach(function (field) {
      var pill = document.createElement("span");
      pill.className = "variable-pill" + (data[field] ? " is-filled" : "") + (changed.indexOf(field) !== -1 ? " just-updated" : "");
      pill.title = data[field] ? fieldLabels[field] + ": " + data[field] : fieldLabels[field] + ": غير محدد";
      var dot = document.createElement("i");
      var value = document.createElement("span");
      value.textContent = data[field] ? fieldLabels[field] + " · " + data[field] : fieldLabels[field] + " · —";
      pill.appendChild(dot);
      pill.appendChild(value);
      variableCloud.appendChild(pill);
    });
    var count = filledCount(data);
    variableCount.textContent = count + " / " + fieldOrder.length;
    variableProgress.style.width = Math.round((count / fieldOrder.length) * 100) + "%";
  }

  function renderAudit(lines, highlight) {
    auditLines.innerHTML = "";
    lines.forEach(function (line, index) {
      var row = document.createElement("div");
      row.className = "audit-line" + (highlight && index === 0 ? " is-new" : "");
      var time = document.createElement("time");
      var label = document.createElement("span");
      time.textContent = "10:" + String(43 - index).padStart(2, "0");
      label.textContent = line;
      row.appendChild(time);
      row.appendChild(label);
      auditLines.appendChild(row);
    });
  }

  function renderEvents(events) {
    eventList.innerHTML = "";
    events.forEach(function (event, index) {
      var item = document.createElement("li");
      var dot = document.createElement("i");
      var label = document.createElement("span");
      var time = document.createElement("time");
      label.textContent = event;
      time.textContent = index === 0 ? "الآن" : "-" + index * 4 + "s";
      item.appendChild(dot);
      item.appendChild(label);
      item.appendChild(time);
      eventList.appendChild(item);
    });
  }

  function renderOwner(scenario) {
    var ownerRow = actionOwner.parentElement;
    var oldAvatar = ownerRow.querySelector(".mini-avatar");
    var avatar = document.createElement("span");
    if (scenario.owner === "human") {
      avatar.className = "mini-avatar human-mini";
      avatar.textContent = "س";
    } else {
      avatar.className = "mini-avatar agent-mini";
      var image = document.createElement("img");
      image.src = "../../assets/falaq-symbol.png";
      image.alt = "";
      avatar.appendChild(image);
    }
    oldAvatar.replaceWith(avatar);
  }

  function paintScenario(name, options) {
    var scenario = scenarios[name];
    var opts = options || {};
    activeScenario = name;
    canvas.dataset.state = name;
    canvas.classList.toggle("is-processing", Boolean(opts.processing));

    renderVariables(scenario.variables, opts.changed || []);
    triggerId.textContent = scenario.triggerId;
    triggerStatus.textContent = scenario.status;
    triggerName.textContent = scenario.name;
    triggerDescription.textContent = scenario.description;
    triggerFoot.textContent = scenario.foot;
    confidenceValue.textContent = scenario.confidence;
    actionTitle.textContent = scenario.actionTitle;
    actionDescription.textContent = scenario.actionDescription;
    actionOwner.textContent = scenario.actionOwner;
    latencyValue.textContent = scenario.latency;
    renderOwner(scenario);
    renderAudit(scenario.audit, opts.highlight);
    renderEvents(scenario.events);

    document.querySelectorAll("[data-scenario]").forEach(function (button) {
      button.classList.toggle("is-active", button.dataset.scenario === name);
    });
    paintInspector();
  }

  function inspectorMeta(node) {
    var scenario = scenarios[activeScenario];
    var count = filledCount(scenario.variables);
    if (node === "signal") return [["المصدر", channelLabels[activeChannel]], ["الحالة", "مستلمة"]];
    if (node === "variables") return [["المكتمل", count + " من 8"], ["التحديث", "لحظي"]];
    if (node === "trigger") return [["القاعدة", scenario.triggerId.replace("TRIGGER / ", "")], ["الحالة", scenario.status]];
    if (node === "action") return [["المالك", scenario.actionOwner], ["النوع", scenario.actionTitle]];
    return [["السجلات", "3 أحداث"], ["الحالة", "قابل للمراجعة"]];
  }

  function paintInspector() {
    var info = nodeInfo[selectedNode];
    var selectedIcon = document.querySelector(".selected-icon");
    selectedIcon.className = "selected-icon " + info.icon;
    selectedIcon.innerHTML = icons[selectedNode];
    document.getElementById("selectedNodeName").textContent = info.name;
    document.getElementById("selectedNodeDescription").textContent = info.description;

    var meta = document.getElementById("selectedNodeMeta");
    meta.innerHTML = "";
    inspectorMeta(selectedNode).forEach(function (pair, index) {
      var row = document.createElement("div");
      var term = document.createElement("dt");
      var description = document.createElement("dd");
      term.textContent = pair[0];
      if (index === 1) description.appendChild(document.createElement("i"));
      description.appendChild(document.createTextNode(pair[1]));
      row.appendChild(term);
      row.appendChild(description);
      meta.appendChild(row);
    });
  }

  function selectNode(node) {
    if (!nodeInfo[node]) return;
    selectedNode = node;
    document.querySelectorAll("[data-node]").forEach(function (button) {
      var selected = button.dataset.node === node;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    paintInspector();
  }

  function addMessage(role, text, typing) {
    var article = document.createElement("article");
    article.className = "message " + role + (typing ? " is-typing" : "");
    if (role === "agent") {
      var avatar = document.createElement("span");
      avatar.className = "agent-avatar";
      var image = document.createElement("img");
      image.src = "../../assets/falaq-symbol.png";
      image.alt = "";
      avatar.appendChild(image);
      var content = document.createElement("div");
      var paragraph = document.createElement("p");
      if (typing) {
        paragraph.innerHTML = "<i></i><i></i><i></i>";
      } else {
        paragraph.textContent = text;
      }
      var stamp = document.createElement("span");
      stamp.textContent = timeLabel() + (typing ? "" : " · تم التحليل");
      content.appendChild(paragraph);
      content.appendChild(stamp);
      article.appendChild(avatar);
      article.appendChild(content);
    } else {
      var incomingText = document.createElement("p");
      var incomingStamp = document.createElement("span");
      incomingText.textContent = text;
      incomingStamp.textContent = timeLabel();
      article.appendChild(incomingText);
      article.appendChild(incomingStamp);
    }
    messages.appendChild(article);
    messages.scrollTop = messages.scrollHeight;
    return article;
  }

  function scenarioForText(text) {
    if (/عرض|نبدأ|ابدأ|جاهز|تواصل/i.test(text)) return "ready";
    if (/تعارض|مطعم بدل|ليست عيادة|مو عيادة/i.test(text)) return "review";
    if (/لا أعرف|ما عندي تفاصيل|غير واضح/i.test(text)) return "blocked";
    return "open";
  }

  function changedForText(text, scenarioName) {
    if (scenarioName === "ready") return ["volume", "systems", "success"];
    if (scenarioName === "review") return ["business", "handoff"];
    var changed = [];
    if (/موعد|أسبوع|شهري|يومي|80|حجم/i.test(text)) changed.push("volume");
    if (/calendar|تقويم|crm|sheet|نظام/i.test(text)) changed.push("systems");
    if (!changed.length) changed = ["process", "pain"];
    return changed;
  }

  function sendMessage(text) {
    text = String(text || "").trim();
    if (!text) return;
    window.clearTimeout(updateTimer);
    window.clearTimeout(replyTimer);
    input.value = "";
    input.style.height = "auto";

    addMessage("incoming", text, false);
    document.getElementById("signalSummary").textContent = text.length > 42 ? text.slice(0, 41) + "…" : text;
    canvas.classList.add("is-processing");
    selectNode("signal");
    var typing = addMessage("agent", "", true);
    var nextScenario = scenarioForText(text);
    var changed = changedForText(text, nextScenario);

    updateTimer = window.setTimeout(function () {
      paintScenario(nextScenario, { processing: true, changed: changed, highlight: true });
      selectNode("variables");
    }, 650);

    replyTimer = window.setTimeout(function () {
      if (typing.isConnected) typing.remove();
      addMessage("agent", scenarios[nextScenario].reply, false);
      canvas.classList.remove("is-processing");
      selectNode("trigger");
    }, 1550);
  }

  document.querySelectorAll("[data-node]").forEach(function (button) {
    button.addEventListener("click", function () { selectNode(button.dataset.node); });
  });

  document.getElementById("scenarioGrid").addEventListener("click", function (event) {
    var button = event.target.closest("[data-scenario]");
    if (!button) return;
    paintScenario(button.dataset.scenario, { highlight: true });
    selectNode("trigger");
  });

  document.querySelector(".channel-switcher").addEventListener("click", function (event) {
    var button = event.target.closest("[data-channel]");
    if (!button) return;
    activeChannel = button.dataset.channel;
    document.querySelectorAll("[data-channel]").forEach(function (item) {
      var active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    document.getElementById("signalChannel").textContent = channelLabels[activeChannel];
    document.getElementById("footerChannel").textContent = "CHANNEL / " + channelFooters[activeChannel];
    paintInspector();
  });

  document.getElementById("chatForm").addEventListener("submit", function (event) {
    event.preventDefault();
    sendMessage(input.value);
  });

  document.querySelector(".suggestion-strip").addEventListener("click", function (event) {
    var button = event.target.closest("[data-prompt]");
    if (button) sendMessage(button.dataset.prompt);
  });

  input.addEventListener("input", function () {
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight, 92) + "px";
  });

  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      document.getElementById("chatForm").requestSubmit();
    }
  });

  document.getElementById("motionToggle").addEventListener("click", function () {
    var button = this;
    var running = button.getAttribute("aria-pressed") === "true";
    button.setAttribute("aria-pressed", String(!running));
    canvas.classList.toggle("is-paused", running);
    var svg = canvas.querySelector(".connection-layer");
    if (running && typeof svg.pauseAnimations === "function") svg.pauseAnimations();
    if (!running && typeof svg.unpauseAnimations === "function") svg.unpauseAnimations();
  });

  document.getElementById("soundToggle").addEventListener("click", function () {
    this.classList.toggle("is-muted");
  });

  document.getElementById("resetButton").addEventListener("click", function () {
    window.clearTimeout(updateTimer);
    window.clearTimeout(replyTimer);
    canvas.classList.remove("is-processing");
    document.getElementById("signalSummary").textContent = "طلب متابعة مواعيد العيادة";
    paintScenario("open", { highlight: true });
    selectNode("signal");
  });

  paintScenario("open");
  selectNode("signal");
})();
