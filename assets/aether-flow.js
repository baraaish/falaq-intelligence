(function () {
  "use strict";

  function mount(hero) {
    if (hero.dataset.aetherMounted === "true") return;
    hero.dataset.aetherMounted = "true";

    var canvas = hero.querySelector("canvas.aether-canvas");
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.className = "aether-canvas";
      canvas.setAttribute("aria-hidden", "true");
      hero.prepend(canvas);
    }

    var ctx = canvas.getContext("2d");
    if (!ctx) return;

    var animationFrameId = 0;
    var particles = [];
    var mouse = { x: null, y: null, radius: 200 };
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var isVisible = true;

    function Particle(x, y, directionX, directionY, size, color) {
      this.x = x;
      this.y = y;
      this.directionX = directionX;
      this.directionY = directionY;
      this.size = size;
      this.color = color;
    }

    Particle.prototype.draw = function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    };

    Particle.prototype.update = function () {
      if (this.x > canvas.clientWidth || this.x < 0) this.directionX = -this.directionX;
      if (this.y > canvas.clientHeight || this.y < 0) this.directionY = -this.directionY;

      if (mouse.x !== null && mouse.y !== null) {
        var dx = mouse.x - this.x;
        var dy = mouse.y - this.y;
        var distance = Math.sqrt(dx * dx + dy * dy) || 1;
        if (distance < mouse.radius + this.size) {
          var force = (mouse.radius - distance) / mouse.radius;
          this.x -= (dx / distance) * force * 5;
          this.y -= (dy / distance) * force * 5;
        }
      }

      if (!reduceMotion) {
        this.x += this.directionX;
        this.y += this.directionY;
      }
      this.draw();
    };

    function init() {
      var width = hero.clientWidth;
      var height = hero.clientHeight;
      var ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      particles = [];
      var particleLimit = window.innerWidth <= 700 ? 58 : 165;
      var numberOfParticles = Math.min(particleLimit, Math.max(42, Math.floor((height * width) / 9000)));
      for (var i = 0; i < numberOfParticles; i += 1) {
        var size = Math.random() * 2 + 1;
        var x = Math.random() * Math.max(1, width - size * 4) + size * 2;
        var y = Math.random() * Math.max(1, height - size * 4) + size * 2;
        var directionX = Math.random() * 0.4 - 0.2;
        var directionY = Math.random() * 0.4 - 0.2;
        particles.push(new Particle(x, y, directionX, directionY, size, "rgba(191, 128, 255, 0.8)"));
      }
    }

    function connect() {
      var maxDistance = 145;
      for (var a = 0; a < particles.length; a += 1) {
        for (var b = a + 1; b < particles.length; b += 1) {
          var dx = particles[a].x - particles[b].x;
          var dy = particles[a].y - particles[b].y;
          var distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < maxDistance) {
            var opacityValue = (1 - distance / maxDistance) * 0.52;
            var mouseDistance = mouse.x === null ? Infinity : Math.hypot(particles[a].x - mouse.x, particles[a].y - mouse.y);
            ctx.strokeStyle = mouseDistance < mouse.radius
              ? "rgba(255, 255, 255, " + opacityValue + ")"
              : "rgba(200, 150, 255, " + opacityValue + ")";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      if (!isVisible || document.hidden) {
        animationFrameId = 0;
        return;
      }
      ctx.fillStyle = "#03030a";
      ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      for (var i = 0; i < particles.length; i += 1) particles[i].update();
      connect();
      if (!reduceMotion) animationFrameId = requestAnimationFrame(animate);
    }

    function startAnimation() {
      if (!reduceMotion && !animationFrameId && isVisible && !document.hidden) {
        animationFrameId = requestAnimationFrame(animate);
      }
    }

    function handleMouseMove(event) {
      var rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    }

    function handleMouseOut() {
      mouse.x = null;
      mouse.y = null;
    }

    var resizeTimer;
    function resize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        init();
        if (reduceMotion) animate();
      }, 80);
    }

    window.addEventListener("resize", resize);
    hero.addEventListener("mousemove", handleMouseMove);
    hero.addEventListener("mouseleave", handleMouseOut);
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        isVisible = entries[0].isIntersecting;
        if (!isVisible && animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = 0;
        } else {
          startAnimation();
        }
      }).observe(hero);
    }
    document.addEventListener("visibilitychange", startAnimation);
    requestAnimationFrame(function () {
      init();
      if (reduceMotion) animate();
      else startAnimation();
    });
  }

  /* Falaq mark — "dawn spark": a four-point star rising over an horizon arc */
  var logoIds = 0;
  function buildFalaqLogo(extraClass) {
    logoIds += 1;
    var id = "flq" + logoIds;
    return [
      '<svg class="falaq-logo-svg ' + (extraClass || "") + '" viewBox="0 0 48 48" fill="none" role="img" aria-label="Falaq">',
      '<defs>',
      '<linearGradient id="' + id + 'g" x1="10" y1="40" x2="40" y2="8" gradientUnits="userSpaceOnUse">',
      '<stop stop-color="#8b5cf6"/><stop offset=".55" stop-color="#c084fc"/><stop offset="1" stop-color="#f0abfc"/>',
      '</linearGradient>',
      '</defs>',
      '<path d="M24 3.5c1.9 10 6.7 14.8 16.5 16.7C30.7 22.1 25.9 26.9 24 37 22.1 26.9 17.3 22.1 7.5 20.2 17.3 18.3 22.1 13.5 24 3.5Z" fill="url(#' + id + 'g)"/>',
      '<path d="M10 40.5a17 17 0 0 0 28 0" stroke="url(#' + id + 'g)" stroke-width="3" stroke-linecap="round" opacity=".9"/>',
      '<circle cx="41" cy="34" r="2.2" fill="#f0abfc"/>',
      '<circle cx="7" cy="34" r="1.7" fill="#8b5cf6"/>',
      '</svg>'
    ].join("");
  }

  var robotIds = 0;
  function buildRobotMarkup() {
    robotIds += 1;
    var id = "fr" + robotIds;
    return [
      '<svg class="falaq-robot-svg" viewBox="0 0 220 260" role="img" aria-label="Falaq Bot">',
      '<defs>',
      '<linearGradient id="' + id + 'Head" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbfbfe"/><stop offset="1" stop-color="#c3c6d4"/></linearGradient>',
      '<linearGradient id="' + id + 'Body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef0f6"/><stop offset="1" stop-color="#a9adbf"/></linearGradient>',
      '<linearGradient id="' + id + 'Visor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#170f28"/><stop offset="1" stop-color="#070310"/></linearGradient>',
      '<radialGradient id="' + id + 'Core" cx=".35" cy=".3" r="1"><stop offset="0" stop-color="#f0abfc"/><stop offset=".55" stop-color="#c026d3"/><stop offset="1" stop-color="#6b21a8"/></radialGradient>',
      '<filter id="' + id + 'Glow" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="3.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>',
      '</defs>',
      '<ellipse class="robot-shadow" cx="110" cy="250" rx="54" ry="8" fill="rgba(168,85,247,.22)"/>',
      '<g class="robot-rig">',
      '<g class="robot-antenna"><path d="M110 34V16" stroke="#e6d9ff" stroke-width="4" stroke-linecap="round"/><circle class="antenna-dot" cx="110" cy="12" r="6.5" fill="#e879f9" filter="url(#' + id + 'Glow)"/></g>',
      '<g class="robot-arm robot-arm-left"><rect x="31" y="148" width="17" height="54" rx="8.5" fill="url(#' + id + 'Body)" stroke="rgba(255,255,255,.5)"/></g>',
      '<g class="robot-arm robot-arm-right"><rect x="172" y="148" width="17" height="54" rx="8.5" fill="url(#' + id + 'Body)" stroke="rgba(255,255,255,.5)"/></g>',
      '<g class="robot-head">',
      '<rect x="46" y="30" width="128" height="92" rx="32" fill="url(#' + id + 'Head)" stroke="rgba(255,255,255,.6)" stroke-width="1.5"/>',
      '<rect x="37" y="58" width="9" height="27" rx="4.5" fill="#c9ccd9" stroke="rgba(255,255,255,.45)"/>',
      '<rect x="174" y="58" width="9" height="27" rx="4.5" fill="#c9ccd9" stroke="rgba(255,255,255,.45)"/>',
      '<rect x="60" y="45" width="100" height="60" rx="25" fill="url(#' + id + 'Visor)"/>',
      '<g class="robot-eyes"><rect class="robot-eye eye-one" x="85" y="59" width="10" height="28" rx="5" fill="#e879f9" filter="url(#' + id + 'Glow)"/><rect class="robot-eye eye-two" x="125" y="59" width="10" height="28" rx="5" fill="#e879f9" filter="url(#' + id + 'Glow)"/></g>',
      '<path class="robot-mouth" d="M101 94q9 6 18 0" fill="none" stroke="#e879f9" stroke-width="2.6" stroke-linecap="round" opacity=".5"/>',
      '</g>',
      '<rect x="100" y="120" width="20" height="12" rx="3" fill="#b7bac8"/>',
      '<g class="robot-body">',
      '<rect x="52" y="130" width="116" height="88" rx="28" fill="url(#' + id + 'Body)" stroke="rgba(255,255,255,.5)" stroke-width="1.5"/>',
      '<circle cx="70" cy="146" r="3.4" fill="rgba(168,85,247,.75)"/>',
      '<circle cx="150" cy="146" r="3.4" fill="rgba(168,85,247,.75)"/>',
      '<g class="robot-core" filter="url(#' + id + 'Glow)"><circle cx="110" cy="174" r="23" fill="url(#' + id + 'Core)"/><path d="M114 159l-13 18h8.5l-4.5 13 14-18h-8.5l3.5-13z" fill="#fff" opacity=".92"/></g>',
      '</g>',
      '</g>',
      '</svg>'
    ].join("");
  }

  function applyBrandLogo() {
    document.querySelectorAll(".brand .mark").forEach(function (mark) {
      if (mark.querySelector(".falaq-logo-svg")) return;
      mark.innerHTML = buildFalaqLogo("falaq-brand-logo");
    });

    document.querySelectorAll("#dc-root nav").forEach(function (nav) {
      var mark = nav.querySelector(":scope > div:first-child > div:first-child");
      if (!mark || mark.querySelector(".falaq-logo-svg")) return;
      mark.innerHTML = buildFalaqLogo("falaq-brand-logo");
      mark.classList.add("falaq-service-mark");
    });
  }

  function getRobotQuips() {
    var ar = document.documentElement.lang !== "en";
    return ar ? {
      idle: [
        "أهلاً! أنا فلق بوت 👋",
        "سبعة وكلاء جاهزون لخدمة أعمالك",
        "أعمل ٢٤/٧... بدون استراحة قهوة ☕",
        "جرّب الضغط عليّ ⚡",
        "أتحدث العربية والإنجليزية بطلاقة",
        "مهامك المتكررة؟ اتركها لي",
        "بياناتك تدخل... والنتائج تخرج تلقائياً",
        "عندك عملية مرهقة؟ حدّثني عنها بالأسفل"
      ],
      click: [
        "هييه! هذا يدغدغ 😄",
        "جاهز للخدمة!",
        "الأنظمة تعمل بكامل طاقتها ⚡",
        "لمسة بشرية! يا للروعة ✨",
        "هل نبدأ بأتمتة شيء ما؟"
      ]
    } : {
      idle: [
        "Hi! I'm Falaq Bot 👋",
        "Seven agents, ready to work for you",
        "I work 24/7 — no coffee breaks ☕",
        "Try clicking me ⚡",
        "Fluent in Arabic and English",
        "Repetitive work? Leave it to me",
        "Data in… results out, automatically",
        "Got a draining process? Tell me below"
      ],
      click: [
        "Hey! That tickles 😄",
        "At your service!",
        "All systems at full power ⚡",
        "A human touch! Lovely ✨",
        "Shall we automate something?"
      ]
    };
  }

  var trackedEyes = [];
  var eyeRaf = 0;
  var personaMotionOk = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.addEventListener("mousemove", function (event) {
    if (!personaMotionOk || !trackedEyes.length || eyeRaf) return;
    eyeRaf = requestAnimationFrame(function () {
      eyeRaf = 0;
      trackedEyes.forEach(function (svg) {
        if (!svg.isConnected) return;
        var rect = svg.getBoundingClientRect();
        if (!rect.width || rect.bottom < 0 || rect.top > window.innerHeight) return;
        var cx = rect.left + rect.width / 2;
        var cy = rect.top + rect.height * 0.3;
        var dx = event.clientX - cx;
        var dy = event.clientY - cy;
        var distance = Math.hypot(dx, dy) || 1;
        var reach = Math.min(1, distance / 260);
        svg.style.setProperty("--eyeX", (dx / distance * 4.2 * reach).toFixed(2) + "px");
        svg.style.setProperty("--eyeY", (dy / distance * 3 * reach).toFixed(2) + "px");
      });
    });
  });

  function attachRobotPersona(stage, robotHost) {
    if (!stage || !robotHost || stage.dataset.personaMounted === "true") return;
    stage.dataset.personaMounted = "true";

    var svg = robotHost.querySelector(".falaq-robot-svg");
    if (svg) trackedEyes.push(svg);

    var bubble = document.createElement("div");
    bubble.className = "robot-quip";
    bubble.setAttribute("aria-live", "polite");
    stage.appendChild(bubble);

    var visible = false;
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { visible = entry.isIntersecting; });
    }, { threshold: .25 }).observe(stage);

    var revealTimer, hideTimer;
    function showQuip(text) {
      clearTimeout(revealTimer);
      clearTimeout(hideTimer);
      bubble.innerHTML = '<span class="q-dots"><i></i><i></i><i></i></span>';
      bubble.classList.add("show");
      robotHost.classList.add("robot-talking");
      revealTimer = setTimeout(function () {
        bubble.textContent = text;
        hideTimer = setTimeout(function () {
          bubble.classList.remove("show");
          robotHost.classList.remove("robot-talking");
        }, 4200);
      }, 620);
    }

    function randomQuip(kind) {
      var list = getRobotQuips()[kind];
      return list[Math.floor(Math.random() * list.length)];
    }

    if (personaMotionOk) {
      (function cycle(delay) {
        setTimeout(function () {
          if (visible && !document.hidden) showQuip(randomQuip("idle"));
          cycle(7000 + Math.random() * 5000);
        }, delay);
      })(2200 + Math.random() * 1500);
    }

    function cheer(text) {
      robotHost.classList.remove("robot-cheer");
      void robotHost.offsetWidth;
      robotHost.classList.add("robot-cheer");
      showQuip(typeof text === "string" && text ? text : randomQuip("click"));
      setTimeout(function () { robotHost.classList.remove("robot-cheer"); }, 1300);
    }

    (svg || robotHost).addEventListener("click", function () {
      if (robotHost.dataset.clickQuiet === "true") return;
      cheer();
    });
    robotHost.addEventListener("falaq-cheer", function (event) {
      cheer(event ? event.detail : null);
    });
  }

  function enhanceAgentConstellation() {
    var grid = document.getElementById("agentGrid");
    if (!grid) return;
    var agents = Array.from(grid.querySelectorAll(":scope > a.agent"));
    if (agents.length < 7) return;
    grid.classList.add("agent-constellation");

    agents.forEach(function (agent, index) {
      agent.classList.add("agent-node");
      agent.style.setProperty("--node-delay", (index * 0.08) + "s");
      if (!agent.querySelector(".agent-hover-card")) {
        var description = agent.querySelector("p");
        if (description) description.classList.add("agent-node-description");
        var card = document.createElement("span");
        card.className = "agent-hover-card";
        card.innerHTML = '<span class="agent-preview-robot">' + buildRobotMarkup() + '</span><span class="agent-preview-copy"><b>' + (agent.querySelector("h3")?.textContent || "") + '</b><span>' + (description?.textContent || "") + '</span></span>';
        agent.appendChild(card);
      }
    });

    if (!grid.querySelector(".agent-threads")) {
      var threads = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      threads.setAttribute("class", "agent-threads");
      threads.setAttribute("viewBox", "0 0 1000 720");
      threads.setAttribute("aria-hidden", "true");
      [[500,340,180,105],[500,340,500,70],[500,340,820,115],[500,340,875,390],[500,340,700,650],[500,340,300,650],[500,340,125,390]].forEach(function (line, index) {
        var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        var curve = index % 2 ? 34 : -34;
        path.setAttribute("d", "M" + line[0] + " " + line[1] + " Q" + ((line[0]+line[2])/2) + " " + (((line[1]+line[3])/2)+curve) + " " + line[2] + " " + line[3]);
        path.setAttribute("class", "agent-thread thread-" + (index + 1));
        path.style.setProperty("--thread-delay", (index * 0.09) + "s");
        threads.appendChild(path);
      });
      grid.prepend(threads);
    }

    if (!grid.querySelector(".agent-orchestrator")) {
      var robot = document.createElement("div");
      robot.className = "agent-orchestrator";
      robot.innerHTML = '<span class="orchestrator-orbit"></span>' + buildRobotMarkup() + '<span class="orchestrator-label">' + (document.documentElement.lang !== "en" ? "نواة فَلَق" : "FALAQ CORE") + ' <i></i></span>';
      grid.appendChild(robot);
    }
    var orchestrator = grid.querySelector(".agent-orchestrator");
    if (orchestrator) attachRobotPersona(orchestrator, orchestrator);

    if (orchestrator && orchestrator.dataset.toggleMounted !== "true") {
      orchestrator.dataset.toggleMounted = "true";
      orchestrator.dataset.clickQuiet = "true";

      var hint = document.createElement("span");
      hint.className = "orchestrator-hint";
      orchestrator.appendChild(hint);

      var setHint = function (open) {
        var ar = document.documentElement.lang !== "en";
        var text = open
          ? (ar ? "اضغط عليّ لإخفاء الخدمات" : "Click me to hide the services")
          : (ar ? "اضغط عليّ لأعرض لك خدماتي السبع" : "Click me to reveal my 7 services");
        hint.innerHTML = "<span>" + text + "</span><span class=\"arr\">" + (open ? "↑" : "↓") + "</span>";
      };
      setHint(grid.classList.contains("is-open"));

      var toggleSvg = orchestrator.querySelector(".falaq-robot-svg");
      if (toggleSvg) toggleSvg.addEventListener("click", function () {
        var open = grid.classList.toggle("is-open");
        setHint(open);
        var ar = document.documentElement.lang !== "en";
        var quip = open
          ? (ar ? "تفضّل! هذه خدماتي السبع ✨" : "Here you go — my 7 services ✨")
          : (ar ? "أخفيتها! اضغط عليّ متى احتجتها 😉" : "Tucked away! Click me anytime 😉");
        orchestrator.dispatchEvent(new CustomEvent("falaq-cheer", { detail: quip }));
      });
    }
  }

  function currentBotLanguage() {
    var languageToggle = Array.from(document.querySelectorAll("button")).find(function (button) {
      var text = button.textContent.trim();
      return text === "AR" || text === "EN";
    });
    if (languageToggle) return languageToggle.textContent.trim() === "AR" ? "en" : "ar";
    return document.documentElement.lang === "en" ? "en" : "ar";
  }

  function getBotCopy() {
    var ar = currentBotLanguage() === "ar";
    return ar ? {
      kick: "حلّ مصمم لك", title: "لم تجد الوكيل الذي تحتاجه؟", lead: "تحدث مع فلق بوت عن عمليتك أو فكرتك. سنحوّل احتياجك إلى تصور أولي لوكيل مخصص، ثم يراجع فريقنا التفاصيل معك.",
      badge: "مصمم عمليات ذكي · تصور وملف PDF", bot: "فلق بوت", status: "جاهز لبناء تصور خدمتك", wake: "إشارة التفعيل", hello: "مرحباً، أنا فلق بوت. صف لي المهمة التي تريد أتمتتها أو المشكلة التشغيلية التي تريد حلها.",
      ideas: ["أريد تنظيم استقبال العملاء", "لدينا متابعة يدوية متعبة", "أريد ربط خطوات العمل الحالية"], placeholder: "اكتب فكرتك أو المشكلة بطريقتك...", send: "إرسال",
      thinking: "أحلل احتياجك...", confirm: "تأكيد وإنشاء العرض", restart: "البدء من جديد", summary: "ممتاز. اكتملت الصورة الأولية. سأبني العرض حول", contactIntro: "قبل إنشاء الملف، أدخل اسمك وبريدك أو رقم واتساب ليظهر لك خيار التنزيل.",
      name: "الاسم الكامل *", company: "الشركة (اختياري)", email: "البريد الإلكتروني", phone: "رقم واتساب", create: "إنشاء ملف العرض", contactError: "أدخل الاسم والبريد أو رقم واتساب بشكل صحيح.",
      generating: "أبني التصور وأصمم ملفك الآن...", ready: "تم إعداد تصور خدمتك. يمكنك تنزيل الملف مباشرة:", download: "تنزيل ملف PDF", again: "بناء تصور جديد", failed: "تعذر إكمال الطلب الآن. تأكد أن الباكند يعمل ثم حاول مجددًا."
    } : {
      kick: "BUILT AROUND YOU", title: "Can’t find the agent you need?", lead: "Tell Falaq Bot about your process or idea. We’ll turn it into an initial custom-agent concept, then our team can refine the details with you.",
      badge: "AI workflow designer · concept and PDF", bot: "Falaq Bot", status: "Ready to shape your service", wake: "SCROLL SIGNAL", hello: "Hi, I’m Falaq Bot. Describe the task you want to automate or the operating problem you want to solve.",
      ideas: ["Organize lead intake", "Reduce repetitive follow-up", "Connect our current workflow"], placeholder: "Describe the idea or problem in your own words...", send: "Send",
      thinking: "Analyzing your requirement...", confirm: "Confirm and create proposal", restart: "Start over", summary: "Great. I have enough context to shape the proposal around", contactIntro: "Before creating the file, enter your name and an email or WhatsApp number to unlock the download.",
      name: "Full name *", company: "Company (optional)", email: "Email address", phone: "WhatsApp number", create: "Create proposal file", contactError: "Enter your name and a valid email or WhatsApp number.",
      generating: "Building the workflow and designing your file...", ready: "Your service concept is ready. Download it here:", download: "Download PDF", again: "Build another concept", failed: "The request could not be completed. Make sure the backend is running and try again."
    };
  }

  function getBotState(section) {
    if (!section._falaqAgentState) {
      section._falaqAgentState = { phase: "intro", busy: false, questions: [], answers: [], questionIndex: 0 };
    }
    return section._falaqAgentState;
  }

  function agentApi(path) {
    var config = window.FALAQ_CONFIG || {};
    return (config.agentApiBase || "").replace(/\/$/, "") + path;
  }

  async function postAgent(path, payload) {
    var response = await fetch(agentApi(path), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    var data = await response.json().catch(function () { return {}; });
    if (!response.ok) throw new Error(data.error || "Request failed");
    return data;
  }

  function showBotTyping(section) {
    var typing = document.createElement("div");
    typing.className = "bot-message bot-typing";
    typing.innerHTML = '<span class="mini-bot">' + buildRobotMarkup() + '</span><span><i></i><i></i><i></i></span>';
    section.querySelector(".falaq-chat-messages").appendChild(typing);
    section.querySelector(".falaq-chat-messages").scrollTop = section.querySelector(".falaq-chat-messages").scrollHeight;
    return typing;
  }

  function setBotBusy(section, busy) {
    var state = getBotState(section);
    state.busy = busy;
    var form = section.querySelector(".bot-input-row");
    form.querySelector("input").disabled = busy;
    form.querySelector("button").disabled = busy;
    section.querySelectorAll(".bot-suggestions button").forEach(function (button) { button.disabled = busy; });
  }

  function renderBotSuggestions(section, labels, onSelect) {
    var suggestions = section.querySelector(".bot-suggestions");
    suggestions.innerHTML = "";
    (labels || []).forEach(function (label) {
      var button = document.createElement("button");
      button.type = "button";
      button.textContent = label;
      button.addEventListener("click", function () { onSelect(label); });
      suggestions.appendChild(button);
    });
  }

  function updateBotInput(section, placeholder, visible) {
    var form = section.querySelector(".bot-input-row");
    form.hidden = visible === false;
    form.querySelector("input").placeholder = placeholder || getBotCopy().placeholder;
  }

  function askBotQuestion(section) {
    var state = getBotState(section);
    var question = state.questions[state.questionIndex];
    if (!question) return showBotSummary(section);
    state.phase = "question";
    addChatMessage(section, question.question, false);
    updateBotInput(section, question.placeholder, true);
    renderBotSuggestions(section, question.options, function (value) {
      if (state.busy) return;
      addChatMessage(section, value, true);
      captureBotAnswer(section, value);
    });
  }

  async function captureBotAnswer(section, value) {
    var state = getBotState(section);
    var question = state.questions[state.questionIndex];
    if (!question || !value) return;
    state.phase = "validating";
    state.pendingAnswers = state.pendingAnswers || {};
    state.answerAttempts = state.answerAttempts || {};
    var combinedAnswer = state.pendingAnswers[question.id]
      ? state.pendingAnswers[question.id] + " | " + value
      : value;
    setBotBusy(section, true);
    renderBotSuggestions(section, [], function () {});
    var typing = showBotTyping(section);
    var validation;
    try {
      validation = await postAgent("/api/agent/validate-answer", {
        language: currentBotLanguage(),
        category: state.category,
        initialRequest: state.initialRequest,
        question: question,
        answer: combinedAnswer,
        previousAnswers: state.answers
      });
    } catch (_) {
      validation = { sufficient: true, normalizedAnswer: combinedAnswer };
    }
    typing.remove();

    var attempts = state.answerAttempts[question.id] || 0;
    if (!validation.sufficient && attempts < 2) {
      state.answerAttempts[question.id] = attempts + 1;
      state.pendingAnswers[question.id] = combinedAnswer;
      state.phase = "question";
      setBotBusy(section, false);
      addChatMessage(section, validation.followUp || getBotCopy().failed, false);
      updateBotInput(section, question.placeholder, true);
      section.querySelector(".bot-input-row input").focus();
      return;
    }

    state.answers.push({ id: question.id, question: question.question, value: validation.normalizedAnswer || combinedAnswer });
    delete state.pendingAnswers[question.id];
    delete state.answerAttempts[question.id];
    state.questionIndex += 1;
    state.phase = "transition";
    setBotBusy(section, false);
    renderBotSuggestions(section, [], function () {});
    window.setTimeout(function () { askBotQuestion(section); }, 260);
  }

  function showBotSummary(section) {
    var state = getBotState(section);
    var copy = getBotCopy();
    state.phase = "summary";
    updateBotInput(section, "", false);
    addChatMessage(section, copy.summary + " «" + state.categoryLabel + "». " + (currentBotLanguage() === "ar" ? "أكد للانتقال إلى ملف العرض." : "Confirm to continue to the proposal file."), false);
    renderBotSuggestions(section, [copy.confirm, copy.restart], function (value) {
      if (value === copy.restart) resetBot(section);
      else showContactGate(section);
    });
  }

  function showContactGate(section) {
    var copy = getBotCopy();
    var state = getBotState(section);
    state.phase = "contact";
    renderBotSuggestions(section, [], function () {});
    addChatMessage(section, copy.contactIntro, false);

    var oldGate = section.querySelector(".bot-contact-gate");
    if (oldGate) oldGate.remove();
    var gate = document.createElement("form");
    gate.className = "bot-contact-gate";
    gate.innerHTML = [
      '<div class="bot-contact-grid">',
      '<input name="name" required maxlength="120" autocomplete="name" placeholder="' + copy.name + '">',
      '<input name="company" maxlength="160" autocomplete="organization" placeholder="' + copy.company + '">',
      '<input name="email" type="email" maxlength="180" autocomplete="email" placeholder="' + copy.email + '">',
      '<input name="phone" type="tel" maxlength="60" autocomplete="tel" placeholder="' + copy.phone + '">',
      '</div><p class="bot-contact-error" role="alert"></p>',
      '<button type="submit">' + copy.create + '</button>'
    ].join("");
    section.querySelector(".falaq-chat-panel").appendChild(gate);
    gate.querySelector("input").focus();

    gate.addEventListener("submit", async function (event) {
      event.preventDefault();
      var data = new FormData(gate);
      var contact = { name: String(data.get("name") || "").trim(), company: String(data.get("company") || "").trim(), email: String(data.get("email") || "").trim(), phone: String(data.get("phone") || "").trim() };
      var emailOk = !contact.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email);
      var phoneOk = !contact.phone || contact.phone.replace(/\D/g, "").length >= 8;
      if (!contact.name || (!contact.email && !contact.phone) || !emailOk || !phoneOk) {
        gate.querySelector(".bot-contact-error").textContent = copy.contactError;
        return;
      }

      gate.querySelector("button").disabled = true;
      gate.querySelectorAll("input").forEach(function (input) { input.disabled = true; });
      addChatMessage(section, copy.generating, false);
      var typing = showBotTyping(section);
      try {
        var result = await postAgent("/api/agent/finalize", {
          language: currentBotLanguage(),
          category: state.category,
          initialRequest: state.initialRequest,
          answers: state.answers,
          contact: contact
        });
        typing.remove();
        gate.remove();
        showBotDownload(section, result);
      } catch (error) {
        typing.remove();
        gate.querySelector(".bot-contact-error").textContent = error.message || copy.failed;
        gate.querySelector("button").disabled = false;
        gate.querySelectorAll("input").forEach(function (input) { input.disabled = false; });
      }
    });
  }

  function showBotDownload(section, result) {
    var copy = getBotCopy();
    var binary = atob(result.pdfBase64);
    var bytes = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
    var url = URL.createObjectURL(new Blob([bytes], { type: "application/pdf" }));
    addChatMessage(section, copy.ready, false);

    var card = document.createElement("div");
    card.className = "bot-download-card";
    var title = document.createElement("strong");
    title.textContent = result.proposal.title;
    var ref = document.createElement("span");
    ref.textContent = result.reference;
    var link = document.createElement("a");
    link.href = url;
    link.download = result.fileName;
    link.textContent = copy.download;
    card.append(title, ref, link);
    section.querySelector(".falaq-chat-messages").appendChild(card);
    section.querySelector(".falaq-chat-messages").scrollTop = section.querySelector(".falaq-chat-messages").scrollHeight;
    renderBotSuggestions(section, [copy.again], function () { URL.revokeObjectURL(url); resetBot(section); });
    getBotState(section).phase = "complete";
  }

  function resetBot(section) {
    if (section.dataset.serviceKey) return resetServiceBot(section);
    var copy = getBotCopy();
    var gate = section.querySelector(".bot-contact-gate");
    if (gate) gate.remove();
    section._falaqAgentState = { phase: "intro", busy: false, questions: [], answers: [], questionIndex: 0 };
    section.querySelector(".falaq-chat-messages").innerHTML = "";
    addChatMessage(section, copy.hello, false);
    updateBotInput(section, copy.placeholder, true);
    renderBotSuggestions(section, copy.ideas, function (value) { submitBotValue(section, value); });
  }

  async function startBotAnalysis(section, value, preferredCategory) {
    var state = getBotState(section);
    var copy = getBotCopy();
    state.initialRequest = value;
    state.phase = "analyzing";
    setBotBusy(section, true);
    renderBotSuggestions(section, [], function () {});
    var typing = showBotTyping(section);
    try {
      var result = await postAgent("/api/agent/analyze", { language: currentBotLanguage(), message: value, preferredCategory: preferredCategory || "" });
      typing.remove();
      state.category = result.category;
      state.categoryLabel = result.categoryLabel;
      state.questions = result.questions;
      state.questionIndex = 0;
      state.answers = [];
      addChatMessage(section, result.acknowledgement, false);
      setBotBusy(section, false);
      window.setTimeout(function () { askBotQuestion(section); }, 280);
    } catch (error) {
      typing.remove();
      addChatMessage(section, error.message || copy.failed, false);
      state.phase = "intro";
      setBotBusy(section, false);
      renderBotSuggestions(section, copy.ideas, function (idea) { submitBotValue(section, idea); });
    }
  }

  function submitBotValue(section, value) {
    var state = getBotState(section);
    if (state.busy || !value) return;
    addChatMessage(section, value, true);
    if (state.phase === "intro") startBotAnalysis(section, value);
    else if (state.phase === "question") captureBotAnswer(section, value);
  }

  var SERVICE_CONTEXTS = {
    "lead-qualification": { ar: "استقبال وتأهيل العملاء", en: "Lead intake and qualification" },
    "quote-follow-up": { ar: "متابعة العروض والفرص", en: "Quote and opportunity follow-up" },
    "booking-recovery": { ar: "إدارة واستعادة الحجوزات", en: "Booking management and recovery" },
    "customer-service": { ar: "خدمة العملاء وتوجيه الطلبات", en: "Customer service and request routing" },
    "accounts-receivable": { ar: "متابعة تحصيل المستحقات", en: "Accounts receivable follow-up" },
    "document-processing": { ar: "معالجة وتنظيم المستندات", en: "Document processing and organization" },
    "crm-control": { ar: "تنظيم وتحديث CRM", en: "CRM organization and control" }
  };

  function getServiceContext() {
    var match = location.pathname.match(/\/services\/([^/]+)\/?$/);
    if (!match || !SERVICE_CONTEXTS[match[1]]) return null;
    return { key: match[1], labels: SERVICE_CONTEXTS[match[1]] };
  }

  function serviceBotCopy(context) {
    var ar = currentBotLanguage() === "ar";
    var title = context.labels[ar ? "ar" : "en"];
    return ar ? {
      title: title,
      hello: "مرحباً، أرى أنك تستكشف خدمة «" + title + "». هل تريد تخصيص هذه الخدمة لعملك، أم تبحث عن خدمة أخرى؟",
      customize: "تخصيص هذه الخدمة",
      other: "أبحث عن خدمة أخرى",
      otherPrompt: "بالتأكيد. صف لي العملية أو المشكلة التي تريد حلها وسأبني التصور المناسب.",
      request: "أريد تخصيص خدمة " + title + " لتناسب عملية شركتي.",
      launcher: "ابنِ خدمتك مع فلق بوت",
      close: "إغلاق المحادثة"
    } : {
      title: title,
      hello: "Hi, I see you’re exploring “" + title + "”. Would you like to customize this service for your business, or explore a different service?",
      customize: "Customize this service",
      other: "Explore another service",
      otherPrompt: "Of course. Describe the process or problem you want to solve and I’ll shape the right concept.",
      request: "I want to customize the " + title + " service for my company’s workflow.",
      launcher: "Build your service with Falaq Bot",
      close: "Close chat"
    };
  }

  function bindBotForm(section) {
    var form = section.querySelector(".bot-input-row");
    if (!form || form.dataset.bound === "true") return;
    form.dataset.bound = "true";
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var input = form.querySelector("input");
      var value = input.value.trim();
      if (!value) return;
      input.value = "";
      submitBotValue(section, value);
    });
  }

  function resetServiceBot(section) {
    var context = { key: section.dataset.serviceKey, labels: SERVICE_CONTEXTS[section.dataset.serviceKey] };
    var serviceCopy = serviceBotCopy(context);
    var copy = getBotCopy();
    var gate = section.querySelector(".bot-contact-gate");
    if (gate) gate.remove();
    section._falaqAgentState = { phase: "service-choice", busy: false, questions: [], answers: [], questionIndex: 0 };
    section.querySelector(".falaq-chat-messages").innerHTML = "";
    addChatMessage(section, serviceCopy.hello, false);
    updateBotInput(section, copy.placeholder, false);
    renderBotSuggestions(section, [serviceCopy.customize, serviceCopy.other], function (value) {
      var state = getBotState(section);
      if (state.busy || state.phase !== "service-choice") return;
      addChatMessage(section, value, true);
      if (value === serviceCopy.customize) {
        startBotAnalysis(section, serviceCopy.request, context.key);
      } else {
        state.phase = "intro";
        addChatMessage(section, serviceCopy.otherPrompt, false);
        updateBotInput(section, copy.placeholder, true);
        renderBotSuggestions(section, copy.ideas, function (idea) { submitBotValue(section, idea); });
      }
    });
    var launcherLabel = document.querySelector("[data-floating-bot-label]");
    var closeButton = document.querySelector("[data-floating-bot-close]");
    if (launcherLabel) launcherLabel.textContent = serviceCopy.launcher;
    if (closeButton) closeButton.setAttribute("aria-label", serviceCopy.close);
  }

  function createServiceBotLauncher() {
    var context = getServiceContext();
    if (!context || document.getElementById("falaq-floating-launcher")) return;

    var launcher = document.createElement("button");
    launcher.id = "falaq-floating-launcher";
    launcher.className = "falaq-floating-launcher";
    launcher.type = "button";
    launcher.setAttribute("aria-controls", "falaq-floating-chat");
    launcher.setAttribute("aria-expanded", "false");
    launcher.innerHTML = '<span class="floating-bot-robot">' + buildRobotMarkup() + '</span><span class="floating-bot-label" data-floating-bot-label></span>';

    var overlay = document.createElement("div");
    overlay.id = "falaq-floating-chat";
    overlay.className = "falaq-floating-overlay";
    overlay.hidden = true;
    overlay.innerHTML = [
      '<div class="falaq-floating-dialog" role="dialog" aria-modal="true" aria-label="Falaq Bot">',
      '<button type="button" class="floating-bot-close" data-floating-bot-close>×</button>',
      '<section id="falaq-service-bot" class="falaq-floating-bot is-awake" data-falaq-bot="service" data-service-key="' + context.key + '">',
      '<div class="falaq-chat-panel">',
      '<div class="bot-preview-badge" data-bot-copy="badge"></div>',
      '<div class="chat-top"><span class="chat-avatar">' + buildFalaqLogo() + '</span><span><b data-bot-copy="bot"></b><small><i></i><span data-bot-copy="status"></span></small></span></div>',
      '<div class="falaq-chat-messages"></div>',
      '<div class="bot-suggestions"></div>',
      '<form class="bot-input-row"><input type="text" maxlength="1500" autocomplete="off" data-bot-placeholder aria-label="Message Falaq Bot"><button type="submit" data-bot-copy="send"></button></form>',
      '</div></section></div>'
    ].join("");

    document.body.append(launcher, overlay);
    var section = overlay.querySelector("#falaq-service-bot");
    bindBotForm(section);
    updateBotInstanceLanguage(section);
    resetServiceBot(section);

    function openChat() {
      overlay.hidden = false;
      launcher.setAttribute("aria-expanded", "true");
      document.body.classList.add("bot-modal-open");
      window.setTimeout(function () { overlay.querySelector(".floating-bot-close").focus(); }, 20);
    }
    function closeChat() {
      overlay.hidden = true;
      launcher.setAttribute("aria-expanded", "false");
      document.body.classList.remove("bot-modal-open");
      launcher.focus();
    }
    launcher.addEventListener("click", openChat);
    overlay.querySelector(".floating-bot-close").addEventListener("click", closeChat);
    overlay.addEventListener("click", function (event) { if (event.target === overlay) closeChat(); });
    document.addEventListener("keydown", function (event) { if (event.key === "Escape" && !overlay.hidden) closeChat(); });
  }

  function createCustomBotSection() {
    if (!document.getElementById("agents") || document.getElementById("falaq-custom-bot")) return;
    var section = document.createElement("section");
    section.id = "falaq-custom-bot";
    section.className = "blk falaq-bot-section";
    section.dataset.falaqBot = "main";
    section.innerHTML = [
      '<div class="wrap">',
      '<div class="sec-head rv in falaq-bot-heading"><span class="kick" data-bot-copy="kick"></span><h2 data-bot-copy="title"></h2><p data-bot-copy="lead"></p></div>',
      '<div class="custom-bot-shell">',
      '<div class="bot-awakening-stage"><span class="bot-floor-ring"></span><div class="seated-falaq-robot">' + buildRobotMarkup() + '</div><span class="wake-signal"><span data-bot-copy="wake"></span> <i></i></span></div>',
      '<div class="falaq-chat-panel">',
      '<div class="bot-preview-badge" data-bot-copy="badge"></div>',
      '<div class="chat-top"><span class="chat-avatar">' + buildFalaqLogo() + '</span><span><b data-bot-copy="bot"></b><small><i></i><span data-bot-copy="status"></span></small></span></div>',
      '<div class="falaq-chat-messages"><div class="bot-message"><span class="mini-bot">' + buildRobotMarkup() + '</span><p data-bot-copy="hello"></p></div></div>',
      '<div class="bot-suggestions"></div>',
      '<form class="bot-input-row"><input type="text" maxlength="1500" autocomplete="off" data-bot-placeholder aria-label="Message Falaq Bot"><button type="submit" data-bot-copy="send"></button></form>',
      '</div></div></div>'
    ].join("");
    document.getElementById("agents").after(section);

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          section.classList.add("is-awake");
          observer.disconnect();
          setTimeout(function () {
            var host = section.querySelector(".seated-falaq-robot");
            var ar = currentBotLanguage() === "ar";
            if (host) host.dispatchEvent(new CustomEvent("falaq-cheer", {
              detail: ar ? "أهلاً! اكتب لي فكرتك في المحادثة 👋" : "Hi! Type your idea in the chat 👋"
            }));
          }, 1300);
        }
      });
    }, { threshold: .24 });
    observer.observe(section);

    attachRobotPersona(section.querySelector(".bot-awakening-stage"), section.querySelector(".seated-falaq-robot"));

    bindBotForm(section);
    updateCustomBotLanguage();
  }

  function addChatMessage(section, text, user) {
    var message = document.createElement("div");
    message.className = user ? "user-message" : "bot-message";
    if (!user) message.innerHTML = '<span class="mini-bot">' + buildRobotMarkup() + '</span>';
    var paragraph = document.createElement("p");
    paragraph.textContent = text;
    message.appendChild(paragraph);
    var messages = section.querySelector(".falaq-chat-messages");
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
  }

  function updateBotInstanceLanguage(section) {
    var copy = getBotCopy();
    Object.keys(copy).forEach(function (key) {
      if (key === "ideas") return;
      section.querySelectorAll('[data-bot-copy="' + key + '"]').forEach(function (element) { element.textContent = copy[key]; });
    });
    var state = getBotState(section);
    if (state.phase === "intro") {
      section.querySelector("[data-bot-placeholder]").placeholder = copy.placeholder;
      renderBotSuggestions(section, copy.ideas, function (idea) { submitBotValue(section, idea); });
    }
  }

  function updateCustomBotLanguage() {
    document.querySelectorAll("[data-falaq-bot]").forEach(function (section) {
      updateBotInstanceLanguage(section);
      if (section.dataset.serviceKey && getBotState(section).phase === "service-choice") resetServiceBot(section);
    });
  }

  function enhanceLandingMotion() {
    document.querySelectorAll("#dc-root section:not(.aether-flow-hero)").forEach(function (section) {
      Array.from(section.querySelectorAll("div")).forEach(function (element, index) {
        if (element.classList.contains("aether-live-surface")) return;
        var rect = element.getBoundingClientRect();
        var style = getComputedStyle(element);
        if (rect.width > 170 && rect.width < 620 && rect.height > 82 && rect.height < 520 && parseFloat(style.borderRadius) >= 8 && !element.querySelector("form")) {
          element.classList.add("aether-live-surface");
          element.style.setProperty("--live-delay", (index % 9) * -.47 + "s");
        }
      });
      section.querySelectorAll("svg").forEach(function (icon, index) {
        if (icon.closest(".falaq-robot-svg")) return;
        icon.classList.add("aether-live-icon");
        icon.style.setProperty("--icon-delay", (index % 7) * -.38 + "s");
      });
    });
  }

  var lastLanguage = "";
  function scan() {
    document.querySelectorAll(".aether-flow-hero").forEach(mount);
    applyBrandLogo();
    enhanceAgentConstellation();
    createCustomBotSection();
    createServiceBotLauncher();
    enhanceLandingMotion();
    var language = currentBotLanguage();
    if (language !== lastLanguage) {
      lastLanguage = language;
      updateCustomBotLanguage();
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", scan);
  else scan();

  new MutationObserver(scan).observe(document.documentElement, { childList: true, characterData: true, subtree: true });
})();
