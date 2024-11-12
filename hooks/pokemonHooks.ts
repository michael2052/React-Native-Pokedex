import { types } from "@babel/core";
import { getPokeApi, useApi } from "./useApi";
import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

interface PokemonResponse {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
}

export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonDetail {
  abilities: Ability[];
  base_experience: number;
  height: number;
  weight: number;
  id: number;
  name: string;
  species: Species;
  types: Type[];
  sprites: Sprites;
}

interface Sprites {
  front_default: string;
}

interface Ability {
  ability: Species;
  is_hidden: boolean;
  slot: number;
}

interface Species {
  name: string;
  url: string;
}

interface Type {
  slot: number;
  type: Species;
}

export const usePokemons = () => {
  const {
    data,
    isError: error,
    isLoading,
    fetchNextPage,
  } = useInfiniteQuery({
    initialPageParam: "",
    queryKey: ["pokemons"],
    queryFn: async ({ pageParam }) => {
      if (pageParam === "") {
        return await getPokeApi<PokemonResponse>(`pokemon?limit=20`);
      } else {
        return await getPokeApi<PokemonResponse>(pageParam);
      }
    },
    getNextPageParam: (lastPage, _pages) => lastPage.next,
  });
  const loadMore = () => {
    fetchNextPage();
  };

  return {
    pokemon: data?.pages.flatMap((p) => p.results),
    error,
    isLoading,
    loadMore,
  };
};

export const usePokemonDetail = (url: string) => {
  const { data, error, isLoading } = useApi<PokemonDetail>(url, [url]);

  return { error, isLoading, detail: data };
};

export const usePokemonSprite = (url: string) => {
  const { error, isLoading, detail } = usePokemonDetail(url);

  return { error, isLoading, sprite: detail?.sprites.front_default };
};
