import { format, getDayOfYear } from "date-fns";
import { el } from "date-fns/locale";
import { useEffect, useRef, useState } from "react";
import Day from "./Components/Day";
import Modal from "./Components/Modal";
import ToDo from "./Components/Todo";
import getDates from "./UtilityFunctions/getDateArray";

const dates = getDates(new Date(2023, 0, 1), new Date(2023, 11, 31));
const currentDate = getDayOfYear(new Date());
const overallDays = dates.flat().map((day) => {
  return getDayOfYear(day);
});

function App() {
  const isWorkdayRef = useRef(false);
  const dayRef = useRef(null);
  const [shift, setShift] = useState(4);
  const [mySchedule, setSchedule] = useState({
    firstDay: currentDate,
    shift: 4,
  });
  const [modal, setModal] = useState(false);

  let count2 = 0;
  let leftOverCount = 0;
  let currentDayForSchedule = mySchedule.firstDay;

  useEffect(() => {}, [dayRef]);

  function createNewSchedule(firstDay) {
    const day = currentDate + firstDay;
    setSchedule({ firstDay: day, shift: shift });
    setModal(false);
  }

  function makeSchedule(day) {
    if (day - currentDayForSchedule === mySchedule.shift) {
      currentDayForSchedule = day;
      isWorkdayRef.current = !isWorkdayRef.current;
    } else {
      console.log(`LEFTOVER`);
      leftOverCount++;
      if (leftOverCount < 2) {
        console.log(`LEFTOVER 2`);
        isWorkdayRef.current = !isWorkdayRef.current;
      }
    }
  }

  function makeBackwardSchedule(day) {
    let schedule2 = mySchedule.shift; // 4
    let leftOver = mySchedule.firstDay % mySchedule.shift; // 1
    if (leftOver > 0 && day < leftOver) {
      isWorkdayRef.current = true;
    } else {
      if (day <= mySchedule.shift + leftOver) {
        schedule2 = mySchedule.shift + leftOver;
      } else {
        schedule2 = mySchedule.shift;
      }
      if (day - count2 === schedule2) {
        count2 = day;

        isWorkdayRef.current = !isWorkdayRef.current;
      } else {
        if (day <= leftOver) {
          isWorkdayRef.current = false;
        }
      }
    }
  }

  function scrollToId(dayId) {
    const map = getMap();
    console.log(map);
    console.log(dayId);
    const node = map.get(dayId);
    console.log(node);
    node.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  }

  function getMap() {
    if (!dayRef.current) {
      dayRef.current = new Map();
    }
    return dayRef.current;
  }

  return (
    <div
      className="w-full 
    max-w-4xl h-full max-h-[53rem] mt-10 pr-40
    flex-col relative"
    >
      <div className="grid grid-cols-7 grid-rows-1 h-[6%] text-3xl font-medium justify-items-center pr-24 pl-8 text-violet-300">
        <span>Mn</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thr</span>
        <span>Fr</span>
        <span>St</span>
        <span>Sn</span>
      </div>
      <div
        className={`h-[88%] rounded-2xl bg-gradient-to-r from-violet-900 via-indigo-600 to-purple-900 shadow-lg p-2 pr-24 pl-8 relative ${
          modal ? "overflow-clip" : "overflow-scroll"
        }`}
      >
        <button
          onClick={() => {
            scrollToId(currentDate);
          }}
          className="z-50 fixed bg-red-800 shadow-lg shadow-rose-800/50 w-20 h-7 rounded-lg hover:bg-rose-900 hover:shadow-lg hover:shadow-rose-900/50 ease-in duration-100"
        >
          Return
        </button>
        {dates.map((month) => (
          <div className="flex-col" key={crypto.randomUUID()}>
            <div className="flex justify-center">
              <span className="p-3 text-4xl text-violet-300">
                {format(month[0], "LLLL")}
              </span>
            </div>
            <ul
              className="grid grid-cols-7 justify-items-center gap-y-2"
              key={crypto.randomUUID()}
            >
              {month.map((day) => {
                let currentDay = getDayOfYear(day);

                if (currentDay < mySchedule.firstDay) {
                  makeBackwardSchedule(currentDay);
                } else {
                  makeSchedule(currentDay);
                }

                return (
                  <Day
                    day={day}
                    key={crypto.randomUUID()}
                    dayState={isWorkdayRef.current}
                    ref={(node) => {
                      const map = getMap();
                      if (node) {
                        map.set(getDayOfYear(day), node);
                      } else {
                        map.delete(getDayOfYear(day));
                      }
                    }}
                  />
                );
              })}
            </ul>
          </div>
        ))}
        <Modal
          status={modal}
          onSelect={createNewSchedule}
          changeStatus={() => {
            setModal(false);
          }}
        ></Modal>
      </div>

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
      <ToDo></ToDo>
    </div>
  );
}

export default App;
