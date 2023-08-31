import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { getAllDaysAccordingToSchedule } from "../UtilityFunctions/getAllDaysAccordingToSchedule";
import {
  CURRENT_DAY,
  FIRST_DAY_OF_WORK,
  OVERALL_DAYS,
} from "../constants/constants";

export const useSchedule = create(() => ({
  mySchedule: {
    firstDay: FIRST_DAY_OF_WORK.tomorrow,
    shift: 4,
  },
}));

export const useDays = create(
  immer(
    persist(
      (set) => ({
        days: getAllDaysAccordingToSchedule(
          useSchedule.getState().mySchedule,
          CURRENT_DAY,
          OVERALL_DAYS
        ),
        toggleDayIsWorking: (dayIndex) =>
          set((state) => {
            state.days[dayIndex].isWorkDay = !state.days[dayIndex].isWorkDay;
          }),
      }),
      { name: "overallDays" }
    )
  )
);
