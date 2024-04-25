import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import APIClientWeather from "../services/weather-service/api-client";
import useSelectedCityStore from "../state-management/selected-city/store";
import { groupByDays } from "../utils/groupByDays";

const apiClient = new APIClientWeather("/data/2.5/forecast");

const useNewCityWeather = () => {
  const { selectedCity } = useSelectedCityStore();
  const {
    data: selectedWeather,
    isLoading: isLoadingNewWeather,
    error: isErrorNewWeather,
  } = useQuery({
    queryKey: ["newCityWeather", selectedCity],
    queryFn: () =>
      apiClient.getAll({
        params: {
          lat: selectedCity?.lat,
          lon: selectedCity?.lon,
          units: "imperial",
        },
      }),
    staleTime: ms("24h"),
    refetchOnMount: false,
  });

  const selectedCityWeather = groupByDays(selectedWeather?.list);
  const city = selectedWeather?.city;

  return { selectedCityWeather, city, isLoadingNewWeather, isErrorNewWeather };
};

export default useNewCityWeather;
