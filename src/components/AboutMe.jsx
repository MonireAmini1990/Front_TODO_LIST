import React from "react";
import { CircleUserRound } from "lucide-react";
import Footer from "./Footer"; 
import useRequireAuth from "../hooks/useRequireAuth";

const tasks = [
  { emoji: "📖", label: "Keep reading" },
  { emoji: "🌾", label: "Eat healthy" },
  { emoji: "🌙", label: "Go to bed early" },
  { emoji: "🏃‍♂️", label: "Go exercising" },
  { emoji: "🧘‍♂️", label: "Meditation" },
  { emoji: "😊", label: "Practice smiling and be happy" },
  { emoji: "🙏", label: "Pray" },
];

const AboutMe = () => {
  useRequireAuth();
  return (
    <div className="flex flex-col min-h-screen bg-[#f5f9fa] font-sans text-[#5f7884]">
      {/* Main Content */}
      <main className="flex-grow p-4 sm:p-6 md:p-8">
        {/* Header */}
        <CircleUserRound className="w-16 h-16 text-[#c13f50]" />

        {/* Life Improvement Section */}
        <div className="text-[#ab4876]">
          <h3 className="text-base sm:text-lg font-semibold mb-2">
            Improve my Life
          </h3>

          <div className="flex items-start sm:items-center space-x-2 mb-2">
            <span className="text-red-500 text-xl">❤️</span>
            <span className="text-sm sm:text-base text-gray-800">
              Be grateful for what you have:
            </span>
          </div>

          {/* Custom Lines */}
          <div className="flex flex-col space-y-3 mb-6">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center space-x-2">
                <div className="w-3 h-[2px] bg-red-500" />
                <input
                  type="text"
                  className="flex-1 border-none focus:outline-none bg-transparent text-sm text-black"
                />
              </div>
            ))}
          </div>

          {/* Checklist */}
          <div className="space-y-4">
            {tasks.map((task, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-1 sm:space-y-0"
              >
                <span className="text-xl">{task.emoji}</span>
                <span className="flex-1 text-[#2f4858] font-medium text-sm sm:text-base">
                  {task.label}
                </span>
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-gray-300"
                />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutMe;
