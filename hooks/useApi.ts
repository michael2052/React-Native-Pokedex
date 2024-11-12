import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const pokeApi = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

export const useApi = <T>(url: string, key: unknown[]) => {
  const {
    isLoading,
    isError: error,
    data,
  } = useQuery({
    queryKey: key,
    queryFn: async () => {
      return await getPokeApi<T>(url);
    },
  });
  return { error, isLoading, data };
};

export const getPokeApi = async <T>(url: string) => {
  const response = await pokeApi.get<T>(url);
  return response.data;
};
