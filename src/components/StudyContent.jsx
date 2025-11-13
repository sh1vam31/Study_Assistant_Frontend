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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-200 hover:shadow-xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          {data.topic}
        </h2>
        {data.wikipediaUrl && (
          <a
            href={data.wikipediaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm"
          >
            View on Wikipedia →
          </a>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <span>📝</span>
          Summary
        </h3>
        <ul className="space-y-3">
          {data.summary.map((point, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                {i + 1}
              </span>
              <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          ❓ Quiz Questions
        </h3>
        <div className="space-y-6">
          {data.quiz.map((q, qIndex) => (
            <div key={qIndex} className="border-b dark:border-gray-700 pb-4 last:border-b-0">
              <p className="font-semibold text-gray-800 dark:text-white mb-3">
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
                      className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                        showCorrect
                          ? 'bg-green-100 dark:bg-green-900 border-2 border-green-500'
                          : showWrong
                          ? 'bg-red-100 dark:bg-red-900 border-2 border-red-500'
                          : isSelected
                          ? 'bg-indigo-100 dark:bg-indigo-900'
                          : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${qIndex}`}
                        value={letter}
                        checked={isSelected}
                        onChange={() => handleAnswerSelect(qIndex, letter)}
                        disabled={showResults}
                        className="mr-3"
                      />
                      <span className="dark:text-gray-200">
                        {letter}. {option}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-4">
          {!showResults ? (
            <button
              onClick={handleSubmitQuiz}
              disabled={Object.keys(selectedAnswers).length !== data.quiz.length}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              Submit Quiz
            </button>
          ) : (
            <>
              <div className="flex-1 bg-indigo-100 dark:bg-indigo-900 p-4 rounded-lg">
                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                  Score: {correctCount} / {data.quiz.length}
                </p>
              </div>
              <button
                onClick={resetQuiz}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
              >
                Retry Quiz
              </button>
            </>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          💡 Study Tip
        </h3>
        <p className="text-gray-700 dark:text-gray-300">{data.studyTip}</p>
      </div>

      {data.mathQuestion && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            🧮 Math Challenge
          </h3>
          <p className="font-semibold text-gray-800 dark:text-white mb-3">
            {data.mathQuestion.question}
          </p>
          <div className="bg-indigo-50 dark:bg-indigo-900 p-4 rounded-lg">
            <p className="text-gray-800 dark:text-white">
              <strong>Answer:</strong> {data.mathQuestion.answer}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-2">
              <strong>Explanation:</strong> {data.mathQuestion.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudyContent;
