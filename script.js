const toggle = document.getElementById("themeToggle");
const icon = document.getElementById("themeIcon");
const root = document.documentElement;

function applyTheme(theme) {
    if (theme === "dark") {
        root.setAttribute("data-theme", "dark");
        icon.textContent = "☀️";
    } else {
        root.removeAttribute("data-theme");
        icon.textContent = "🌙";
    }
    localStorage.setItem("theme", theme);
}

function detectTheme() {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
}

applyTheme(detectTheme());

toggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") === "dark"
        ? "dark"
        : "light";
    applyTheme(current === "dark" ? "light" : "dark");
});