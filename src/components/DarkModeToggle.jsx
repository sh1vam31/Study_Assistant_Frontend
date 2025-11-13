function DarkModeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2.5 rounded-lg bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 backdrop-blur-sm border border-gray-200 dark:border-white/20 transition-all duration-300"
      aria-label="Toggle dark mode"
    >
      <span className="text-xl">
        {darkMode ? '☀️' : '🌙'}
      </span>
    </button>
  );
}

export default DarkModeToggle;
