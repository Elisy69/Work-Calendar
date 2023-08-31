import React, { useEffect, useRef } from "react";
import { CURRENT_DAY } from "../constants/constants";
import Month from "/src/Components/Month";
import { MONTHS } from "/src/constants/constants";

function CalendarWindow() {
  const monthsRef = useRef([]);
  useEffect(() => {
    monthsRef.current = monthsRef.current.slice(0, MONTHS.length);
  }, []);

  function scrollToCurrentMonth() {
    return () => {
      monthsRef.current[24].scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    };
  }
  useEffect(() => {
    console.log(CURRENT_DAY.getMonth());
    console.log(CURRENT_DAY.getFullYear());
    console.log(
      MONTHS.map((month) => {
        return { month: month[0].getMonth(), year: month[0].getFullYear() };
      })
    );
    const monhtsArr = MONTHS.map((month) => {
      return { month: month[0].getMonth(), year: month[0].getFullYear() };
    });
    const currentMonthIndex = monhtsArr.find((month) => {
      month.month === CURRENT_DAY.getMonth() &&
        month.year === CURRENT_DAY.getFullYear();
    });
    console.log(currentMonthIndex);
  }, []);

  return (
    <div
      className={`h-[88%] rounded-2xl bg-gradient-to-r from-violet-900 via-indigo-600 to-purple-900 shadow-lg p-4 px-10 relative overflow-scroll`}
    >
      <button
        onClick={scrollToCurrentMonth()}
        className="z-50 fixed bg-red-800 shadow-lg shadow-rose-800/50 w-44 h-7 rounded-lg hover:bg-rose-900 hover:shadow-lg hover:shadow-rose-900/50 ease-in duration-100"
      >
        Go to the present day
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
