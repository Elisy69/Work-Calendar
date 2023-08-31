import React from "react";
import Modal from "./Components/Modal";
import SchedulePlanningPanel from "./Components/SchedulePlanningPanel";
import CalendarWindow from "/src/Components/CalendarWindow";

function App() {
  function createNewSchedule() {}
  return (
    <div className="w-full h-full max-w-2xl max-h-[53rem] mt-10 flex-col relative">
      <CalendarWindow />
      <Modal
        status={false}
        onSelect={createNewSchedule}
        changeStatus={() => {
          setModal(false);
        }}
      ></Modal>
      <SchedulePlanningPanel />
    </div>
  );
}

export default App;
