import { useState, useEffect } from 'react';
import SearchForm from './components/SearchForm';
import StudyContent from './components/StudyContent';
import DarkModeToggle from './components/DarkModeToggle';
import TopicHistory from './components/TopicHistory';
import AuthModal from './components/AuthModal';
import { useAuth } from './hooks/useAuth';
import { useLocalStorage } from './hooks/useLocalStorage';

const API_URL = import.meta.env.VITE_API_URL || 'https://study-assistant-backend.vercel.app';
function App() {
  const [studyData, setStudyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
  const [showHistory, setShowHistory] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [history, setHistory] = useState([]);
  
  const { user, login, signup, logout, isAuthenticated, loading: authLoading, getToken } = useAuth();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleSearch = async (topic, mode) => {
    if (!isAuthenticated) {
      setError('Please login to use the study assistant');
      setShowAuthModal(true);
      return;
    }

    setLoading(true);
    setError(null);
    setStudyData(null);

    try {
      const token = getToken();
      const response = await fetch(
        `${API_URL}/study?topic=${encodeURIComponent(topic)}&mode=${mode}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 401) {
          logout();
          setShowAuthModal(true);
          throw new Error('Session expired. Please login again.');
        }
        throw new Error(errorData.error || 'Failed to fetch study material');
      }

      const data = await response.json();
      setStudyData(data);

      // Fetch updated history from server
      fetchHistory();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async () => {
    if (!isAuthenticated) return;

    try {
      const token = getToken();
      const response = await fetch(`${API_URL}/study/history`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setHistory(data.history || []);
      }
    } catch (err) {
      console.error('Failed to fetch history:', err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchHistory();
    } else {
      setHistory([]);
    }
  }, [isAuthenticated]);

  const handleHistorySelect = (item) => {
    handleSearch(item.topic, item.mode);
    setShowHistory(false);
  };

  const handleClearHistory = async () => {
    if (!isAuthenticated) return;

    try {
      const token = getToken();
      const response = await fetch(`${API_URL}/study/history`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setHistory([]);
      }
    } catch (err) {
      console.error('Failed to clear history:', err);
    }
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-8 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-2xl">🎓</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                  Smart Study Assistant
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">AI-Powered Learning</p>
              </div>
            </div>
            
            <div className="flex gap-2 items-center">
              {isAuthenticated && (
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="relative p-2 rounded-lg bg-white dark:bg-gray-800 shadow hover:shadow-md transition-all duration-200"
                  title="View History"
                >
                  <span className="text-xl">📚</span>
                  {history.length > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                      {history.length}
                    </div>
                  )}
                </button>
              )}
              
              <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
              
              {isAuthenticated ? (
                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg shadow px-3 py-2">
                  <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden md:block">
                    {user.name}
                  </span>
                  <button
                    onClick={logout}
                    className="ml-2 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200 shadow hover:shadow-md"
                >
                  Login
                </button>
              )}
            </div>
          </div>

          {/* History Sidebar */}
          {showHistory && (
            <TopicHistory
              history={history}
              onSelect={handleHistorySelect}
              onClear={handleClearHistory}
              onClose={() => setShowHistory(false)}
            />
          )}

          {/* Auth Modal */}
          {showAuthModal && (
            <AuthModal
              onClose={() => setShowAuthModal(false)}
              onLogin={login}
              onSignup={signup}
            />
          )}

          {/* Show loading while checking auth */}
          {authLoading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
            </div>
          )}

          <div className="animate-fade-in-up">
            <SearchForm onSearch={handleSearch} loading={loading} />
          </div>

          {loading && (
            <div className="text-center py-12 animate-fade-in">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Generating study material...
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg mt-6 animate-shake">
              <strong className="font-bold">Error: </strong>
              <span>{error}</span>
            </div>
          )}

          {studyData && <StudyContent data={studyData} />}
        </div>
      </div>
    </div>
  );
}

export default App;
