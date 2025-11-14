import { useState } from 'react';

function StudyContent({ data }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (questionIndex, answer) => {
    setSelectedAnswers({ ...selectedAnswers, [questionIndex]: answer });
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const correctCount = data.quiz.filter(
    (q, i) => selectedAnswers[i] === q.correctAnswer
  ).length;

  return (
    <div className="mt-8 space-y-6 animate-fade-in-up">
      {/* Topic Header */}
      <div className="bg-white/90 dark:bg-white/10 rounded-2xl p-6 backdrop-blur-xl border border-gray-200 dark:border-white/20 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/30 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <span className="text-xl">📖</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {data.topic}
            </h2>
          </div>
          {data.wikipediaUrl && (
            <a
              href={data.wikipediaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg transition-all duration-200 text-xs font-medium text-gray-700 dark:text-blue-200"
            >
              <span>📚</span>
              <span>Wikipedia</span>
            </a>
          )}
        </div>
      </div>

      {/* Summary Section */}
      <div className="bg-white/90 dark:bg-white/10 rounded-2xl p-6 backdrop-blur-xl border border-gray-200 dark:border-white/20 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-blue-500/30 rounded-lg flex items-center justify-center">
            <span className="text-lg">📝</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            Key Summary
          </h3>
        </div>
        <ul className="space-y-3">
          {data.summary.map((point, i) => (
            <li key={i} className="flex items-start gap-3 p-3 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-xl transition-all duration-200">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-lg flex items-center justify-center text-xs font-bold">
                {i + 1}
              </span>
              <span className="text-gray-800 dark:text-blue-100 leading-relaxed text-sm pt-0.5">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Quiz Section */}
      <div className="bg-white/90 dark:bg-white/10 rounded-2xl p-6 backdrop-blur-xl border border-gray-200 dark:border-white/20 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-purple-500/30 rounded-lg flex items-center justify-center">
            <span className="text-lg">❓</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            Quiz Questions
          </h3>
        </div>
        <div className="space-y-4">
          {data.quiz.map((q, qIndex) => (
            <div key={qIndex} className="pb-4 last:pb-0">
              <p className="font-semibold text-gray-800 dark:text-white mb-3 text-sm">
                {qIndex + 1}. {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((option, oIndex) => {
                  const letter = String.fromCharCode(65 + oIndex);
                  const isSelected = selectedAnswers[qIndex] === letter;
                  const isCorrect = q.correctAnswer === letter;
                  const showCorrect = showResults && isCorrect;
                  const showWrong = showResults && isSelected && !isCorrect;

                  return (
                    <label
                      key={oIndex}
                      className={`flex items-center p-2.5 rounded-lg cursor-pointer transition-all text-sm ${
                        showCorrect
                          ? 'bg-green-100 dark:bg-green-500/30 border border-green-500 dark:border-green-400'
                          : showWrong
                          ? 'bg-red-100 dark:bg-red-500/30 border border-red-500 dark:border-red-400'
                          : isSelected
                          ? 'bg-blue-100 dark:bg-blue-500/30 border border-blue-500 dark:border-blue-400'
                          : 'bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-transparent'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${qIndex}`}
                        value={letter}
                        checked={isSelected}
                        onChange={() => handleAnswerSelect(qIndex, letter)}
                        disabled={showResults}
                        className="mr-2"
                      />
                      <span className="text-gray-800 dark:text-blue-100">
                        {option}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          {!showResults ? (
            <button
              onClick={handleSubmitQuiz}
              disabled={Object.keys(selectedAnswers).length !== data.quiz.length}
              className="flex-1 bg-blue-500/80 hover:bg-blue-500 disabled:bg-gray-500/50 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 text-sm"
            >
              Submit Quiz
            </button>
          ) : (
            <>
              <div className="flex-1 bg-green-100 dark:bg-green-500/20 border border-green-500 dark:border-green-400/50 p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600 dark:text-blue-200 mb-1">Your Score</p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">
                      {correctCount} / {data.quiz.length}
                    </p>
                  </div>
                  <div className="text-3xl">
                    {correctCount === data.quiz.length ? '🎉' : correctCount >= data.quiz.length / 2 ? '👍' : '💪'}
                  </div>
                </div>
                <p className="mt-2 text-xs text-gray-700 dark:text-blue-100">
                  {correctCount === data.quiz.length ? 'Perfect score!' : correctCount >= data.quiz.length / 2 ? 'Good job!' : 'Keep practicing!'}
                </p>
              </div>
              <button
                onClick={resetQuiz}
                className="bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 text-gray-800 dark:text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 text-sm"
              >
                🔄 Retry
              </button>
            </>
          )}
        </div>
      </div>

      {/* Study Tip Section */}
      <div className="bg-yellow-50 dark:bg-white/10 rounded-2xl p-6 backdrop-blur-xl border border-yellow-400 dark:border-yellow-400/30 shadow-xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-yellow-500/30 rounded-lg flex items-center justify-center">
            <span className="text-lg">💡</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            Study Tip
          </h3>
        </div>
        <p className="text-gray-800 dark:text-blue-100 leading-relaxed text-sm">{data.studyTip}</p>
      </div>

      {/* Math Challenge Section */}
      {data.mathQuestion && (
        <div className="bg-white/90 dark:bg-white/10 rounded-2xl p-6 backdrop-blur-xl border border-gray-200 dark:border-white/20 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-green-500/30 rounded-lg flex items-center justify-center">
              <span className="text-lg">🧮</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              Math Challenge
            </h3>
          </div>
          <div className="bg-gray-100 dark:bg-white/5 p-4 rounded-xl mb-3">
            <p className="font-semibold text-gray-800 dark:text-white text-sm">
              {data.mathQuestion.question}
            </p>
          </div>
          <div className="bg-blue-100 dark:bg-blue-500/20 border border-blue-400 dark:border-blue-400/30 p-4 rounded-xl">
            <div className="flex items-start gap-2 mb-3">
              <span className="text-lg">✅</span>
              <div>
                <p className="text-xs text-gray-600 dark:text-blue-200 mb-1">Answer</p>
                <p className="text-xl font-bold text-gray-800 dark:text-white">
                  {data.mathQuestion.answer}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-lg">📖</span>
              <div>
                <p className="text-xs text-gray-600 dark:text-blue-200 mb-1">Explanation</p>
                <p className="text-gray-800 dark:text-blue-100 leading-relaxed text-sm">
                  {data.mathQuestion.explanation}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudyContent;
