import { format } from "date-fns";
import React from "react";

function MonthTitle({ month }) {
  return (
    <div className="flex justify-center">
      <span className="p-3 text-4xl text-violet-300">
        {format(month[0], "LLLL")}
      </span>
    </div>
  );
}

export default MonthTitle;
