(function () {
    const root = document.documentElement;
    const toggle = document.getElementById("themeToggle");
    const icon = document.getElementById("themeIcon");
    const loader = document.getElementById("loader");

    function applyTheme(theme) {
        root.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
        icon.textContent = theme === "dark" ? "☀" : "☾";
    }

    function initTheme() {
        const saved = localStorage.getItem("theme");
        if (saved) {
            applyTheme(saved);
        } else {
            applyTheme(
                window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "dark"
                    : "light"
            );
        }
    }

    toggle?.addEventListener("click", () => {
        const current = root.getAttribute("data-theme");
        applyTheme(current === "dark" ? "light" : "dark");
    });

    window.addEventListener("load", () => {
        setTimeout(() => {
            loader.classList.add("hidden");
        }, 400);
    });

    initTheme();
})();