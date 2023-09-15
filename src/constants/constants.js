import { getDates } from "./utilityFunctions/getDateArray";

const YEARS = [2022, 2023, 2024];

export const MONTHS = YEARS.map((year) =>
  getDates(new Date(year, 0, 1), new Date(year, 11, 31))
).flat();

export const FIRST_DAY_OF_WORK = {
  twoDaysAgo: -3,
  yesterday: -1,
  today: 0,
  tomorrow: 1,
  inTwoDays: 2,
};

export const CURRENT_DAY = new Date();

export const OVERALL_DAYS = MONTHS.flat().map((day) => {
  return { dateObj: day, isWorkDay: false };
}); // 1096
