import { format } from "date-fns";

export function getAllDaysAccordingToSchedule(
  mySchedule,
  currentDay,
  overallDays
) {
  console.log("getalldays working");
  let counter = 1;
  const isToday = (day) =>
    format(currentDay, "MM/dd/yyy") === format(day.dateObj, "MM/dd/yyyy");
  const todaysIndex = overallDays.findIndex(isToday);
  const firstChunk = overallDays.slice(0, todaysIndex + mySchedule.firstDay);
  firstChunk.reverse();
  const secondChunk = overallDays.slice(todaysIndex + mySchedule.firstDay);
  const firstChunkWithWorkDays = firstChunk.map((day) => {
    counter === mySchedule.shift * 2 + 1 ? (counter = 1) : "";
    let isWorkDay = counter > mySchedule.shift ? true : false;
    counter++;
    return { dateObj: day.dateObj, isWorkDay: isWorkDay };
  });
  firstChunkWithWorkDays.reverse();
  counter = 1;
  const secondChunkWithWorkDays = secondChunk.map((day) => {
    counter === mySchedule.shift * 2 + 1 ? (counter = 1) : "";
    let isWorkDay = counter > mySchedule.shift ? false : true;
    counter++;
    return { dateObj: day.dateObj, isWorkDay: isWorkDay };
  });
  return firstChunkWithWorkDays.concat(secondChunkWithWorkDays);
}
