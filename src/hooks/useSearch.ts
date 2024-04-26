import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import APIClientWeather from "../services/weather-service/api-client";
import { SearchResult } from "../entities/SearchResult";
import useQueryStore from "../state-management/search-query/store";
const apiClient = new APIClientWeather<SearchResult[]>("/geo/1.0/direct");

const useFindCity = () => {
  const { query } = useQueryStore();
  const {
    data: cities,
    isLoading,
    error,
    refetch,
  } = useQuery<SearchResult[]>({
    queryKey: ["query", query],
    queryFn: () =>
      apiClient.getAll({
        params: { q: query, limit: 5 },
      }),
    staleTime: ms("24h"),
    refetchOnMount: false,
  });

  return { cities, isLoading, error, refetch };
};

export default useFindCity;
