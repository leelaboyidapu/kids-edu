import React from "react";

const StartMenu = ({ startGame }) => {
  return (
    <div className="w-4/5 max-w-md p-6 bg-white text-black rounded-lg shadow-xl text-center">
      <h1 className="text-3xl font-bold mb-4 text-indigo-600">Choose Your Test!</h1>
      <button
        onClick={() => startGame("multiplication")}
        className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition duration-300 mb-4"
      >
        Multiplication Test
      </button>
      <button
        onClick={() => startGame("spelling")}
        className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition duration-300 mb-4"
      >
        Spelling Test
      </button>
      <button
        onClick={() => startGame("divisibility")}
        className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition duration-300"
      >
        Divisibility Test
      </button>
    </div>
  );
};

export default StartMenu;
