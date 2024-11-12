import { Pokemon } from "@/hooks/pokemonHooks";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

type FavoriteState = {
  favorites: Pokemon[];
};

const initialState: FavoriteState = {
  favorites: [],
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Pokemon>) => {
      state.favorites.push(action.payload);
    },
    remove: (state, action: PayloadAction<Pokemon>) => {
      state.favorites = state.favorites.filter(
        (pokemon) => pokemon.url !== action.payload.url
      );
    },
  },
});

export const { add, remove } = favoriteSlice.actions;
export const selectFavorites = (state: RootState) => state.Favorite.favorites;
