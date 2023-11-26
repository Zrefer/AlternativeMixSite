import { IMonitoring } from "../../types/monitoring";
import { createSlice } from "@reduxjs/toolkit";
import { fetchMonitoring } from "./actions";

const initialState: { servers: IMonitoring[] } = {
  servers: [],
};

export const monitoringSlice = createSlice({
  name: "monitoring",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMonitoring.fulfilled, (state, action) => {
      state.servers = action.payload;
    });
  },
});

export default monitoringSlice;
