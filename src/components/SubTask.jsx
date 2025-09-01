import { useState } from "react";

function subtasks() {
  const [task, setTask] = useState("");
  const [subtasks, setsubtasks] = useState(["", ""]);

  const handleSubtaskChange = (index, value) => {
    const newsubtasks = [...subtasks];
    newsubtasks[index] = value;
    setsubtasks(newsubtasks);
  };

  const addsubtasks = () => {
    setsubtasks([...subtasks, ""]);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-md md:max-w-lg lg:max-w-xl mx-auto bg-white rounded-xl shadow-md">
      <input
        type="text"
        placeholder="Input task here"
        className="w-full p-3 md:p-4 rounded-lg bg-gray-100 text-gray-600 placeholder-gray-400 mb-4 focus:outline-none text-sm md:text-base"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      {subtasks.map((subtasks, index) => (
        <div key={index} className="flex items-center mb-2">
          <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-gray-300 mr-3"></div>
          <input
            type="text"
            placeholder="input the sub-task"
            className="flex-1 bg-transparent text-gray-400 placeholder-gray-300 focus:outline-none text-xs md:text-sm"
            value={subtasks}
            onChange={(e) => handleSubtaskChange(index, e.target.value)}
          />
        </div>
      ))}

      <button
        onClick={addsubtasks}
        className="flex items-center text-gray-400 hover:text-gray-600 mt-2 text-xs md:text-sm"
      >
        <span className="w-4 h-4 rounded-full bg-gray-300 text-white flex items-center justify-center mr-2 text-sm md:text-base">
          +
        </span>
        Add more
      </button>
    </div>
  );
}

export default subtasks;
