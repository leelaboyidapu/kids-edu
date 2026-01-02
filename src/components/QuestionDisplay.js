import React, { useRef, useEffect } from "react";
import { speakWord, formatTime } from "../utils";

const QuestionDisplay = ({ testType, question, input, setInput, handleAnswer, currentQuestion, totalQuestions, elapsedTime }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    if (testType === "spelling") {
      speakWord(question.word);
    }
  }, [question, testType]);

  return (
    <div className="text-center w-4/5 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Score: {currentQuestion - 1}</h1>
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-medium">Question: {currentQuestion}/{totalQuestions}</span>
        <span className="text-lg font-medium">Time: {formatTime(elapsedTime)}</span>
      </div>
      <h2 className="text-4xl font-extrabold my-6">
        {testType === "multiplication" ? (
          `${question.num1} x ${question.num2} = ?`
        ) : testType === "spelling" ? (
          `Spell this word: `
        ) : (
          `Is ${question.number} divisible by ${question.divisor}?`
        )}
      </h2>
      {testType === "spelling" && (
        <button
          onClick={() => speakWord(question.word)}
          className="mb-4 py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold"
        >
          Hear the Word Again 
        </button>
      )}
      {testType === "divisibility" ? (
<div className="flex justify-center gap-4 mb-4">
    {["yes", "no"].map((option) => {
      const isActive = input === option;

      return (
        <button
          key={option}
          type="button"
          onClick={() => setInput(option)}
          className={`
            px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200
            border-2
            ${
              isActive
                ? "bg-green-600 text-white border-green-600 scale-105 shadow-md"
                : "bg-white text-gray-700 border-gray-300 hover:bg-green-100 hover:border-green-400"
            }
          `}
        >
          {option.toUpperCase()}
        </button>
      );
    })}
  </div>
      ) : (
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border rounded-lg text-black mb-4 focus:ring-2 focus:ring-purple-500"
        />
      )}
      <button
        onClick={handleAnswer}
        className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition duration-300"
      >
        Submit Answer
      </button>
    </div>
  );
};

export default QuestionDisplay;
