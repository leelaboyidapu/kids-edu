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
      {testType === "divisibility" && (
        <p className="text-lg mb-4">Answer with 'yes' or 'no'</p>
      )}
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
        <div className="flex justify-center mb-4">
          <label className="mr-4">
            <input
              type="radio"
              value="yes"
              checked={input === "yes"}
              onChange={(e) => setInput(e.target.value)}
              className="mr-2"
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              value="no"
              checked={input === "no"}
              onChange={(e) => setInput(e.target.value)}
              className="mr-2"
            />
            No
          </label>
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
