import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILoginForm, IUser } from "../../types/user";
import { fetchUserData, loginUser, logoutUser } from "../../utils/api";
import userSlice from "./slices";

export const authUser = createAsyncThunk<
  void,
  ILoginForm,
  { rejectValue: string }
>("user/authUser", async (form: ILoginForm, { rejectWithValue, dispatch }) => {
  try {
    const accessToken = await loginUser(form);
    localStorage.setItem("access-token", accessToken);
    await dispatch(fetchUser());
  } catch (error) {
    if (error instanceof Error) rejectWithValue(error.message);
    rejectWithValue("An unknown error occurred");
  }
});

export const exitUser = createAsyncThunk<void, void>(
  "user/exitUser",
  async (_, { dispatch }) => {
    dispatch(userSlice.actions.logout());

    const accessToken = localStorage.getItem("access-token");
    localStorage.removeItem("access-token");
    if (accessToken) await logoutUser(accessToken);
  }
);

export const fetchUser = createAsyncThunk<IUser, void, { rejectValue: string }>(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    const accessToken = localStorage.getItem("access-token");
    if (!accessToken) return rejectWithValue("Token was null");

    try {
      return await fetchUserData(accessToken);
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("An unknown error occurred");
    }
  }
);
