import format from "date-fns/format";
import { forwardRef, useEffect, useState } from "react";

const Day = forwardRef(function Day({ day, dayState }, ref) {
  const [workDay, setWorkDay] = useState(dayState);

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

  return (
    <li
      ref={ref}
      onClick={() => setWorkDay(workDay ? false : true)}
      className={`${
        workDay
          ? "bg-pink-900 transition duration-100 ease-in-out hover:bg-red-900 hover:scale-110 "
          : "transition duration-100 ease-in-out hover:shadow-2xl "
      } ${
        isFirstDay(day) ? `${getWeekDay(day)}` : ""
      } flex justify-center items-center rounded-full w-16 h-16 cursor-pointer`}
    >
      <span className="font-bold text-2xl text-indigo-200 ">
        {format(day, "d")}
      </span>
    </li>
  );
});

export default Day;
