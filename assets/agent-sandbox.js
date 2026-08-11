// Runs Falaq's four published rules against inputs the visitor sets, and shows
// which rule fired and why.
//
// Everything here is deterministic and runs in the browser: no request, no
// tokens, and no invented numbers. The score is arithmetic the visitor can
// follow from their own choices, which is the point — the site's four rules are
// written as claims elsewhere, and this is where they execute.
(function () {
  "use strict";

  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function isWeak(agent, input, value) {
    var weak = (agent.weak || {})[input.id];
    return !!weak && weak.indexOf(value) !== -1;
  }

  // An input counts as answered once the visitor has established it. A false
  // toggle is an answer of "no", which leaves the mandatory field unmet.
  function answered(input, value) {
    if (input.type === "range") return Number(value) > 0;
    if (input.type === "choice") return value !== "" && value != null;
    return value === true;
  }

  function display(input, value, lang) {
    var copy = input[lang] || {};
    if (input.type === "range") {
      return Number(value) > 0 ? Number(value).toLocaleString(lang === "ar" ? "ar-JO" : "en-US") + " " + (copy.unit || "") : (copy.empty || "—");
    }
    if (input.type === "choice") {
      var hit = (copy.options || []).filter(function (o) { return o.v === value; })[0];
      return hit ? hit.l : (copy.empty || "—");
    }
    return value === true ? (lang === "ar" ? "نعم" : "Yes") : (lang === "ar" ? "لا" : "No");
  }

  function evaluate(agent, state, lang) {
    var inputs = agent.inputs.filter(function (i) { return !i.conflict; });
    var conflictInput = agent.inputs.filter(function (i) { return i.conflict; })[0];
    var conflicted = conflictInput ? state[conflictInput.id] === true : false;

    var score = 0;
    var extracted = [];
    var missing = [];

    inputs.forEach(function (input) {
      var value = state[input.id];
      var ok = answered(input, value);
      var weak = isWeak(agent, input, value);
      if (ok && !weak) score += input.weight;
      if (!ok && agent.required.indexOf(input.id) !== -1) missing.push(input[lang].label);
      extracted.push({ label: input[lang].label, value: display(input, value, lang), ok: ok, weak: weak });
    });

    var copy = agent[lang];
    var fired = [];
    var decision;

    // Rule 03 outranks the rest: a conflict must never resolve automatically.
    if (conflicted) {
      fired.push({ key: "r3", detail: conflictInput[lang].label });
      decision = { state: "review", label: copy.blocked, action: copy.actionWarm, handoff: copy.handoffReview, score: null };
    } else if (missing.length) {
      fired.push({ key: "r1", detail: missing.join(lang === "ar" ? "، " : ", ") });
      decision = { state: "blocked", label: copy.blocked, action: null, handoff: null, score: null };
    } else if (score >= agent.threshold) {
      fired.push({ key: "r2", detail: score + " / " + agent.threshold });
      decision = { state: "hot", label: copy.hot, action: copy.actionHot, handoff: copy.handoffHot, score: score };
    } else {
      decision = { state: "warm", label: copy.warm, action: copy.actionWarm, handoff: null, score: score };
    }

    // Rule 04 always applies, including to the cases the agent refused.
    fired.push({ key: "r4", detail: null });
    return { score: score, extracted: extracted, fired: fired, decision: decision };
  }

  function controlsHtml(agent, state, lang) {
    return agent.inputs.map(function (input) {
      var copy = input[lang];
      var value = state[input.id];
      var body;
      if (input.type === "range") {
        body = '<input type="range" min="' + input.min + '" max="' + input.max + '" step="' + input.step + '" value="' + Number(value) + '" data-sb="' + input.id + '">'
          + '<output>' + esc(display(input, value, lang)) + "</output>";
      } else if (input.type === "choice") {
        body = '<div class="sb-choice">' + (copy.options || []).map(function (o) {
          return '<button type="button" data-sb="' + input.id + '" data-value="' + esc(o.v) + '" class="' + (value === o.v ? "on" : "") + '">' + esc(o.l) + "</button>";
        }).join("") + "</div>";
      } else {
        body = '<button type="button" role="switch" aria-checked="' + (value === true) + '" data-sb="' + input.id + '" data-toggle="1" class="sb-toggle ' + (value === true ? "on" : "") + '"><span></span></button>';
      }
      return '<div class="sb-row' + (input.conflict ? " sb-conflict" : "") + '"><span class="sb-name">' + esc(copy.label) + "</span>" + body + "</div>";
    }).join("");
  }

  function panelHtml(result, ruleText, strings) {
    var d = result.decision;
    var rows = result.extracted.map(function (x) {
      var mark = x.ok ? (x.weak ? "~" : "✓") : "—";
      return '<li class="sb-x' + (x.ok ? (x.weak ? " weak" : " ok") : "") + '"><span>' + esc(x.label) + "</span><b>" + esc(x.value) + "</b><i>" + mark + "</i></li>";
    }).join("");

    var rules = result.fired.map(function (f) {
      var r = ruleText[f.key];
      return '<li class="sb-rule"><span class="sb-rid">' + esc(r.id) + "</span><div><b>" + esc(r.name) + "</b>"
        + (f.detail ? '<em>' + esc(f.detail) + "</em>" : "")
        + "<span>" + esc(r.why) + "</span></div></li>";
    }).join("");

    return '<div class="sb-panel-in">'
      + '<h4>' + esc(strings.extracted) + "</h4><ul class=\"sb-extracted\">" + rows + "</ul>"
      + '<h4>' + esc(strings.rules) + "</h4><ul class=\"sb-rules\">" + rules + "</ul>"
      + '<div class="sb-decision sb-' + d.state + '">'
      + '<span class="sb-tag">' + esc(d.label) + "</span>"
      + (d.score != null ? '<span class="sb-score">' + d.score + "<small>/100</small></span>" : "")
      + (d.action ? '<p>' + esc(d.action) + "</p>" : "")
      + (d.handoff ? '<p class="sb-handoff"><b>' + esc(strings.handoff) + ":</b> " + esc(d.handoff) + "</p>" : "")
      + "</div></div>";
  }

  function mount(host, agent, ruleText, strings, lang) {
    if (!host) return null;
    if (typeof host.__falaqSandboxDestroy === "function") host.__falaqSandboxDestroy();
    if (!agent) {
      host.innerHTML = "";
      return null;
    }
    var state = {};
    agent.inputs.forEach(function (i) { state[i.id] = i.value; });

    host.innerHTML = '<div class="sb"><div class="sb-controls">' + controlsHtml(agent, state, lang)
      + '</div><div class="sb-panel" aria-live="polite"></div></div>';
    var panel = host.querySelector(".sb-panel");

    function refresh() {
      panel.innerHTML = panelHtml(evaluate(agent, state, lang), ruleText, strings);
    }

    function onInput(e) {
      var id = e.target.getAttribute && e.target.getAttribute("data-sb");
      if (!id || e.target.type !== "range") return;
      state[id] = Number(e.target.value);
      var input = agent.inputs.filter(function (i) { return i.id === id; })[0];
      var out = e.target.parentNode.querySelector("output");
      if (out) out.textContent = display(input, state[id], lang);
      refresh();
    }

    function onClick(e) {
      var btn = e.target.closest("[data-sb]");
      if (!btn || btn.tagName !== "BUTTON") return;
      var id = btn.getAttribute("data-sb");
      if (btn.hasAttribute("data-toggle")) {
        state[id] = !state[id];
        btn.classList.toggle("on", state[id]);
        btn.setAttribute("aria-checked", String(state[id]));
      } else {
        var picked = btn.getAttribute("data-value");
        state[id] = state[id] === picked ? "" : picked;
        btn.parentNode.querySelectorAll("button").forEach(function (b) {
          b.classList.toggle("on", b.getAttribute("data-value") === state[id]);
        });
      }
      refresh();
    }

    function destroy() {
      host.removeEventListener("input", onInput);
      host.removeEventListener("click", onClick);
      if (host.__falaqSandboxDestroy === destroy) delete host.__falaqSandboxDestroy;
    }

    host.addEventListener("input", onInput);
    host.addEventListener("click", onClick);
    host.__falaqSandboxDestroy = destroy;

    refresh();
    return { evaluate: function () { return evaluate(agent, state, lang); }, destroy: destroy };
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { evaluate: evaluate };
  }
  if (typeof window !== "undefined") {
    window.FalaqSandbox = { mount: mount, evaluate: evaluate };
  }
})();
