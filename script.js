const toggle = document.getElementById("themeToggle");
const root = document.documentElement;

function setTheme(theme) {
    if (theme === "dark") {
        root.setAttribute("data-theme", "dark");
    } else {
        root.removeAttribute("data-theme");
    }
    localStorage.setItem("theme", theme);
}

function getPreferredTheme() {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
}

setTheme(getPreferredTheme());

toggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") === "dark"
        ? "dark"
        : "light";
    setTheme(current === "dark" ? "light" : "dark");
});