import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/slices";
import feedSlice from "./feed/slices";

export const store = configureStore({
  reducer: {
    userStore: userSlice.reducer,
    feedStore: feedSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
