import React, { useState } from "react";
import "./App.css";

function App() {
  const [maxTable, setMaxTable] = useState(15);
  const [gameActive, setGameActive] = useState(false);
  const [question, setQuestion] = useState({});
  const [score, setScore] = useState(0);
  const [input, setInput] = useState("");
  const [timerKey, setTimerKey] = useState(0); // To reset timer

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setQuestion(generateQuestion(maxTable));
    setTimerKey((prev) => prev + 1); // Reset timer
  };

  const handleAnswer = () => {
    if (parseInt(input) === question.answer) {
      setScore(score + 1);
    }
    setInput("");
    setQuestion(generateQuestion(maxTable));
    setTimerKey((prev) => prev + 1); // Reset timer
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex flex-col items-center justify-center">
      {!gameActive ? (
        <div className="w-4/5 max-w-md p-6 bg-white text-black rounded-lg shadow-xl text-center">
          <h1 className="text-3xl font-bold mb-4 text-indigo-600">Math Puzzle</h1>
          <label className="block text-lg font-medium mb-2">
            Select Tables (1–15):
          </label>
          <input
            type="number"
            value={maxTable}
            onChange={(e) => setMaxTable(parseInt(e.target.value))}
            min="1"
            max="15"
            className="w-full p-2 border rounded-lg mb-4 focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={startGame}
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition duration-300"
          >
            Start Game
          </button>
        </div>
      ) : (
        <div className="text-center w-4/5 max-w-md">
          <h1 className="text-2xl font-bold mb-4">Score: {score}</h1>
          <Timer
            key={timerKey} // Reset timer when question changes
            seconds={30}
            onTimeout={() => {
              alert("Time's up!");
              setGameActive(false);
            }}
          />
          <h2 className="text-4xl font-extrabold my-6">
            {question.num1} x {question.num2} = ?
          </h2>
          <input
            type="number"
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
    </div>
  );
}

function Timer({ seconds, onTimeout }) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  React.useEffect(() => {
    if (timeLeft <= 0) {
      onTimeout();
      return;
    }
    const interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft, onTimeout]);

  return (
    <div className="text-xl font-semibold text-yellow-300">
      Time Left: {timeLeft}s
    </div>
  );
}

function generateQuestion(maxTable) {
  const num1 = Math.floor(Math.random() * maxTable) + 1;
  const num2 = Math.floor(Math.random() * maxTable) + 1;
  return { num1, num2, answer: num1 * num2 };
}

export default App;
