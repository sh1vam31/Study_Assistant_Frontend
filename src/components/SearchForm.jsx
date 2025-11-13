import { useState } from 'react';

function SearchForm({ onSearch, loading }) {
  const [topic, setTopic] = useState('');
  const [mode, setMode] = useState('normal');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (topic.trim()) {
      onSearch(topic.trim(), mode);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-200 hover:shadow-xl border border-gray-200 dark:border-gray-700">
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-200 text-sm font-semibold mb-2">
          What do you want to learn?
        </label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., Photosynthesis, World War II, Python Programming"
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
          disabled={loading}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-200 text-sm font-semibold mb-2">
          Study Mode
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className={`flex items-center justify-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
            mode === 'normal'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}>
            <input
              type="radio"
              value="normal"
              checked={mode === 'normal'}
              onChange={(e) => setMode(e.target.value)}
              className="sr-only"
              disabled={loading}
            />
            <span className="font-medium">📚 Normal</span>
          </label>
          <label className={`flex items-center justify-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
            mode === 'math'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}>
            <input
              type="radio"
              value="math"
              checked={mode === 'math'}
              onChange={(e) => setMode(e.target.value)}
              className="sr-only"
              disabled={loading}
            />
            <span className="font-medium">🧮 Math Mode</span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !topic.trim()}
        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-lg disabled:hover:shadow-none"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </span>
        ) : (
          'Generate Study Material'
        )}
      </button>
    </form>
  );
}

export default SearchForm;
