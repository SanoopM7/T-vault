import { createSlice } from "@reduxjs/toolkit";

export const addRemoveSafeSlice = createSlice({
  name: "counter",
  initialState: {
    value: [{}],
  },
  reducers: {
    addSafes: (state) => {},
    removeSafes: (state) => {},
  },
});

export const { addSafes, removeSafes } = counterSlice.actions;

export default addRemoveSafeSlice.reducer;
