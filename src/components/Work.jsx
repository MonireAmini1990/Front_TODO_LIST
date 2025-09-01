import React, { useEffect, useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTaskContext } from "../context/TaskContext";
import useRequireAuth from "../hooks/useRequireAuth";
import Footer from "./Footer";

function Work() {
  useRequireAuth();
  const { tasks, fetchTasks, deleteTask } = useTaskContext();
  const [filter, setFilter] = useState("Work");
  const navigate = useNavigate();
  const categories = ["All", "Work", "Personal", "WishList"];

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (task_id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTask(task_id);
    } catch (err) {
      console.error(err);
      alert("Failed to delete task.");
    }
  };

  const handleEdit = (task_id) => navigate(`/edit-task/${task_id}`);

  const handleCategoryClick = (item) => {
    setFilter(item);
    switch (item) {
      case "All": navigate("/AllTask"); break;
      case "Work": navigate("/Work"); break;
      case "Personal": navigate("/Personal"); break;
      case "WishList": navigate("/WishList"); break;
      default: break;
    }
  };

  const filteredTasks =
    filter === "All" ? tasks : tasks.filter((t) => t.category?.toLowerCase() === filter.toLowerCase());

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between px-4 md:px-8">
      <div className="flex justify-center flex-wrap gap-2 mt-6">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => handleCategoryClick(item)}
            className={`bg-slate-400 text-white w-24 py-1 rounded-full text-sm text-center transition-colors duration-200 ${
              filter === item ? "bg-slate-700" : ""
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="max-w-md mx-auto my-6 w-full flex-1">
        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks</p>
        ) : (
          filteredTasks.map((task) => {
            const subtasksArray = Array.isArray(task.subtasks) ? task.subtasks : [];
            return (
              <div key={task.task_id} className="bg-white rounded shadow p-3 mb-3 space-y-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-700">{task.title}</h3>
                    <p className="text-sm text-gray-500">Status: {task.status || "not set"}</p>
                    {task.due_date && (
                      <p className="text-sm text-gray-500">
                        Due: {new Date(task.due_date).toLocaleDateString()}
                      </p>
                    )}
                    {subtasksArray.length > 0 && (
                      <ul className="list-disc ml-4 text-sm text-gray-600">
                        {subtasksArray.map((sub, idx) => (
                          <li key={`${task.task_id}-sub-${idx}`}>{sub}</li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <button onClick={() => handleEdit(task.task_id)} className="text-blue-600 hover:text-blue-800">
                      <Pencil size={18} />
                    </button>
                    <button onClick={() => handleDelete(task.task_id)} className="text-red-600 hover:text-red-800">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Work;
