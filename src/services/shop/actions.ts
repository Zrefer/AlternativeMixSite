import { IShop, IShopStore } from "../../types/shop";
import {
  fetchShopCategoriesRequest,
  fetchShopItemsRequest,
  fetchShopsEnchantsRequest,
  fetchShopsRequest,
} from "../../utils/api";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchShop = createAsyncThunk<
  IShopStore,
  undefined,
  { rejectValue: string }
>("shop/fetchShop", async (_, { rejectWithValue }) => {
  try {
    const enchants = await fetchShopsEnchantsRequest();
    const shopsBase = await fetchShopsRequest();

    const shops: IShop[] = [];
    for (const shopBase of shopsBase) {
      const categories = await fetchShopCategoriesRequest(shopBase.id);
      const items = await fetchShopItemsRequest(shopBase.id);

      shops.push({ ...shopBase, categories, items });
    }

    return { enchants, shops };
  } catch (error) {
    if (error instanceof Error) return rejectWithValue(error.message);
    return rejectWithValue("An unknown error occurred");
  }
});
