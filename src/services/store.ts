import cabinetSlice from "./cabinet/slices";
import { configureStore } from "@reduxjs/toolkit";
import feedSlice from "./feed/slices";
import monitoringSlice from "./monitoring/slices";
import userSlice from "./user/slices";

export const store = configureStore({
  reducer: {
    userStore: userSlice.reducer,
    feedStore: feedSlice.reducer,
    cabinetStore: cabinetSlice.reducer,
    monitoringStore: monitoringSlice.reducer,
  },
  devTools: process.env.NODE_ENV === "development",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
