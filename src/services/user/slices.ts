import { fetchUser, loginUser, registerUser } from "./actions";

import { IUser } from "../../types/user";
import { Status } from "../../types/general";
import { createSlice } from "@reduxjs/toolkit";

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
      state.authStatus = Status.Succeeded;
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
      .addCase(loginUser.pending, (state) => {
        state.authStatus = Status.Loading;
        state.error = null;
        state.user = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.authStatus = Status.Failed;
        state.user = null;
        state.error = action.error.message ?? "Unknown error";
      })
      .addCase(registerUser.pending, (state) => {
        state.authStatus = Status.Loading;
        state.error = null;
        state.user = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.authStatus = Status.Failed;
        state.user = null;
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export default userSlice;
