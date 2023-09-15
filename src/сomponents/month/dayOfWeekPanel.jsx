import React from "react";
const days = ["Mn", "Tue", "Wed", "Thr", "Fr", "St", "Sn"];

function DayOfWeekPanel() {
  return (
    <div className="border-b border-blue-500 pb-2 grid grid-cols-7 grid-rows-1 sm:text-2xl text-sm font-medium justify-items-center text-blue-800 mb-4">
      {days.map((day) => (
        <span key={crypto.randomUUID()}>{day}</span>
      ))}
    </div>
  );
}

export default DayOfWeekPanel;
