(function () {
    const root = document.documentElement;
    const toggle = document.getElementById("themeToggle");
    const icon = document.getElementById("themeIcon");

    function applyTheme(theme) {
        root.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
        icon.textContent = theme === "dark" ? "☀" : "☾";
    }

    function initTheme() {
        const saved = localStorage.getItem("theme");
        if (saved) {
            applyTheme(saved);
        }
    }

    toggle?.addEventListener("click", () => {
        const current = root.getAttribute("data-theme");
        applyTheme(current === "dark" ? "light" : "dark");
    });

    initTheme();
})();