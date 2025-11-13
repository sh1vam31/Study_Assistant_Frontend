import DarkModeToggle from '../components/DarkModeToggle';

function LandingPage({ onGetStarted, darkMode, setDarkMode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-[#0a1628] dark:via-[#1a2f4f] dark:to-[#2a4a7c] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 dark:bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-20 animate-float"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-400 dark:bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-indigo-400 dark:bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Dark Mode Toggle - Top Right */}
      <div className="absolute top-8 right-8 z-20">
        <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Logo/Icon */}
        <div className="mb-8 animate-float">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-3xl flex items-center justify-center shadow-2xl">
            <span className="text-5xl">🎓</span>
          </div>
        </div>

        {/* Hero Text */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-6xl md:text-7xl font-bold text-gray-800 dark:text-white mb-4">
            Smart Study
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Assistant
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-blue-200 mb-8 max-w-2xl mx-auto">
            AI-Powered Learning Platform
          </p>
          <p className="text-base md:text-lg text-gray-600 dark:text-blue-300/80 max-w-xl mx-auto">
            Transform any topic into comprehensive study materials with AI-generated summaries, quizzes, and personalized learning tips.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl w-full animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="group bg-white/80 dark:bg-white/10 rounded-2xl p-6 text-center backdrop-blur-xl border border-gray-200 dark:border-white/20 shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer">
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">📚</div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">Smart Summaries</h3>
            <p className="text-sm text-gray-600 dark:text-blue-200/80">Get concise, AI-generated summaries of any topic</p>
          </div>
          
          <div className="group bg-white/80 dark:bg-white/10 rounded-2xl p-6 text-center backdrop-blur-xl border border-gray-200 dark:border-white/20 shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer">
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">❓</div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">Interactive Quizzes</h3>
            <p className="text-sm text-gray-600 dark:text-blue-200/80">Test your knowledge with custom quiz questions</p>
          </div>
          
          <div className="group bg-white/80 dark:bg-white/10 rounded-2xl p-6 text-center backdrop-blur-xl border border-gray-200 dark:border-white/20 shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer">
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">🧮</div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">Math Solver</h3>
            <p className="text-sm text-gray-600 dark:text-blue-200/80">Solve math problems with step-by-step solutions</p>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onGetStarted}
          className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-lg font-bold rounded-2xl transition-all duration-300 hover:scale-105 shadow-2xl animate-fade-in-up"
          style={{ animationDelay: '0.4s' }}
        >
          <span className="flex items-center gap-3">
            <span>Get Started</span>
            <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </button>

        {/* Footer */}
        <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <p className="text-sm text-gray-500 dark:text-blue-300/60">
            Powered by AI • Free to use • No credit card required
          </p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
