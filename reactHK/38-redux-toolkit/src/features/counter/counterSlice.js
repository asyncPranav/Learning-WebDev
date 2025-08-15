import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    // increment: (state) => { return { value: state.value + 1 } },  // ✅ No draft mutation
    // increment: (state) => {state.value += 1}, // ✅ Just mutate, don't return

    increment: (state) => {state.value += 1},
    decrement: (state) => {state.value -= 1},
    reset: (state) => {state.value = 0},
    incrementByAmount: (state, action) => {state.value += action.payload},
  },
});

// export actions so UI can dispatch them
export const { increment, decrement, reset, incrementByAmount } = counterSlice.actions;

// export reducer so store can use it
export default counterSlice.reducer;