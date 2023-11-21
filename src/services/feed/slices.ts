import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/user";
import { Status } from "../../types/actionStatus";
import { IArticle, IArticlesData } from "../../types/article";
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
        state.status = Status.Succeeded;
        state.articles = action.payload.articles;
        state.last_page = action.payload.last_page;
        state.current_page = action.payload.page;
        state.error = null;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.status = Status.Failed;
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export default feedSlice;
