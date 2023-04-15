export default function getDates(startDate, endDate) {
  const dates = [];
  let currentDate = startDate;
  const addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };
  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = addDays.call(currentDate, 1);
  }

  let monthsArr = [];

  for (let i = 0; i <= 11; i++) {
    let month = dates.filter((day) => day.getMonth() === i);
    monthsArr.push(month);
  }
  return monthsArr;
}
