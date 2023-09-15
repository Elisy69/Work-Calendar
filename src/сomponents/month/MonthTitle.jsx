import { format } from "date-fns";
import React from "react";

function MonthTitle({ month }) {
  return (
    <div className="flex p-3">
      <div className="ml-auto sm:pl-10 pl-4 sm:text-4xl text-2xl text-stone-900 ">
        {format(month[0], "LLLL")}
      </div>
      <div className="ml-auto sm:text-lg text-xs text-blue-300 self-end">
        {format(month[0], "yyyy")}
      </div>
    </div>
  );
}

export default MonthTitle;
