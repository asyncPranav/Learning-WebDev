import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
    },
    updateToPastes: (state, action) => {
      const paste = action.payload;
      const { id, title, content } = paste;
      const index = state.pastes.findIndex((p) => p.id === id);
      if (index !== -1) {
        state.pastes[index] = { ...state.pastes[index], title, content };
      }
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
    },
    removeFromPastes: (state, action) => {
      const id = action.payload;
      state.pastes = state.pastes.filter((p) => p.id !== id);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
    },
    resetAllPastes: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
    },
  },
});

export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions;
export default pasteSlice.reducer;
