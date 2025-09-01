import React, { useState, useEffect } from "react";
import { CalendarDays } from "lucide-react";
import Footer from "./Footer";

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const API_URL = ""; 

const Calendar = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  const goToPreviousMonth = () => setCurrentDate(new Date(year, month - 1));
  const goToNextMonth = () => setCurrentDate(new Date(year, month + 1));

  const getEventsForDay = (day) => {
    const dateKey = `${year}-${month + 1}-${day}`;
    return events.filter(
      (e) => new Date(e.event_date).toDateString() === new Date(dateKey).toDateString()
    );
  };

  const handleDayClick = async (day) => {
    const title = prompt("Add an event for this day:");
    if (!title) return;

    const date = new Date(year, month, day).toISOString().split("T")[0];

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, event_date: date }),
    });

    const newEvent = await res.json();
    setEvents((prev) => [...prev, newEvent]);
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const generateCalendarCells = () => {
    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push(<div key={`empty-${i}`}></div>);

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        today.getDate() === day &&
        today.getMonth() === month &&
        today.getFullYear() === year;

      const dayEvents = getEventsForDay(day);

      cells.push(
        <div
          key={day}
          className={`p-2 border border-gray-200 rounded-lg text-sm cursor-pointer
            ${isToday ? "bg-gray-500 text-white" : "bg-white text-gray-800"}
            hover:bg-blue-100 transition`}
          onClick={() => handleDayClick(day)}
        >
          <div className="font-bold">{day}</div>
          {dayEvents.map((event) => (
            <div
              key={event.id}
              className="mt-1 text-xs bg-blue-200 text-gray-700 rounded px-1 flex justify-between items-center"
            >
              <span className="truncate">{event.title}</span>
              <button
                className="ml-1 text-red-500 hover:text-red-700"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(event.id);
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      );
    }
    return cells;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-1 flex items-center justify-center w-full">
        <div className="w-full max-w-md sm:max-w-lg rounded-2xl shadow-lg p-4 sm:p-6 bg-white">
          <CalendarDays className="text-gray-400 w-12 h-12 ml-auto cursor-pointer" />

          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button onClick={goToPreviousMonth} className="text-gray-500 hover:text-black">&lt;</button>
            <h2 className="text-lg font-semibold text-gray-800">
              {monthNames[month]} {year}
            </h2>
            <button onClick={goToNextMonth} className="text-gray-500 hover:text-black">&gt;</button>
          </div>

          {/* Day Names */}
          <div className="grid grid-cols-7 text-center text-gray-500 text-sm mb-2">
            {dayNames.map((name) => (
              <div key={name} className="font-medium">{name}</div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-2 text-sm">{generateCalendarCells()}</div>

          {/* Decoration Image */}
          <div className="mt-6 flex justify-center">
            <img
              src="Screenshot.png"
              alt="Calendar Decoration"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Calendar;
