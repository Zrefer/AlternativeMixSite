import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../types/user";
import { fetchUserData } from "../../utils/api";

export const fetchUser = createAsyncThunk<
  IUser,
  string,
  { rejectValue: string }
>("user/fetchUser", async (token, { rejectWithValue }) => {
  try {
    return await fetchUserData(token);
  } catch (error) {
    if (error instanceof Error) return rejectWithValue(error.message);
    return rejectWithValue("An unknown error occurred");
  }
});
