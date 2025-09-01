import { useState } from "react";

function TimeAndReminder() {
  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("30");
  const [period, setPeriod] = useState("AM");

  const hourAngle =
    (360 / 12) * (parseInt(hour) % 12) + (30 * parseInt(minute)) / 60;
  const minuteAngle = (360 / 60) * parseInt(minute);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-gray-700 px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-light mb-6">Set Time</h2>

      {/* Analog Clock */}
      <div className="w-40 h-40 sm:w-44 sm:h-44 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full bg-gray-300 flex items-center justify-center relative mb-6">
        <div
          className="absolute w-0.5 h-14 sm:h-16 md:h-20 bg-gray-600 origin-bottom bottom-1/2"
          style={{ transform: `rotate(${hourAngle}deg)` }}
        ></div>
        <div
          className="absolute w-0.5 h-18 sm:h-20 md:h-24 bg-gray-600 origin-bottom bottom-1/2"
          style={{ transform: `rotate(${minuteAngle}deg)` }}
        ></div>
        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-600 rounded-full z-10"></div>
      </div>

      {/* Time Inputs */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-4 flex-wrap justify-center">
        <input
          type="number"
          min="1"
          max="12"
          value={hour}
          onChange={(e) => {
            const val = e.target.value;
            if (val >= 1 && val <= 12) setHour(val);
          }}
          className="w-14 sm:w-16 px-2 py-1 text-center bg-gray-200 rounded-md text-base sm:text-lg"
        />
        <span className="text-2xl">:</span>
        <input
          type="number"
          min="0"
          max="59"
          value={minute}
          onChange={(e) => {
            const val = e.target.value;
            if (val >= 0 && val <= 59) setMinute(val);
          }}
          className="w-14 sm:w-16 px-2 py-1 text-center bg-gray-200 rounded-md text-base sm:text-lg"
        />
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="px-2 py-1 rounded-md bg-gray-200 text-base sm:text-lg"
        >
          <option>AM</option>
          <option>PM</option>
        </select>
      </div>

      {/* Set Alarm Button */}
      <button
        className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md mb-6 text-sm sm:text-base hover:bg-gray-400 transition"
        onClick={() => alert(`Alarm set for ${hour}:${minute} ${period}`)}
      >
        Set Alarm
      </button>

      {/* Footer Buttons */}
      <div className="flex justify-between w-full max-w-xs text-sm px-4">
        <button className="text-gray-500">CANCEL</button>
        <button className="text-gray-500 font-semibold">DONE</button>
      </div>
    </div>
  );
}

export default TimeAndReminder;
