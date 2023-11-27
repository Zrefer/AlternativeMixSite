import { IShopStore } from "../../types/shop";
import { Status } from "../../types/general";
import { createSlice } from "@reduxjs/toolkit";
import { fetchShop } from "./actions";

interface ShopState extends IShopStore {
  status: Status;
  error: string | null;
}

const initialState: ShopState = {
  status: Status.Idle,
  error: null,
  shops: [],
  enchants: [],
};

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    resetShop: () => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShop.pending, (state) => {
        state.status = Status.Loading;
        state.error = null;
      })
      .addCase(fetchShop.fulfilled, (state, action) => {
        return { ...action.payload, status: Status.Succeeded, error: null };
      })
      .addCase(fetchShop.rejected, (state, action) => {
        state.status = Status.Failed;
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export default shopSlice;
