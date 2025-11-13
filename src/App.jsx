import { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import MainApp from './pages/MainApp';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  if (showLanding) {
    return (
      <LandingPage 
        onGetStarted={() => setShowLanding(false)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    );
  }

  return (
    <MainApp 
      onBackToHome={() => setShowLanding(true)}
      darkMode={darkMode}
      setDarkMode={setDarkMode}
    />
  );
}

export default App;
