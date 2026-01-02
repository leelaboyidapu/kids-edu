import React, { useState, useEffect } from "react";
import "./App.css";
import StartMenu from "./components/StartMenu";
import QuestionDisplay from "./components/QuestionDisplay";
import ResultScreen from "./components/ResultScreen";
import { generateMultiplicationQuestion, generateSpellingQuestion, generateDivisibilityQuestion, checkAnswer } from "./gameUtils";
import { formatTime } from "./utils";
import TopMenuBar from "./components/TopMenuBar";

function App() {
  const TOTAL_QUESTIONS = 25;

  const [gameActive, setGameActive] = useState(false);
  const [testType, setTestType] = useState(null);
  const [question, setQuestion] = useState({});
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [input, setInput] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let timer;
    if (gameActive) {
      timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - (Date.now() - (elapsedTime * 1000))) / 1000));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameActive, elapsedTime]);

  const startGame = (type) => {
    resetGame();
    setTestType(type);
    setGameActive(true);
    setScore(0);
    setCurrentQuestion(1);
    setElapsedTime(0);
    setQuestion(type === "multiplication" ? generateMultiplicationQuestion() : type === "spelling" ? generateSpellingQuestion() : generateDivisibilityQuestion());
  };

  const handleAnswer = () => {
    const isCorrect = checkAnswer(testType, input, question);
    if (isCorrect) {
      setScore(score + 1);
    }

    setUserAnswers([...userAnswers, input]);
    setQuestions([...questions, question]);
    setCorrectAnswers([...correctAnswers, getCorrectAnswer(testType, question)]);

    setInput("");

    if (currentQuestion < TOTAL_QUESTIONS) {
      setCurrentQuestion(currentQuestion + 1);
      setQuestion(testType === "multiplication" ? generateMultiplicationQuestion() : testType === "spelling" ? generateSpellingQuestion() : generateDivisibilityQuestion());
    } else {
      setGameActive(false);
    }
  };

  const getCorrectAnswer = (type, question) => {
    if (type === "multiplication") {
      return question.answer;
    } else if (type === "spelling") {
      return question.word;
    } else if (type === "divisibility") {
      return question.answer;
    }
  };

  const resetGame = () => {
    setTestType(null);
    setGameActive(false);
    setScore(0);
    setCurrentQuestion(1);
    setElapsedTime(0);

    setUserAnswers([]);
    setQuestions([]);
    setCorrectAnswers([]);    
  };

  return (
    <div>
      <TopMenuBar />
      <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex flex-col items-center justify-center">
        {!gameActive && !testType && <StartMenu startGame={startGame} />}
        {gameActive && (
          <QuestionDisplay
            testType={testType}
            question={question}
            input={input}
            setInput={setInput}
            handleAnswer={handleAnswer}
            currentQuestion={currentQuestion}
            totalQuestions={TOTAL_QUESTIONS}
            elapsedTime={elapsedTime}
          />
        )}
        {!gameActive && testType && currentQuestion >= TOTAL_QUESTIONS && (
          <ResultScreen
            score={score}
            totalQuestions={TOTAL_QUESTIONS}
            elapsedTime={elapsedTime}
            resetGame={resetGame}
            questions={questions}
            userAnswers={userAnswers}
            correctAnswers={correctAnswers}
          />
        )}
      </div>
    </div>
  );
}

export default App;
