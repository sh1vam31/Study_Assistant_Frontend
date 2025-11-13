function DarkModeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2.5 rounded-lg glass-card hover:bg-white/20 transition-all duration-300"
      aria-label="Toggle dark mode"
    >
      <span className="text-xl">
        {darkMode ? '☀️' : '🌙'}
      </span>
    </button>
  );
}

export default DarkModeToggle;
