// The agent page's two phases.
//
// Rest: the agent stands alone with one wide input. Nothing else competes.
// Live: the first message wakes the workspace — the figure folds into a slim
// rail and the console unfolds beside it.
//
// The conversation itself is not reimplemented here. This is staging only; the
// tested console in agent-console.js does the talking, and receives the opening
// message through its own send(). One implementation, two presentations.
(function () {
  "use strict";

  var COPY = {
    ar: {
      examplesLabel: "أو ابدأ من هنا",
      thinking: "يستمع…",
      reset: "محادثة جديدة"
    },
    en: {
      examplesLabel: "Or start here",
      thinking: "Listening…",
      reset: "New conversation"
    }
  };

  function boot(root, lang) {
    if (!root) return;
    var copy = COPY[lang] || COPY.ar;
    var restForm = root.querySelector("[data-rest-form]");
    var restInput = root.querySelector("[data-rest-input]");
    var consoleHost = root.querySelector("[data-console]");
    var resetBtn = root.querySelector("[data-reset]");
    var api = null;

    // The console is mounted on demand rather than at load. Until someone
    // speaks there is nothing to show, and an unmounted panel cannot flash
    // empty state at a visitor who is still reading.
    function wake(text) {
      if (root.dataset.phase === "live") return;
      root.dataset.phase = "live";
      if (!api && window.FalaqConsole) {
        api = window.FalaqConsole.mount(consoleHost, lang);
      }
      if (api && text) {
        // Let the layout settle before the first request, so the transition
        // is not competing with a network round trip for the same frames.
        window.setTimeout(function () { api.send(text); }, 260);
      }
    }

    if (restForm) {
      restForm.addEventListener("submit", function (event) {
        event.preventDefault();
        var text = (restInput.value || "").trim();
        if (text) wake(text);
      });
    }

    if (restInput) {
      restInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();
          restForm.requestSubmit();
        }
      });
      restInput.addEventListener("input", function () {
        restInput.style.height = "auto";
        restInput.style.height = Math.min(restInput.scrollHeight, 132) + "px";
        root.classList.toggle("is-typing", restInput.value.trim().length > 0);
      });
    }

    root.addEventListener("click", function (event) {
      var chip = event.target.closest("[data-example]");
      if (chip) wake(chip.getAttribute("data-example"));
    });

    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        if (api && api.destroy) api.destroy();
        api = null;
        consoleHost.innerHTML = "";
        restInput.value = "";
        restInput.style.height = "auto";
        root.classList.remove("is-typing");
        root.dataset.phase = "rest";
        restInput.focus();
      });
    }

    // Wake the API while the visitor is still reading the rest state, so the
    // first real message does not pay for a cold start.
    var cfg = window.FALAQ_CONFIG || {};
    var base = (cfg.agentApiBase || "").replace(/\/$/, "");
    fetch(base + "/api/agent/status", { cache: "no-store" }).catch(function () {});
  }

  window.FalaqStage = { boot: boot };
})();
