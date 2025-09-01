import React, { useState } from "react";
import { Calendar, Plus, List } from "lucide-react";
import Footer from "./Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTaskContext } from "../context/TaskContext";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import useRequireAuth from "../hooks/useRequireAuth";

const CalendarIconInput = React.forwardRef(({ value, onClick }, ref) => (
  <button
    onClick={onClick}
    ref={ref}
    className="flex items-center space-x-2 bg-slate-400 px-4 py-2 rounded-md text-white hover:bg-slate-500 transition"
  >
    <Calendar size={20} />
    <span className="text-sm">{value || "Select due date"}</span>
  </button>
));

function IconButton({ icon, label, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex flex-col items-center ${
        disabled ? "text-gray-400 cursor-not-allowed" : "text-slate-500 hover:text-slate-700"
      }`}
    >
      {icon}
      <span className="text-xs pt-1">{label}</span>
    </button>
  );
}

export default function AddTask() {
  const user = useRequireAuth();
  const { addTask } = useTaskContext();
  const { loading: userLoading } = useUser();
  const navigate = useNavigate();

  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("work");
  const [status, setStatus] = useState("pending");
  const [repeat, setRepeat] = useState("none");
  const [time, setTime] = useState("09:00");
  const [subtasks, setSubtasks] = useState([]);
  const [dueDate, setDueDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddSubtasks = () => {
    const sub = prompt("Enter sub-task:");
    if (sub && sub.trim()) setSubtasks([...subtasks, sub.trim()]);
  };

  const handleAddTask = async () => {
  if (!task.trim()) return alert("Task title cannot be empty");
  if (!user || !user.user_id) {
    setError("You must be logged in to add a task.");
    return;
  }

  // آماده‌سازی داده‌ها برای ارسال
  const newTask = {
    title: task.trim(),
    description: description.trim() || " ",
    category,
    status,
    repeat: repeat || "none",
    time: time || "09:00",
    subtasks: subtasks.length ? JSON.stringify(subtasks) : JSON.stringify([]), // بدون تغییر
    due_date: dueDate ? dueDate.toISOString().split("T")[0] : null, // فقط تاریخ
    created_at: new Date().toISOString(),
    user_id: user.user_id,
  };

  setLoading(true);
  setError(null);

  try {
    const addedTask = await addTask(newTask);
    if (!addedTask || !addedTask.task_id) throw new Error("Task not added");

    // ریست کردن فرم
    setTask("");
    setDescription("");
    setCategory("work");
    setStatus("pending");
    setRepeat("none");
    setTime("09:00");
    setSubtasks([]);
    setDueDate(null);

    navigate("/AllTask");
  } catch (err) {
    console.error(err);
    setError("Failed to add task. Check console for details.");
    alert("Failed to add task. Check console for details.");
  } finally {
    setLoading(false);
  }
};


  if (userLoading) return <p>Loading user...</p>;
  if (!user) return <p className="text-red-500 text-sm text-center">You must be logged in to add tasks.</p>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      <main className="flex-grow flex flex-col items-center justify-center p-4 space-y-6">
        {/* Task Title */}
        <div className="w-full max-w-md bg-slate-400 p-4 rounded-2xl shadow-md">
          <input
            type="text"
            placeholder="Task title"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="w-full bg-slate-400 placeholder-white text-white text-lg rounded-full px-4 py-3 focus:outline-none"
          />
        </div>

        {/* Description */}
        <div className="w-full max-w-md bg-slate-400 p-4 rounded-2xl shadow-md">
          <textarea
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-slate-400 placeholder-white text-white text-sm sm:text-base rounded-md px-4 py-2 focus:outline-none resize-none"
            rows={3}
          />
        </div>

        {/* Category / Status / Repeat */}
        <div className="w-full max-w-md bg-slate-400 p-4 rounded-2xl shadow-md flex flex-col sm:flex-row gap-4 sm:gap-2 justify-between">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="flex-1 bg-slate-500 text-white px-4 py-2 rounded-md text-sm sm:text-base"
          >
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="wishlist">Wishlist</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="flex-1 bg-slate-500 text-white px-4 py-2 rounded-md text-sm sm:text-base"
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={repeat}
            onChange={(e) => setRepeat(e.target.value)}
            className="flex-1 bg-slate-500 text-white px-4 py-2 rounded-md text-sm sm:text-base"
          >
            <option value="none">No Repeat</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        {/* Time / DueDate */}
        <div className="w-full max-w-md bg-slate-400 p-4 rounded-2xl shadow-md flex gap-4">
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="flex-1 bg-slate-500 text-white px-4 py-2 rounded-md text-sm sm:text-base"
          />
          <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            placeholderText="Due date"
            dateFormat="MMMM d, yyyy"
            minDate={new Date()}
            isClearable
            className="flex-1"
            customInput={<CalendarIconInput />}
          />
        </div>

        {/* Subtasks / Add Button */}
        <div className="w-full max-w-md flex justify-between items-center">
          <IconButton
            icon={<List size={28} />}
            label="Add Sub-task"
            onClick={handleAddSubtasks}
            disabled={loading}
          />
          <IconButton
            icon={
              <div className="bg-slate-400 p-2 rounded-md">
                <Plus size={16} color="white" />
              </div>
            }
            label={loading ? "Adding..." : "Add Task"}
            onClick={handleAddTask}
            disabled={loading}
          />
        </div>

        {/* Show added subtasks */}
        {subtasks.length > 0 && (
          <div className="w-full max-w-md bg-white p-2 rounded-md shadow-inner mt-2">
            <ul className="list-disc pl-5 text-gray-700">
              {subtasks.map((sub, idx) => (
                <li key={idx}>{sub}</li>
              ))}
            </ul>
          </div>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </main>
      <Footer />
    </div>
  );
}
