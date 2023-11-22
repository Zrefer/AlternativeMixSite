import { IArticlesData } from "../../types/article";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFeedRequest } from "../../utils/api";

interface IFetchFeed extends IArticlesData {
  page: number;
}

export const fetchFeed = createAsyncThunk<
  IFetchFeed,
  number,
  { rejectValue: string }
>("feed/fetchFeed", async (page, { rejectWithValue }) => {
  try {
    return { ...(await fetchFeedRequest(page)), page };
  } catch (error) {
    if (error instanceof Error) return rejectWithValue(error.message);
    return rejectWithValue("An unknown error occurred");
  }
});
