(function () {
  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");
  var stored = localStorage.getItem("theme");
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  var theme = stored || (prefersDark ? "dark" : "light");

  applyTheme(theme);

  toggle.addEventListener("click", function () {
    theme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  });

  function applyTheme(t) {
    root.setAttribute("data-theme", t);
    toggle.textContent = t === "dark" ? "Light mode" : "Dark mode";
  }

  // Scroll-spy nav highlighting
  var sections = document.querySelectorAll("main section[id]");
  var navLinks = document.querySelectorAll(".sidebar-nav a");

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        var link = document.querySelector('.sidebar-nav a[href="#' + entry.target.id + '"]');
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach(function (l) { l.classList.remove("active"); });
          link.classList.add("active");
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px" }
  );

  sections.forEach(function (s) { observer.observe(s); });
})();
