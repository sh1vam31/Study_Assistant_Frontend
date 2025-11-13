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
    <form onSubmit={handleSubmit} className="bg-white/90 dark:bg-white/10 rounded-3xl p-8 transition-all duration-300 backdrop-blur-xl border border-gray-200 dark:border-white/20 shadow-xl">
      <div className="mb-4">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="What do you want to learn?"
          className="w-full px-6 py-4 bg-white dark:bg-white/10 border-2 border-gray-300 dark:border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-blue-200/60 transition-all duration-200 text-base"
          disabled={loading}
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          type="button"
          onClick={() => setMode('normal')}
          disabled={loading}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
            mode === 'normal'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-blue-200 hover:bg-gray-300 dark:hover:bg-white/20'
          }`}
        >
          📚 Normal
          {mode === 'normal' && <span className="ml-1">✕</span>}
        </button>
        <button
          type="button"
          onClick={() => setMode('math')}
          disabled={loading}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
            mode === 'math'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-blue-200 hover:bg-gray-300 dark:hover:bg-white/20'
          }`}
        >
          🧮 Math Mode
          {mode === 'math' && <span className="ml-1">✕</span>}
        </button>
      </div>

      <button
        type="submit"
        disabled={loading || !topic.trim()}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Generating...</span>
          </>
        ) : (
          <>
            <span>✨</span>
            <span>Generate Study Material</span>
          </>
        )}
      </button>
    </form>
  );
}

export default SearchForm;
