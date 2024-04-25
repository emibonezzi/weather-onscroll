import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import useNewCityStore from "../state-management/new-city/store";
import APIClientWeather from "../services/weather-service/api-client";
const apiClient = new APIClientWeather("/geo/1.0/direct");

const useFindCity = () => {
  const { newCity } = useNewCityStore();
  const {
    data: cities,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["newCity", newCity],
    queryFn: () =>
      apiClient.getAll({
        params: { q: newCity, limit: 5 },
      }),
    staleTime: ms("24h"),
    refetchOnMount: false,
  });

  return { cities, isLoading, error, refetch };
};

export default useFindCity;
