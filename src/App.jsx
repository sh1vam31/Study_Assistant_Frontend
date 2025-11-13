import { useState, useEffect } from 'react';
import SearchForm from './components/SearchForm';
import StudyContent from './components/StudyContent';
import DarkModeToggle from './components/DarkModeToggle';
import AuthModal from './components/AuthModal';
import { useAuth } from './hooks/useAuth';
import { useLocalStorage } from './hooks/useLocalStorage';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
function App() {
  const [studyData, setStudyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
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
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('API Error:', response.status, errorData);
        
        if (response.status === 401) {
          logout();
          setShowAuthModal(true);
          throw new Error('Session expired. Please login again.');
        }
        
        if (response.status === 500) {
          throw new Error(errorData.message || 'Server error. Please try again or contact support.');
        }
        
        throw new Error(errorData.message || errorData.error || 'Failed to fetch study material');
      }

      const data = await response.json();
      setStudyData(data);

      // Fetch updated history from server
      fetchHistory();
    } catch (err) {
      console.error('Search error:', err);
      console.error('API URL:', API_URL);
      console.error('Token exists:', !!getToken());
      
      let errorMessage = 'Failed to fetch study material. ';
      
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        errorMessage += 'Cannot connect to server. Please check your internet connection.';
      } else if (err.message.includes('timeout')) {
        errorMessage += 'Request timed out. Please try again.';
      } else {
        errorMessage += err.message || 'Please try again.';
      }
      
      setError(errorMessage);
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
      <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#1a2f4f] to-[#2a4a7c] dark:from-[#0a0e1a] dark:via-[#0f1829] dark:to-[#1a2438] transition-colors duration-300 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
        </div>
        
        <div className="flex h-screen relative z-10">
          {/* Sidebar - History */}
          {isAuthenticated && (
            <div className="w-64 glass-card border-r border-white/20 overflow-y-auto">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>📚</span>
                    <span>History</span>
                  </h2>
                  {history.length > 0 && (
                    <button
                      onClick={handleClearHistory}
                      className="text-xs text-red-400 hover:text-red-300 transition-colors"
                      title="Clear all history"
                    >
                      Clear
                    </button>
                  )}
                </div>
                
                {history.length === 0 ? (
                  <p className="text-sm text-blue-200/60 text-center py-8">
                    No history yet
                  </p>
                ) : (
                  <div className="space-y-2">
                    {history.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleHistorySelect(item)}
                        className="w-full text-left p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-200 group"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">
                              {item.topic}
                            </p>
                            <p className="text-xs text-blue-200/60 mt-1">
                              {item.mode === 'math' ? '🧮 Math' : '📚 Normal'}
                            </p>
                          </div>
                          <span className="text-blue-200/40 group-hover:text-blue-200/80 transition-colors">
                            →
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-12 animate-fade-in">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 glass-card rounded-xl flex items-center justify-center animate-float">
                <span className="text-2xl">🎓</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Smart Study Assistant
                </h1>
                <p className="text-sm text-blue-200 font-medium">✨ AI-Powered Learning Platform</p>
              </div>
            </div>
            
            <div className="flex gap-3 items-center">
              <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
              
              {isAuthenticated ? (
                <div className="flex items-center gap-2 glass-card rounded-lg px-3 py-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-white hidden md:block">
                    {user.name}
                  </span>
                  <button
                    onClick={logout}
                    className="ml-2 px-3 py-1.5 bg-red-500/80 hover:bg-red-500 text-white text-xs font-medium rounded-md transition-all duration-300"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="px-4 py-2 glass-card hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-all duration-300"
                >
                  Login
                </button>
              )}
            </div>
          </div>

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
      </div>
    </div>
  );
}

export default App;
