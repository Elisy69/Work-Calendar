import React from "react";
import SchedulePlanningPanel from "./сomponents/SchedulePlanningPanel";
import CalendarWindow from "/src/сomponents/CalendarWindow";

function App() {
  return (
    <div className="flex flex-col justify-start mt-4 sm:mt-0 sm:justify-center items-center w-full h-full relative">
      <CalendarWindow />
      <SchedulePlanningPanel />
    </div>
  );
}

export default App;
