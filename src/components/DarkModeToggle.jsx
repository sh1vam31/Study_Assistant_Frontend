function DarkModeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow hover:shadow-md transition-all duration-200"
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <span className="text-xl">☀️</span>
      ) : (
        <span className="text-xl">🌙</span>
      )}
    </button>
  );
}

export default DarkModeToggle;
