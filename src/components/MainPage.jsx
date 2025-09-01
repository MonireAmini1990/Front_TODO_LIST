 import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTaskContext } from "../context/TaskContext"; 
import { useUser } from "../context/UserContext";
import useRequireAuth from "../hooks/useRequireAuth";
import Footer from "./Footer";

function MainPage() {
  const user = useRequireAuth();
  const [filter, setFilter] = useState("All");

  const navigate = useNavigate();
  const { fetchTasks } = useTaskContext();
  const { loading: isUserLoaded } = useUser(); 

  const categories = ["All", "Work", "Personal", "WishList"];

  const handleCategoryClick = (item) => {
    if (item === "All") {
      navigate("/AllTask");
    } else if (item === "Work") {
      navigate("/Work");
    } else if (item === "Personal") {
      navigate("/Personal");
    } else if (item === "WishList") {
      navigate("/WishList");
    } else {
      setFilter(item);
    }
  };

  useEffect(() => {
    if (!isUserLoaded || !user) return;
    fetchTasks();
  }, [isUserLoaded, user]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between px-4 md:px-8">
      <div className="flex justify-center flex-wrap gap-2 mt-6">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => handleCategoryClick(item)}
            className={`bg-slate-400 text-white w-24 py-1 rounded-full text-sm text-center ${
              filter === item ? "bg-slate-700" : ""
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="max-w-md mx-auto my-6 w-full flex-1 flex items-center justify-center">
        <p className="text-center text-gray-500">Welcome to Main Page</p>
      </div>

      <Footer /> 
    </div>
  );
}

export default MainPage;
