import { useState } from "react";
import { CheckSquare } from "lucide-react";

function TaskStatusSelector() {
  const [selectedStatus, setSelectedStatus] = useState("");
  const statuses = ["Pending", "In Progress", "Completed", "Cancelled"];

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-md md:max-w-lg lg:max-w-xl mx-auto bg-white rounded-xl shadow-md flex flex-col gap-4">
      <h2 className="text-gray-500 text-xs md:text-sm lg:text-base font-medium">
        task status
      </h2>

      {statuses.map((status) => (
        <label
          key={status}
          className="flex items-center space-x-2 md:space-x-3 cursor-pointer"
        >
          <input
            type="radio"
            name="taskStatus"
            value={status}
            checked={selectedStatus === status}
            onChange={() => setSelectedStatus(status)}
            className="appearance-none w-4 h-4 md:w-5 md:h-5 border border-gray-300 bg-gray-100 rounded-sm checked:bg-gray-400"
          />
          <span className="text-gray-500 text-sm md:text-base">{status}</span>
        </label>
      ))}

      <div className="flex justify-end mt-4">
        <CheckSquare className="text-gray-400 w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
      </div>
    </div>
  );
}

export default TaskStatusSelector;
