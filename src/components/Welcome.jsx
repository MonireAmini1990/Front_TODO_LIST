import React from "react";
import { Link } from "react-router-dom";

const ToDoList = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
      <h1 className="text-blue-300 sm:text-3xl md:text-4xl lg:text-6xl font-serif italic mb-10 font-italianno text-4xl">
        To - Do List
      </h1>

      <img
        src="welcome.png"
        alt="Description"
        className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 object-contain"
      />

      <div className="flex gap-8 mt-6 mb-20">
        <Link
          to="/signup1"
          className="bg-blue-400 text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-md shadow-md hover:bg-gray-400 transition text-sm sm:text-base"
        >
          SIGN UP
        </Link>
        <Link
          to="/login"
          className="bg-blue-400 text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-md shadow-md hover:bg-gray-400 transition text-sm sm:text-base"
        >
          LOG IN
        </Link>
      </div>
    </div>
  );
};

export default ToDoList;
