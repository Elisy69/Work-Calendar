import { format, getDayOfYear } from "date-fns";
import { el } from "date-fns/locale";
import { useEffect, useRef, useState } from "react";
import Day from "./Components/Day";
import Modal from "./Components/Modal";
import ToDo from "./Components/Todo";
import getDates from "./UtilityFunctions/getDateArray";

const dates = getDates(new Date(2023, 0, 1), new Date(2023, 11, 31));
const currentDate = getDayOfYear(new Date());
const overallDays = dates.flat().length;

function App() {
  const isWorkdayRef = useRef(false);
  const dayRef = useRef(null);
  const [shift, setShift] = useState(4);
  const [mySchedule, setSchedule] = useState({
    firstDay: currentDate,
    shift: 4,
  });
  const [modal, setModal] = useState(false);

  let count = 0;
  let count2 = 0;
  let decrementCount = 0;
  let leftOverCount = 0;
  let currentDay = mySchedule.firstDay;
  let currentDayForSchedule = mySchedule.firstDay;

  const schedule = mySchedule.shift;

  useEffect(() => {
    console.log(dayRef.current);
  }, [dayRef]);

  useEffect(() => {}, [mySchedule]);

  function createNewSchedule(firstDay) {
    const day = currentDate + firstDay;
    setSchedule({ firstDay: day, shift: shift });
    setModal(false);
  }

  function makeSchedule() {
    if (currentDay - currentDayForSchedule === schedule) {
      currentDayForSchedule = currentDay;
      currentDay++;
      isWorkdayRef.current = !isWorkdayRef.current;
    } else {
      leftOverCount++;
      if (leftOverCount < 2) {
        isWorkdayRef.current = !isWorkdayRef.current;
      }
      currentDay++;
    }
  }

  function makeBackwardSchedule() {
    let schedule2 = mySchedule.shift;
    let leftOver = (currentDay - 1) % schedule;
    if (leftOver > 0 && decrementCount < leftOver) {
      decrementCount++;
      isWorkdayRef.current = false;
    } else {
      if (decrementCount <= schedule + leftOver) {
        schedule2 = schedule + leftOver;
      } else {
        schedule2 = schedule;
      }
      if (decrementCount - count2 === schedule2) {
        count2 = decrementCount;
        decrementCount++;
        isWorkdayRef.current = !isWorkdayRef.current;
      } else {
        if (decrementCount <= leftOver) {
          isWorkdayRef.current = true;
        }
        decrementCount++;
      }
    }
  }

  function scrollToId(dayId) {
    const map = getMap();
    const node = map.get(dayId);
    node.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
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
      <div className="h-[6%] text-xl font-medium flex justify-evenly items-center pr-16 ">
        <span>Mn</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thr</span>
        <span>Fr</span>
        <span>St</span>
        <span>Sn</span>
      </div>
      <div
        className={`h-[88%] rounded-2xl bg-gradient-to-r from-indigo-900 bg-violet-800 shadow-lg p-2 pr-10 overflow-scroll relative`}
      >
        <button
          onClick={() => {
            scrollToId(currentDate);
          }}
          className="fixed bg-red-800 shadow-lg shadow-rose-800/50 w-20 h-7 rounded-lg hover:bg-rose-900 hover:shadow-lg hover:shadow-rose-900/50 ease-in duration-100"
        >
          Return
        </button>
        {dates.map((month) => (
          <div className="flex-col" key={crypto.randomUUID()}>
            <div className="flex justify-center">
              <span className="p-3 text-2xl">{format(month[0], "LLLL")}</span>
            </div>
            <ul
              className="grid grid-cols-7 grid-rows-6"
              key={crypto.randomUUID()}
            >
              {month.map((day) => {
                count++;
                if (count < currentDay) {
                  makeBackwardSchedule();
                } else {
                  makeSchedule();
                }

                return (
                  <Day
                    day={day}
                    key={crypto.randomUUID()}
                    dayState={isWorkdayRef.current}
                    ref={(node) => {
                      const map = getMap();
                      if (node) {
                        map.set(node);
                      } else {
                        map.delete();
                      }
                    }}
                  />
                );
              })}
            </ul>
          </div>
        ))}
        <Modal status={modal} onSelect={createNewSchedule}></Modal>
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
