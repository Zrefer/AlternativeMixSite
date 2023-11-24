import { ICabinetData } from "../../types/cabinet";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCabinetRequest } from "../../utils/api";

export const fetchCabinet = createAsyncThunk<
  ICabinetData,
  void,
  { rejectValue: string }
>("cabinet/fetchCabinet", async (_, { rejectWithValue }) => {
  const accessToken = localStorage.getItem("access-token");
  if (!accessToken) return rejectWithValue("Token was null");

  try {
    return await fetchCabinetRequest(accessToken);
  } catch (error) {
    if (error instanceof Error) return rejectWithValue(error.message);
    return rejectWithValue("An unknown error occurred");
  }
});
