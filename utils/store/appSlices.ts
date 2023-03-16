import { createSlice } from "@reduxjs/toolkit";
import { KanbanTaskType, PomodoroPreferencesType } from "../../types";

const initialState = {
  preferences: {
    pomo: 25,
    untilLong: 5,
    short: 5,
    long: 15,
    sound: false,
  },
  tasks: {},
};

export const appSlice = createSlice({
  name: "pomodoro-preferences",
  initialState,

  reducers: {
    getPreferences(state, action: { payload: PomodoroPreferencesType }) {
      state.preferences = action.payload;
    },
    getTasks(state, action: { payload: KanbanTaskType }) {
      state.tasks = action.payload;
    },
  },
});

export const { getPreferences, getTasks } = appSlice.actions;
export default appSlice.reducer;
