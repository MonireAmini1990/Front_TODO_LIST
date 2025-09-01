import React from "react";
import {
  ClipboardCheck,
  Calendar1,
  FolderSearch2,
  PlusSquare,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useRequireAuth from "../hooks/useRequireAuth";

const Footer = () => {
  useRequireAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token"); 
      navigate("/login");
    }
  };

  const navItems = [
    {
      to: null,
      icon: <LogOut className="w-6 h-6" />,
      label: "Logout",
      onClick: handleLogout,
      className: "text-red-500 hover:text-red-700", 
    },
    {
      to: "/AllTask",
      icon: <ClipboardCheck className="w-6 h-6" />,
      label: "Tasks",
    },
    {
      to: "/calendar",
      icon: <Calendar1 className="w-6 h-6" />,
      label: "Calendar",
    },
    {
      to: "/search",
      icon: <FolderSearch2 className="w-6 h-6" />,
      label: "Search",
    },
    {
      to: "/AddTask",
      icon: <PlusSquare className="w-6 h-6" />,
      label: "Add Task",
    },
    {
      to: "/about-me",
      icon: (
        <div className="bg-slate-600 rounded w-10 h-7 flex items-center justify-center mb-3 text-white text-sm">
          me
        </div>
      ),
      label: "",
    },
  ];

  return (
    <div className="flex justify-center items-center gap-x-4 py-4 bg-white border-t shadow-inner">
      {navItems.map(({ icon, label, to, onClick, className }, idx) => {
        if (onClick) {
          return (
            <button
              key={idx}
              onClick={onClick}
              className={`flex flex-col items-center text-xs md:text-sm hover:opacity-80 ${className || "text-slate-500 hover:text-slate-700"}`}
            >
              <div className="w-6 h-6 flex items-center justify-center">{icon}</div>
              {label && <span className="mt-1">{label}</span>}
            </button>
          );
        } else {
          return (
            <Link
              key={idx}
              to={to}
              className={`flex flex-col items-center text-xs md:text-sm hover:opacity-80 ${className || "text-slate-500 hover:text-slate-700"}`}
            >
              <div className="w-6 h-6 flex items-center justify-center">{icon}</div>
              {label && <span className="mt-1">{label}</span>}
            </Link>
          );
        }
      })}
    </div>
  );
};

export default Footer;
