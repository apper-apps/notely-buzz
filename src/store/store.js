import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "@/store/notesSlice";

export const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
});