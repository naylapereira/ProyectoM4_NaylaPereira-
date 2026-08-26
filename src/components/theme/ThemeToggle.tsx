import { useTheme } from "../../hooks/useTheme";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
      data-tooltip={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}

export default ThemeToggle;