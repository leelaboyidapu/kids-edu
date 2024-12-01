import React, { useEffect, useRef, useState } from "react";
import "./App.css";

const words = ["elephant", "giraffe", "kangaroo", "hippopotamus", "crocodile"];

function App() {
  const TOTAL_QUESTIONS = 50;

  const [gameActive, setGameActive] = useState(false);
  const [testType, setTestType] = useState(null); // "multiplication" or "spelling"
  const [question, setQuestion] = useState({});
  const [score, setScore] = useState(0);
  const [input, setInput] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const inputRef = useRef(null);

  // Timer effect
  useEffect(() => {
    let timer;
    if (gameActive) {
      setStartTime(Date.now());
      timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameActive, startTime]);

  // Auto-focus on input box when question changes
  useEffect(() => {
    if (gameActive) {
      inputRef.current?.focus();
    }
  }, [question]);

  const speakWord = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  const startGame = (type) => {
    setTestType(type);
    setGameActive(true);
    setScore(0);
    setCurrentQuestion(1);
    setElapsedTime(0);
    setStartTime(Date.now());
    setQuestion(type === "multiplication" ? generateMultiplicationQuestion() : generateSpellingQuestion());
  };

  const handleAnswer = () => {
    if (testType === "multiplication") {
      if (parseInt(input) === question.answer) {
        setScore(score + 1);
      }
    } else if (testType === "spelling") {
      if (input.trim().toLowerCase() === question.word.toLowerCase()) {
        setScore(score + 1);
      }
    }

    setInput("");

    if (currentQuestion < TOTAL_QUESTIONS) {
      setCurrentQuestion(currentQuestion + 1);
      setQuestion(testType === "multiplication" ? generateMultiplicationQuestion() : generateSpellingQuestion());
    } else {
      setGameActive(false);
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };


  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex flex-col items-center justify-center">
      {!gameActive && !testType && (
        <div className="w-4/5 max-w-md p-6 bg-white text-black rounded-lg shadow-xl text-center">
          <h1 className="text-3xl font-bold mb-4 text-indigo-600">Choose Your Test</h1>
          <button
            onClick={() => startGame("multiplication")}
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition duration-300 mb-4"
          >
            Multiplication Test
          </button>
          <button
            onClick={() => startGame("spelling")}
            className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition duration-300"
          >
            Spelling Test
          </button>
        </div>
      )}
      {gameActive && (
        <div className="text-center w-4/5 max-w-md">
          <h1 className="text-2xl font-bold mb-4">Score: {score}</h1>
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-medium">Question: {currentQuestion}/{TOTAL_QUESTIONS}</span>
            <span className="text-lg font-medium">Time: {formatTime(elapsedTime)}</span>
          </div>
          <h2 className="text-4xl font-extrabold my-6">
            {testType === "multiplication" ? (
              `${question.num1} x ${question.num2} = ?`
            ) : (
              `Spell this word: 🔊`
            )}
          </h2>
          {testType === "spelling" && (
            <button
              onClick={() => speakWord(question.word)}
              className="mb-4 py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold"
            >
              Hear the Word Again 🔊
            </button>
          )}
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-2 border rounded-lg text-black mb-4 focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleAnswer}
            className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition duration-300"
          >
            Submit Answer
          </button>
        </div>
      )}
      {!gameActive && testType && currentQuestion >= TOTAL_QUESTIONS && (
        <div className="w-4/5 max-w-md mt-6 p-6 bg-white text-black rounded-lg shadow-xl text-center">
          <h1 className="text-3xl font-bold text-purple-600">Game Over!</h1>
          <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-lg text-white shadow-lg">
            <p className="text-xl font-medium mb-4">
              You answered <span className="font-bold">{score}</span> out of {TOTAL_QUESTIONS} questions correctly!
            </p>
            <p className="text-xl font-medium mb-4">Time Taken: {formatTime(elapsedTime)}</p>
          </div>
          <button
            onClick={() => setTestType(null)}
            className="mt-6 w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full text-lg font-semibold transition duration-300"
          >
            Go Back to Menu
          </button>
        </div>
      )}
    </div>
  );
}

function generateMultiplicationQuestion() {
  const num1 = Math.floor(Math.random() * 15) + 1;
  const num2 = Math.floor(Math.random() * 15) + 1;
  return { num1, num2, answer: num1 * num2 };
}

function generateSpellingQuestion() {
  const word = words[Math.floor(Math.random() * words.length)];
  return { word, display: word.split("").map(() => "_").join("") };
}

export default App;
