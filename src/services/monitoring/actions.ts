import { IMonitoring } from "../../types/monitoring";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMonitoringRequest } from "../../utils/api";

export const fetchMonitoring = createAsyncThunk<
  IMonitoring[],
  undefined,
  { rejectValue: string }
>("monitoring/fetchMonitoring", async (_, { rejectWithValue }) => {
  try {
    return await fetchMonitoringRequest();
  } catch (error) {
    if (error instanceof Error) return rejectWithValue(error.message);
    return rejectWithValue("An unknown error occurred");
  }
});
