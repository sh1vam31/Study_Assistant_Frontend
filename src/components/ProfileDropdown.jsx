import { useState, useRef, useEffect } from 'react';

function ProfileDropdown({ user, darkMode, setDarkMode, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-white/20 rounded-lg px-3 py-2 hover:bg-white dark:hover:bg-white/20 transition-all duration-300"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
          {user.name?.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-medium text-gray-800 dark:text-white hidden md:block">
          {user.name}
        </span>
        <svg 
          className={`w-4 h-4 text-gray-600 dark:text-gray-300 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-slide-down z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-800 dark:text-white">
              {user.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {user.email}
            </p>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => {
                setDarkMode(!darkMode);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <span className="text-xl">
                {darkMode ? '☀️' : '🌙'}
              </span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </span>
            </button>

            {/* Logout */}
            <button
              onClick={() => {
                onLogout();
                setIsOpen(false);
              }}
              className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 text-red-600 dark:text-red-400"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="text-sm font-medium">
                Logout
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;
