import { createSlice } from "@reduxjs/toolkit";
import { authUser, fetchUser } from "./actions";
import { IUser } from "../../types/user";
import { Status } from "../../types/actionStatus";

interface UserState {
  user: IUser | null;
  authStatus: Status;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  authStatus: Status.Idle,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.authStatus = Status.Idle;
      state.error = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.authStatus = Status.Loading;
        state.error = null;
        state.user = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.authStatus = Status.Succeeded;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.authStatus = Status.Failed;
        state.user = null;
        state.error = action.error.message ?? "Unknown error";
      })
      .addCase(authUser.pending, (state) => {
        state.authStatus = Status.Loading;
        state.error = null;
        state.user = null;
      })
      .addCase(authUser.rejected, (state, action) => {
        state.authStatus = Status.Failed;
        state.user = null;
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export default userSlice;
