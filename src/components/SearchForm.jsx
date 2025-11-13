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
    <form onSubmit={handleSubmit} className="glass-card-strong rounded-3xl p-8 transition-all duration-300 backdrop-blur-xl border border-white/20">
      <div className="mb-4">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="What do you want to learn?"
          className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 text-white placeholder-blue-200/60 transition-all duration-200 text-base backdrop-blur-sm"
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
              ? 'bg-blue-500/80 text-white'
              : 'bg-white/10 text-blue-200 hover:bg-white/20'
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
              ? 'bg-blue-500/80 text-white'
              : 'bg-white/10 text-blue-200 hover:bg-white/20'
          }`}
        >
          🧮 Math Mode
          {mode === 'math' && <span className="ml-1">✕</span>}
        </button>
      </div>

      <button
        type="submit"
        disabled={loading || !topic.trim()}
        className="w-full bg-blue-500/80 hover:bg-blue-500 disabled:bg-gray-500/50 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
