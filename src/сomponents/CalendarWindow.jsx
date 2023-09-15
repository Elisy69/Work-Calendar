import React, { useEffect, useRef, useState } from "react";
import { CURRENT_DAY } from "../constants/constants";
import { MONTHS } from "/src/constants/constants";
import Month from "/src/сomponents/month/Month";

function getCurrentMonthIndex() {
  return MONTHS.map((month) => {
    return { month: month[0].getMonth(), year: month[0].getFullYear() };
  }).findIndex(
    (month) =>
      month.month === CURRENT_DAY.getMonth() &&
      month.year === CURRENT_DAY.getFullYear()
  );
}

function CalendarWindow() {
  const [currentMonthIndex] = useState(getCurrentMonthIndex());
  const monthsRef = useRef([]);
  useEffect(() => {
    monthsRef.current = monthsRef.current.slice(0, MONTHS.length);
    scrollToCurrentMonthOnRender();
  }, []);

  function scrollToCurrentMonth() {
    return () => {
      monthsRef.current[currentMonthIndex].scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    };
  }

  function scrollToCurrentMonthOnRender() {
    monthsRef.current[currentMonthIndex].scrollIntoView({
      behavior: "instant",
      block: "center",
      inline: "center",
    });
  }

  return (
    <div
      className={`relative h-[80%] w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[40%] rounded-2xl bg-[#ececec] shadow-lg sm:px-10 py-4 px-4 overflow-scroll`}
    >
      <button
        onClick={scrollToCurrentMonth()}
        className="z-50 text-xl font-semiboldld fixed  bg-red-800 shadow-lg shadow-rose-800/50 w-[5rem] h-[2.5rem] rounded-lg hover:bg-rose-900 hover:shadow-lg hover:shadow-rose-900/50 ease-in duration-100"
      >
        Return
      </button>
      {MONTHS.map((month, index) => (
        <Month
          innerRef={(el) => (monthsRef.current[index] = el)}
          currentMonth={month}
          key={crypto.randomUUID()}
        />
      ))}
    </div>
  );
}

export default CalendarWindow;
