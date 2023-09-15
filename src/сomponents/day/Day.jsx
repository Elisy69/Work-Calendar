import format from "date-fns/format";
import React, { memo, useEffect, useState } from "react";
import { useDays } from "../../store_zustand/store";

function convertFromISOString(string) {
  const dateObj = new Date(string);
  return dateObj;
}

function isFirstDay(day) {
  if (format(day, "d") === "1") {
    return true;
  } else {
    return false;
  }
}

function getWeekDay(day) {
  const startingCols = {
    1: "col-start-1",
    2: "col-start-2",
    3: "col-start-3",
    4: "col-start-4",
    5: "col-start-5",
    6: "col-start-6",
    7: "col-start-7",
  };
  if (format(day, "d") === "1") {
    return startingCols[format(day, "i")];
  } else {
    return "";
  }
}

function searchThisDayIndex(day, daysToCompare) {
  let start = 0;
  let end = daysToCompare.length - 1;
  while (start <= end) {
    let middle = Math.floor((start + end) / 2);
    const dateObj = convertFromISOString(daysToCompare[middle].dateObj);
    if (dateObj.getTime() === day.getTime()) {
      return middle;
    } else if (dateObj.getTime() < day.getTime()) {
      start = middle + 1;
    } else {
      end = middle - 1;
    }
  }
  return -1;
}

const Day = memo(function Day({ day }) {
  const [workDay, setWorkDay] = useState(false);
  const [daysToCompare, toggleDayIsWorking] = useDays((state) => [
    state.days,
    state.toggleDayIsWorking,
  ]);
  const [dayIndex] = useState(searchThisDayIndex(day, daysToCompare));

  function handleClick() {
    return () => {
      setWorkDay(workDay ? false : true);
      toggleDayIsWorking(dayIndex);
    };
  }

  useEffect(() => {
    setWorkDay(daysToCompare[dayIndex].isWorkDay);
  }, [daysToCompare]);

  return (
    <li
      onClick={handleClick()}
      className={`${
        workDay
          ? "bg-blue-900 transition duration-100 ease-in-out hover:scale-110 text-blue-200"
          : "transition duration-100 ease-in-out hover:shadow-2xl hover:drop-shadow-xl text-stone-600"
      } ${
        isFirstDay(day) ? `${getWeekDay(day)}` : ""
      } flex justify-center items-center rounded-full sm:w-16 sm:h-16 w-10 h-10 cursor-pointer`}
    >
      <span className="font-bold sm:text-2xl text-lg  ">
        {format(day, "d")}
      </span>
    </li>
  );
});

export default Day;
