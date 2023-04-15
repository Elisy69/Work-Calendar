import format from "date-fns/format";
import { forwardRef, useEffect, useState } from "react";

const Day = forwardRef(function Day({ day, dayState, count }, ref) {
  const [workDay, setWorkDay] = useState(dayState);

  useEffect(() => {
    console.log(count);
  }, [count]);

  return (
    <li
      ref={ref}
      onClick={() => setWorkDay(workDay ? false : true)}
      className={workDay ? "bg-red-600" : "bg-green-700"}
    >
      {format(day, "d")}
    </li>
  );
});

export default Day;
