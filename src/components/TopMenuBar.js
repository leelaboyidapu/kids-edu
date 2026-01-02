import React from "react";

const TopMenuBar = () => {
  return (
    <nav className="bg-indigo-600 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-bold">Kids Edu</div>
      <div className="flex items-center">
        <button className="ml-4 py-2 px-4 bg-indigo-700 hover:bg-indigo-800 rounded-lg">Home</button>
        {/* Add more menu items or hamburger menu functionality here */}
      </div>
    </nav>
  );
};

export default TopMenuBar;
