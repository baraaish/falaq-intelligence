// Renders the fixed Falaq agent shape: receive, check, decide, act, log.
//
// Deliberately not a general graph library. Every agent follows this one shape,
// so a ~100 line renderer replaces an 800 KB dependency and stays on-brand.
// The same function draws the pre-baked sector flows and anything the advisor
// returns, because both speak the schema in content/agent-flows.js.
(function () {
  "use strict";

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function node(kind, label, text) {
    return '<li class="fx-node fx-' + kind + '">'
      + '<span class="fx-label">' + esc(label) + "</span>"
      + (text ? '<span class="fx-text">' + esc(text) + "</span>" : "")
      + "</li>";
  }

  // `flow` is one language's entry from content/agent-flows.js.
  function markup(flow, strings) {
    if (!flow) return "";
    var s = strings || {};
    var steps = (flow.steps || []).map(function (step, index) {
      return node("step", (s.step || "Step") + " " + String(index + 1), step);
    }).join("");

    return '<ol class="fx">'
      + node("trigger", s.trigger || "Arrives from", flow.trigger)
      + steps
      + node("decision", s.decision || "Checks", flow.decision)
      + '<li class="fx-fork"><ul class="fx-branches">'
      + '<li class="fx-branch fx-yes"><span class="fx-tag">' + esc(flow.yes.label) + "</span>"
      + '<span class="fx-text">' + esc(flow.yes.action) + "</span></li>"
      + '<li class="fx-branch fx-no"><span class="fx-tag">' + esc(flow.no.label) + "</span>"
      + '<span class="fx-text">' + esc(flow.no.action) + "</span></li>"
      + "</ul></li>"
      + node("log", s.log || "Recorded", flow.log)
      + "</ol>";
  }

  function render(target, flow, strings) {
    var host = typeof target === "string" ? document.querySelector(target) : target;
    if (!host) return null;
    host.innerHTML = markup(flow, strings);
    // Re-trigger the entrance animation when a different sector is chosen.
    host.classList.remove("fx-in");
    void host.offsetWidth;
    host.classList.add("fx-in");
    return host;
  }

  // Browser: the home page picker draws flows on demand.
  // Node: the page generators call markup() so service pages ship the diagram
  // as static HTML. One implementation, so the two can never diverge.
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { markup: markup };
  }
  if (typeof window !== "undefined") {
    window.FalaqFlow = { render: render, markup: markup };
  }
})();
