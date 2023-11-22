import { ILoginForm, IRegisterForm } from "../../types/forms";
import {
  fetchUserRequest,
  loginUserRequest,
  logoutUserRequest,
  registerUserRequest,
} from "../../utils/api";

import { IUser } from "../../types/user";
import { createAsyncThunk } from "@reduxjs/toolkit";
import userSlice from "./slices";

export const registerUser = createAsyncThunk<
  void,
  IRegisterForm,
  { rejectValue: string }
>(
  "user/registerUser",
  async (form: IRegisterForm, { rejectWithValue, dispatch }) => {
    try {
      await registerUserRequest(form);

      const loginForm: ILoginForm = {
        username: form.nick,
        password: form.password,
      };
      await dispatch(loginUser(loginForm));
    } catch (error) {
      if (error instanceof Error) rejectWithValue(error.message);
      rejectWithValue("An unknown error occurred");
    }
  }
);

export const loginUser = createAsyncThunk<
  void,
  ILoginForm,
  { rejectValue: string }
>("user/loginUser", async (form: ILoginForm, { rejectWithValue, dispatch }) => {
  try {
    const accessToken = await loginUserRequest(form);
    localStorage.setItem("access-token", accessToken);
    await dispatch(fetchUser());
  } catch (error) {
    if (error instanceof Error) rejectWithValue(error.message);
    rejectWithValue("An unknown error occurred");
  }
});

export const logoutUser = createAsyncThunk<void, void>(
  "user/logoutUser",
  async (_, { dispatch }) => {
    dispatch(userSlice.actions.logout());

    const accessToken = localStorage.getItem("access-token");
    localStorage.removeItem("access-token");
    if (accessToken) await logoutUserRequest(accessToken);
  }
);

export const fetchUser = createAsyncThunk<IUser, void, { rejectValue: string }>(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    const accessToken = localStorage.getItem("access-token");
    if (!accessToken) return rejectWithValue("Token was null");

    try {
      return await fetchUserRequest(accessToken);
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("An unknown error occurred");
    }
  }
);
