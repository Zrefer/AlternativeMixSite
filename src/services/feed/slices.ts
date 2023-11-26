import { IArticle } from "../../types/article";
import { Status } from "../../types/general";
import { createSlice } from "@reduxjs/toolkit";
import { fetchFeed } from "./actions";

interface FeedState {
  articles: IArticle[];
  last_page: number;
  current_page: number;
  status: Status;
  error: string | null;
}

const initialState: FeedState = {
  articles: [],
  last_page: 0,
  current_page: 0,
  status: Status.Idle,
  error: null,
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.status = Status.Loading;
        state.error = null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        const { articles, last_page, page } = action.payload;

        state.status = Status.Succeeded;
        state.last_page = last_page;
        state.current_page = page;
        state.error = null;

        if (page <= 1) state.articles = articles;
        else state.articles = [...state.articles, ...articles];
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.status = Status.Failed;
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export default feedSlice;
