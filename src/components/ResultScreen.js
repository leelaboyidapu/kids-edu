import React from "react";
import { formatTime } from "../utils";

const ResultScreen = ({ score, totalQuestions, elapsedTime, resetGame, questions, userAnswers, correctAnswers }) => {
  return (
    <div className="w-4/5 max-w-md mt-6 p-6 bg-white text-black rounded-lg shadow-xl text-center">
      <h1 className="text-3xl font-bold text-purple-600">Game Over!</h1>
      <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-lg text-white shadow-lg mb-4">
        <p className="text-xl font-medium mb-4">
          You answered <span className="font-bold">{score}</span> out of {totalQuestions} questions correctly!
        </p>
        <p className="text-xl font-medium mb-4">Time Taken: {formatTime(elapsedTime)}</p>
      </div>
      <div className="text-left">
        <h2 className="text-2xl font-bold mb-2">Review:</h2>
        {questions.map((question, index) => {
          const isCorrect = userAnswers[index] == correctAnswers[index];

          return (
            <div
              key={index}
              className={`mb-4 p-3 rounded-lg ${isCorrect ? "bg-green-50" : "bg-red-50"
                }`}
            >
              <p className="text-lg font-medium">
                {isCorrect ? "✅" : "❌"} Question {index + 1}: {getQuestionText(question, totalQuestions)}
              </p>

              <p
                className={`text-lg font-semibold flex items-center gap-2 ${isCorrect ? "text-green-600" : "text-red-600"
                  }`}
              >
                Your answer: {userAnswers[index]}
              </p>

              {!isCorrect && (
                <p className="text-lg text-green-700 font-medium flex items-center gap-2">
                  Correct answer: {correctAnswers[index]}
                </p>
              )}
            </div>
          );
        })}
      </div>
      <button
        onClick={resetGame}
        className="mt-6 w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full text-lg font-semibold transition duration-300"
      >
        Go Back to Menu
      </button>
    </div>
  );
};

const getQuestionText = (question, totalQuestions) => {
  if (question.num1 && question.num2) {
    return `${question.num1} x ${question.num2} = ?`;
  } else if (question.word) {
    return `Spell this word: ${question.word}`;
  } else if (question.number && question.divisor) {
    return `Is ${question.number} divisible by ${question.divisor}?`;
  }
};

export default ResultScreen;
