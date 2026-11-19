/* Small enhancements only. Every page reads fine without this file. */
(function () {
  var doc = document, root = doc.documentElement;

  // Status badges, GitHub links and "not public yet" notes, from assets/tools.js.
  var tools = window.TOOLS || {};
  Object.keys(tools).forEach(function (name) {
    var tool = tools[name];
    if (!tool || !tool.public) return;
    doc.querySelectorAll('[data-status="' + name + '"]').forEach(function (el) {
      el.textContent = "Public";
      el.classList.add("is-public");
    });
    doc.querySelectorAll('[data-repo="' + name + '"]').forEach(function (el) {
      el.href = "https://github.com/" + tool.repo;
      el.hidden = false;
    });
    doc.querySelectorAll('[data-private="' + name + '"]').forEach(function (el) { el.hidden = true; });
  });

  // Theme toggle. The choice is kept in localStorage; with none, the system setting decides.
  var btn = doc.querySelector(".theme-btn");
  if (btn) {
    var dark = function () {
      var set = root.getAttribute("data-theme");
      if (set) return set === "dark";
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    };
    var label = function () {
      btn.textContent = dark() ? "Light theme" : "Dark theme";
    };
    btn.hidden = false;
    label();
    btn.addEventListener("click", function () {
      var next = dark() ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) { /* private mode: the choice lasts for this page */ }
      label();
    });
  }

  // Copy buttons on command blocks. In a terminal example only the command lines are copied.
  if (navigator.clipboard) {
    doc.querySelectorAll(".cmd, .term").forEach(function (box) {
      var pre = box.querySelector("pre");
      if (!pre) return;
      var cmds = pre.querySelectorAll(".c");
      if (box.classList.contains("term") && !cmds.length) return;
      var b = doc.createElement("button");
      b.type = "button";
      b.className = "copy";
      b.textContent = "Copy";
      b.addEventListener("click", function () {
        var text = cmds.length
          ? Array.prototype.map.call(cmds, function (c) { return c.textContent; }).join("\n")
          : pre.textContent;
        navigator.clipboard.writeText(text.replace(/\s+$/, "")).then(function () {
          b.textContent = "Copied";
          setTimeout(function () { b.textContent = "Copy"; }, 1600);
        });
      });
      var bar = box.querySelector(".bar");
      if (bar) { bar.appendChild(b); } else { box.classList.add("has-copy"); box.appendChild(b); }
    });
  }
})();
