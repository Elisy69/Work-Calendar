import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import {
  CURRENT_DAY,
  FIRST_DAY_OF_WORK,
  OVERALL_DAYS,
} from "../constants/constants";
import { getAllDays } from "/src/UtilityFunctions/getAllDaysAccordingToSchedule";

export const useSchedule = create(
  immer(
    persist(
      (set) => ({
        mySchedule: {
          firstDay: FIRST_DAY_OF_WORK.tomorrow,
          workDays: 4,
          dayOffs: 4,
        },
        setNewSchedule: (firstDay, workDays, dayOffs) =>
          set((state) => {
            state.mySchedule = {
              firstDay: firstDay,
              workDays: workDays,
              dayOffs: dayOffs,
            };
          }),
      }),
      {
        name: "mySchedule",
      }
    )
  )
);

export const useDays = create(
  immer(
    persist(
      (set) => ({
        days: getAllDays(
          useSchedule.getState().mySchedule.firstDay,
          useSchedule.getState().mySchedule.workDays,
          useSchedule.getState().mySchedule.dayOffs,
          CURRENT_DAY,
          OVERALL_DAYS
        ),
        updateSchedule: () =>
          set((state) => {
            state.days = getAllDays(
              useSchedule.getState().mySchedule.firstDay,
              useSchedule.getState().mySchedule.workDays,
              useSchedule.getState().mySchedule.dayOffs,
              CURRENT_DAY,
              OVERALL_DAYS
            );
          }),
        updateCustomSchedule: (customDate) =>
          set((state) => { 
            state.days = getAllDays(
              useSchedule.getState().mySchedule.firstDay,
              useSchedule.getState().mySchedule.workDays,
              useSchedule.getState().mySchedule.dayOffs,
              customDate,
              OVERALL_DAYS
            );
          }),
        toggleDayIsWorking: (dayIndex) =>
          set((state) => {
            state.days[dayIndex].isWorkDay = !state.days[dayIndex].isWorkDay;
          }),
      }),
      { name: "overallDays" }
    )
  )
);
