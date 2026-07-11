(function () {
  var root = document.documentElement;
  var btn = document.getElementById("theme-btn");
  var moonIcon = document.getElementById("icon-moon");
  var sunIcon = document.getElementById("icon-sun");

  var stored = localStorage.getItem("theme");
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  var theme = stored || (prefersDark ? "dark" : "light");
  applyTheme(theme);

  if (btn) {
    btn.addEventListener("click", function () {
      theme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(theme);
      localStorage.setItem("theme", theme);
    });
  }

  function applyTheme(t) {
    root.setAttribute("data-theme", t);
    if (moonIcon && sunIcon) {
      moonIcon.style.display = t === "dark" ? "none" : "block";
      sunIcon.style.display = t === "dark" ? "block" : "none";
    }
  }

  // Scroll-spy: highlight active top-nav link
  var sections = document.querySelectorAll("main section[id]");
  var navLinks = document.querySelectorAll(".topnav-links a");

  if (sections.length && navLinks.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = document.querySelector('.topnav-links a[href="#' + entry.target.id + '"]');
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach(function (l) { l.classList.remove("active"); });
          link.classList.add("active");
        }
      });
    }, { rootMargin: "-40% 0px -50% 0px" });

    sections.forEach(function (s) { observer.observe(s); });
  }
})();
