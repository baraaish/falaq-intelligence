// Choreography for the live console: the reply types itself, the extracted
// fields light one at a time, and the agent's published workflow assembles
// step by step while that happens.
//
// Honesty note: the API answers in well under a second and returns everything
// at once. Nothing here invents latency or content — it paces the reveal of
// data that has already arrived, at roughly reading speed, and a click skips
// straight to the end. The workflow drawn is the real published flow for the
// category the model chose, from content/agent-flows.js.
(function () {
  "use strict";

  var CHAR_MS = 14;        // per character; ~200 chars lands near 3s
  var CHUNK = 2;           // characters per tick, keeps the timer count low
  var FIELD_MS = 90;       // gap between field reveals
  var STEP_MS = 260;       // gap between workflow steps

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ── Typing ────────────────────────────────────────────────────────────────
  // Writes into a text node so the surrounding markup, direction and any
  // existing timestamp stay untouched.
  function type(el, text, done) {
    if (!el) return function () {};
    if (reduced) { el.textContent = text; if (done) done(); return function () {}; }

    var i = 0;
    var timer = 0;
    el.textContent = "";
    el.classList.add("is-typing");

    function finish() {
      window.clearInterval(timer);
      el.textContent = text;
      el.classList.remove("is-typing");
      if (done) done();
    }

    timer = window.setInterval(function () {
      i += CHUNK;
      el.textContent = text.slice(0, i);
      if (i >= text.length) finish();
    }, CHAR_MS);

    // Impatience is a legitimate preference: one click ends the animation.
    el.addEventListener("click", finish, { once: true });
    return finish;
  }

  // ── Field reveal ──────────────────────────────────────────────────────────
  // Only newly filled fields animate. A field that was already lit must not
  // flash again on every turn, or the panel reads as noise.
  function revealFields(host, changedIds) {
    if (!host || !changedIds || !changedIds.length) return;
    changedIds.forEach(function (id, index) {
      var el = host.querySelector('[data-field="' + id + '"]');
      if (!el) return;
      el.classList.remove("just-lit");
      window.setTimeout(function () {
        el.classList.add("just-lit");
      }, reduced ? 0 : index * FIELD_MS);
    });
  }

  // ── Workflow assembly ─────────────────────────────────────────────────────
  // Renders the flow for a category, then unhides one node at a time so the
  // shape builds rather than appearing whole.
  function buildFlow(host, flow, strings, onDone) {
    if (!host || !flow || !window.FalaqFlow) return;
    host.innerHTML = window.FalaqFlow.markup(flow, strings || {});
    var steps = Array.prototype.slice.call(host.querySelectorAll(".fx > li"));
    if (!steps.length) return;

    if (reduced) {
      steps.forEach(function (s) { s.classList.add("is-in"); });
      if (onDone) onDone();
      return;
    }

    steps.forEach(function (s) { s.classList.add("is-pending"); });
    steps.forEach(function (step, index) {
      window.setTimeout(function () {
        step.classList.remove("is-pending");
        step.classList.add("is-in");
        if (index === steps.length - 1 && onDone) onDone();
      }, index * STEP_MS);
    });
  }


  // ── Annotations ───────────────────────────────────────────────────────────
  // The inspector used to be a third column of rules, events and node details.
  // None of it needed its own column: each item belongs to a specific step, so
  // it now hangs off that step and lights only once the step is satisfied.
  //
  // `notes` is [{ at, label, text, satisfied }] where `at` selects the node:
  // "trigger" | "step:N" | "decision" | "yes" | "no" | "log".
  function annotate(host, notes) {
    if (!host || !notes) return;
    host.querySelectorAll(".fx-note").forEach(function (n) { n.remove(); });

    var nodes = Array.prototype.slice.call(host.querySelectorAll(".fx > li"));
    if (!nodes.length) return;

    function target(at) {
      if (at === "trigger") return nodes[0];
      if (at === "log") return nodes[nodes.length - 1];
      if (at === "decision") return host.querySelector(".fx-decision");
      if (at === "yes") return host.querySelector(".fx-yes");
      if (at === "no") return host.querySelector(".fx-no");
      var m = /^step:(\d+)$/.exec(at || "");
      return m ? nodes[Number(m[1])] : null;
    }

    notes.forEach(function (note, index) {
      var el = target(note.at);
      if (!el) return;
      var tag = document.createElement("span");
      tag.className = "fx-note" + (note.satisfied ? " is-on" : "");
      tag.innerHTML = '<i></i><span><b>' + esc(note.label) + "</b>"
        + (note.text ? "<em>" + esc(note.text) + "</em>" : "") + "</span>";
      el.appendChild(tag);
      if (note.satisfied && !reduced) {
        window.setTimeout(function () { tag.classList.add("just-on"); }, 120 + index * 140);
      }
    });
  }

  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  window.FalaqChoreo = { type: type, revealFields: revealFields, buildFlow: buildFlow, annotate: annotate, reduced: reduced };
})();
