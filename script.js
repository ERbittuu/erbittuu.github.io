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
            applyTheme("dark"); // default dark
        }
    }

    toggle?.addEventListener("click", () => {
        const current = root.getAttribute("data-theme");
        applyTheme(current === "dark" ? "light" : "dark");
    });

    window.addEventListener("load", () => {
        loader.classList.add("hidden");
    });

    // Scroll reveal
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll(".reveal").forEach(el => {
        observer.observe(el);
    });

    initTheme();
})();