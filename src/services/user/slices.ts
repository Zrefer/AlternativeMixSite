import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "./actions";
import { IUser } from "../../types/user";
import { Status } from "../../types/actionStatus";

interface UserState {
  user: IUser | null;
  status: Status;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  status: Status.Idle,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    tokenAbsent: (state) => {
      state.status = Status.Failed;
      state.error = "Token was null";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = Status.Loading;
        state.error = null;
        state.user = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = Status.Succeeded;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = Status.Failed;
        state.user = null;
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export default userSlice;
