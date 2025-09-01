import React, { useState } from 'react';

const RepeatTask = () => {
  const [selected, setSelected] = useState(null);

  const options = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-md text-center space-y-6">
      <h2 className="text-xl font-semibold text-gray-700">Set as Repeat Task</h2>

      {/* repeat options */}
      <div className="flex flex-wrap justify-between items-center gap-5 sm:gap-7">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => setSelected(option)}
            className={`flex-1 py-2 rounded-xl text-white font-medium transition 
              ${selected === option ? 'bg-gray-700' : 'bg-gray-400 text-gray-100'}`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* action buttons */}
      <div className="flex justify-center gap-20 mt-10">
        <button className="text-gray-400 font-semibold text-base sm:text-lg">CANCEL</button>
        <button className="text-gray-500 font-semibold text-base sm:text-lg">DONE</button>
      </div>
    </div>
  );
};

export default RepeatTask;
