import React, { memo } from "react";
import Day from "../day/Day";
import MonthTitle from "./MonthTitle.jsx";
import DayOfWeekPanel from "./dayOfWeekPanel";

const Month = memo(function Month({ currentMonth, innerRef }) {
  return (
    <div className="flex-col" key={crypto.randomUUID()} ref={innerRef}>
      <MonthTitle month={currentMonth} />
      <DayOfWeekPanel />
      <ul
        className="grid grid-cols-7 justify-items-center gap-y-2"
        key={crypto.randomUUID()}
      >
        {currentMonth.map((day) => {
          return <Day day={day} key={crypto.randomUUID()} />;
        })}
      </ul>
    </div>
  );
});

export default Month;
