(function () {
    "use strict";

    const root = document.documentElement;
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");
    const header = document.querySelector(".header");
    const STORAGE_KEY = "site-theme";

    function getPreferredTheme() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return stored;

        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    }

    function applyTheme(theme) {
        root.setAttribute("data-theme", theme);
        localStorage.setItem(STORAGE_KEY, theme);
        themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
    }

    themeToggle?.addEventListener("click", () => {
        const current = root.getAttribute("data-theme");
        applyTheme(current === "dark" ? "light" : "dark");
    });

    applyTheme(getPreferredTheme());

    window.addEventListener("scroll", () => {
        if (!header) return;
        header.classList.toggle("header-elevated", window.scrollY > 10);
    }, { passive: true });

})();