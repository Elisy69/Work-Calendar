import { format } from "date-fns";

export function getAllDays(
  firstDay,
  workDays,
  dayOffs,
  currentDay,
  overallDays
) {
  const isToday = (day) =>
    format(currentDay, "MM/dd/yyy") === format(day.dateObj, "MM/dd/yyyy");
  const todaysIndex = overallDays.findIndex(isToday);
  const firstChunk = overallDays.slice(0, todaysIndex + firstDay);
  firstChunk.reverse();
  const secondChunk = overallDays.slice(todaysIndex + firstDay);
  if (workDays === dayOffs) {
    let counter = 0;
    const firstChunkWithWorkDays = firstChunk.map((day) => {
      counter === workDays * 2 ? (counter = 0) : "";
      let isWorkDay = counter >= workDays ? true : false;
      counter++;
      return { dateObj: day.dateObj, isWorkDay: isWorkDay };
    });
    firstChunkWithWorkDays.reverse();
    counter = 0;
    const secondChunkWithWorkDays = secondChunk.map((day) => {
      counter === workDays * 2 ? (counter = 0) : "";
      let isWorkDay = counter >= workDays ? false : true;
      counter++;
      return { dateObj: day.dateObj, isWorkDay: isWorkDay };
    });
    return firstChunkWithWorkDays.concat(secondChunkWithWorkDays);
  } else {
    let counter = workDays;
    const firstChunkWithWorkDays = firstChunk.map((day) => {
      counter === workDays + dayOffs ? (counter = 0) : "";
      let isWorkDay = counter >= workDays ? false : true;
      counter++;
      return { dateObj: day.dateObj, isWorkDay: isWorkDay };
    });
    firstChunkWithWorkDays.reverse();
    counter = 0;
    const secondChunkWithWorkDays = secondChunk.map((day) => {
      counter === workDays + dayOffs ? (counter = 0) : "";
      let isWorkDay = counter >= workDays ? false : true;

      counter++;
      return { dateObj: day.dateObj, isWorkDay: isWorkDay };
    });
    return firstChunkWithWorkDays.concat(secondChunkWithWorkDays);
  }
}
