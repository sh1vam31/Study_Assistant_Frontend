function TopicHistory({ history, onSelect, onClear, onClose }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-hidden flex flex-col animate-slide-up">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            📚 Study History
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl transition-transform hover:scale-110"
          >
            ×
          </button>
        </div>

        {history.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p className="text-4xl mb-2">📖</p>
            <p>No study history yet</p>
            <p className="text-sm mt-2">Start learning to build your history!</p>
          </div>
        ) : (
          <>
            <div className="overflow-y-auto flex-1 space-y-2 mb-4">
              {history.map((item, index) => (
                <div
                  key={item._id || item.id}
                  onClick={() => onSelect(item)}
                  className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900 transition-all duration-300 hover:scale-102 animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 dark:text-white">
                        {item.topic}
                      </p>
                      <div className="flex gap-2 mt-1">
                        <span className="text-xs px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded">
                          {item.mode}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(item.createdAt || item.timestamp)}
                        </span>
                      </div>
                    </div>
                    <span className="text-xl">→</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={onClear}
              className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
            >
              Clear History
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TopicHistory;
