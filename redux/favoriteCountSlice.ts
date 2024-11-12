import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { add, remove } from "./favoriteSlice";
import { RootState } from ".";

// Define the actions
const addAction = "favorite/add";
const removeAction = "favorite/remove";
const resetAction = "favorite/reset";

type FavoriteCountState = {
  favoriteCount: number;
};

const initialState: FavoriteCountState = {
  favoriteCount: 0,
};

export const favoriteCountSlice = createSlice({
  name: "favoriteCount",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAction, (state, _action) => {
        state.favoriteCount += 1;
      })
      .addCase(removeAction, (state, _action) => {
        state.favoriteCount -= 1;
      })
      .addCase(resetAction, (state, _action) => {
        state.favoriteCount = 0;
      });
  },
});

export const selectFavoriteCount = (state: RootState) =>
  state.favoriteCount.favoriteCount;
