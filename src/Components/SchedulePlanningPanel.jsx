import React from "react";

function SchedulePlanningPanel() {
  return (
    <div className="h-[6%] pr-16 text-sm font-medium flex justify-evenly items-center">
      <button
        onClick={() => {
          setModal(true);
          setShift(1);
        }}
        className="bg-indigo-500 shadow-lg shadow-indigo-500/50 w-28 h-7 rounded-lg hover:bg-violet-800 hover:shadow-lg hover:shadow-violet-800/50 ease-in duration-100"
      >
        One/Three
      </button>
      <button
        onClick={() => {
          setModal(true);
          setShift(2);
        }}
        className="bg-indigo-500 shadow-lg shadow-indigo-500/50 w-28 h-7 rounded-lg hover:bg-violet-800 hover:shadow-lg hover:shadow-violet-800/50 ease-in duration-100"
      >
        Two/Two
      </button>
      <button
        onClick={() => {
          setModal(true);
          setShift(3);
        }}
        className="bg-indigo-500 shadow-lg shadow-indigo-500/50 w-28 h-7 rounded-lg hover:bg-violet-800 hover:shadow-lg hover:shadow-violet-800/50 ease-in duration-100"
      >
        Three/Three
      </button>
      <button
        onClick={() => {
          setModal(true);
          setShift(4);
        }}
        className="bg-indigo-500 shadow-lg shadow-indigo-500/50 w-28 h-7 rounded-lg hover:bg-violet-800 hover:shadow-lg hover:shadow-violet-800/50 ease-in duration-100"
      >
        Four/Four
      </button>
      <button
        onClick={() => {
          setModal(true);
        }}
        className="bg-red-800 shadow-lg shadow-rose-800/50 w-8 h-7 rounded-lg hover:bg-rose-900 hover:shadow-lg hover:shadow-rose-900/50 ease-in duration-100"
      >
        +
      </button>
    </div>
  );
}

export default SchedulePlanningPanel;
