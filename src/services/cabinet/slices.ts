import { ICabinetData } from "../../types/cabinet";
import { Status } from "../../types/general";
import { createSlice } from "@reduxjs/toolkit";
import { fetchCabinet } from "./actions";

interface CabinetState {
  cabinet: ICabinetData | null;
  cabinetLoadStatus: Status;
  error: string | null;
}

const initialState: CabinetState = {
  cabinet: null,
  cabinetLoadStatus: Status.Idle,
  error: null,
};

export const cabinetSlice = createSlice({
  name: "cabinet",
  initialState,
  reducers: {
    resetCabinet: () => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCabinet.pending, (state) => {
        state.cabinetLoadStatus = Status.Loading;
        state.cabinet = null;
        state.error = null;
      })
      .addCase(fetchCabinet.fulfilled, (state, action) => {
        state.cabinetLoadStatus = Status.Succeeded;
        state.cabinet = action.payload;
        state.error = null;
      })
      .addCase(fetchCabinet.rejected, (state, action) => {
        state.cabinetLoadStatus = Status.Failed;
        state.cabinet = null;
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export default cabinetSlice;
