import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useUser } from "./UserContext";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { user } = useUser();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:3000/api/tasks"; 

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
  };

  const fetchTasks = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}?user_id=${user.user_id}`, {
        headers: getAuthHeaders(),
      });
      setTasks(res.data || []);
      setError(null);
    } catch (err) {
      console.error("Fetch tasks error:", err.response?.data || err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    if (!user) return;
    try {
      const res = await axios.post(
        API_URL,
        { user_id: user.user_id, ...taskData },
        { headers: getAuthHeaders() }
      );
      setTasks((prev) => [...prev, res.data]);
      return res.data;
    } catch (err) {
      console.error("Add task error:", err.response?.data || err.message);
      setError(err.message);
      throw err;
    }
  };

  const editTask = async (task_id, taskData) => {
    try {
      const res = await axios.put(`${API_URL}/${task_id}`, taskData, {
        headers: getAuthHeaders(),
      });
      setTasks((prev) =>
        prev.map((t) => (t.task_id === task_id ? res.data : t))
      );
      return res.data;
    } catch (err) {
      console.error("Edit task error:", err.response?.data || err.message);
      setError(err.message);
      throw err;
    }
  };

  const deleteTask = async (task_id) => {
    try {
      await axios.delete(`${API_URL}/${task_id}`, { headers: getAuthHeaders() });
      setTasks((prev) => prev.filter((t) => t.task_id !== task_id));
    } catch (err) {
      console.error("Delete task error:", err.response?.data || err.message);
      setError(err.message);
      throw err;
    }
  };

  const updateStatus = async (task_id, status) => {
    try {
      const res = await axios.put(
        `${API_URL}/${task_id}/status`,
        { status },
        { headers: getAuthHeaders() }
      );
      setTasks((prev) =>
        prev.map((t) => (t.task_id === task_id ? res.data : t))
      );
      return res.data;
    } catch (err) {
      console.error("Update status error:", err.response?.data || err.message);
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        loading,
        error,
        fetchTasks,
        addTask,
        editTask,
        deleteTask,
        updateStatus,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
