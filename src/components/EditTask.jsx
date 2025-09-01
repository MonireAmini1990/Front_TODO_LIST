import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Plus,
  ChevronDown,
  Calendar,
  RefreshCcw,
  ListChecks,
  NotepadText,
  Trash2,
} from "lucide-react";
import Footer from "./Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useRequireAuth from "../hooks/useRequireAuth";

export default function EditTask() {
  useRequireAuth();
  const { task_id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [taskName, setTaskName] = useState("");
  const [category, setCategory] = useState("");
  const [subtasks, setSubtasks] = useState([]);
  const [dueDate, setDueDate] = useState(null);
  const [repeat, setRepeat] = useState("none");
  const [status, setStatus] = useState("");

  const categories = ["work", "personal", "wishList"];
  const repeatOptions = ["none", "daily", "weekly", "monthly"];
  const statusOptions = ["pending", "in_progress", "completed", "cancelled"];

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found. Please login again.");

        const res = await fetch(`http://localhost:3000/api/tasks/${task_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Task not found or unauthorized");

        const data = await res.json();

        setTask(data);
        setTaskName(data.title || "");
        setCategory(data.category || "");
        setSubtasks(Array.isArray(data.subtasks) ? data.subtasks : []);
        setDueDate(data.due_date ? new Date(data.due_date) : null);
        setRepeat(data.repeat || "none");
        setStatus(data.status || "");
      } catch (err) {
        console.error("Fetch task error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (task_id) fetchTask();
  }, [task_id]);

  const addSubtask = () => {
    const newSub = prompt("Enter sub-task:");
    if (newSub && newSub.trim()) setSubtasks((prev) => [...prev, newSub.trim()]);
  };

  const deleteSubtask = async (index) => {
    const updatedSubtasks = subtasks.filter((_, i) => i !== index);
    setSubtasks(updatedSubtasks);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/api/tasks/${task_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ subtasks: updatedSubtasks }), // مستقیم آرایه
      });

      if (!res.ok) throw new Error(`Failed to update subtasks: ${res.status}`);
    } catch (err) {
      console.error(err);
      alert("Failed to delete subtask: " + err.message);
    }
  };

  const saveChanges = async () => {
    const updatedTask = {};

    if (taskName.trim() && taskName !== task.title) updatedTask.title = taskName;
    if (category && category !== task.category) updatedTask.category = category;
    updatedTask.subtasks = subtasks; // مستقیم آرایه
if (dueDate) {
  const formattedDate = dueDate.toISOString().split("T")[0];
  if (formattedDate !== task.due_date) {
    updatedTask.due_date = formattedDate;
  }
}

    if (repeat && repeat !== task.repeat) updatedTask.repeat = repeat || "none";
    if (status && status !== task.status) updatedTask.status = status;
    updatedTask.description = task.description || null;
    updatedTask.time = task.time || "09:00";

    if (Object.keys(updatedTask).length === 0) {
      return alert("No changes to save.");
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/api/tasks/${task_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedTask),
      });

      if (!res.ok) throw new Error(`Failed to update task: ${res.status}`);

      navigate("/AllTask");
    } catch (err) {
      console.error("Save changes error:", err);
      alert("Failed to save changes: " + err.message);
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!task) return <p className="p-4">No task selected.</p>;

  return (
    <div className="min-h-screen flex flex-col bg-slate-300">
      <main className="flex-1 p-4 flex justify-center overflow-auto">
        <div className="bg-slate-400 rounded-xl shadow-xl p-6 w-full max-w-sm sm:max-w-md space-y-4">
          <input
            type="text"
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full bg-transparent border-b border-white text-white placeholder-white focus:outline-none py-2 text-base sm:text-lg"
          />

          <Option icon={<Plus size={20} />} label="Add Sub-task" onClick={addSubtask} />
          {subtasks.length > 0 && (
            <ul className="text-white ml-6 list-disc text-sm sm:text-base space-y-1">
              {subtasks.map((sub, idx) => (
                <li key={idx} className="flex justify-between items-center">
                  <span>{sub}</span>
                  <Trash2
                    size={20}
                    className="cursor-pointer text-gray-700 hover:text-gray-500"
                    onClick={() => deleteSubtask(idx)}
                  />
                </li>
              ))}
            </ul>
          )}

          <div className="flex items-center justify-between">
            <Option icon={<Calendar size={20} />} label="Due Date:" />
            <DatePicker
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              dateFormat="MMMM d, yyyy"
              isClearable
              placeholderText="Select due date"
              className="bg-slate-200 text-slate-700 rounded px-2 py-1 text-sm sm:text-base"
            />
          </div>

          <div className="flex items-center justify-between">
            <Option icon={<RefreshCcw size={20} />} label="Repeat:" />
            <select
              value={repeat}
              onChange={(e) => setRepeat(e.target.value)}
              className="bg-slate-200 text-slate-700 rounded px-2 py-1 text-sm sm:text-base"
            >
              {repeatOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between">
            <Option icon={<ListChecks size={20} />} label="Status:" />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-slate-200 text-slate-700 rounded px-2 py-1 text-sm sm:text-base"
            >
              {statusOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between">
            <Option icon={<ChevronDown size={20} />} label="Category:" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-slate-200 text-slate-700 rounded px-2 py-1 text-sm sm:text-base"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <Option icon={<Plus size={20} />} label="Save Changes" onClick={saveChanges} />

          <div className="flex items-center justify-center pt-6">
            <NotepadText className="w-20 h-25 text-gray-300" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Option({ icon, label, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center space-x-2 hover:opacity-80 cursor-pointer text-white text-sm sm:text-base"
    >
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  );
}
