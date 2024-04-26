import { useQuery } from "@tanstack/react-query";
import APIClientGeo from "../services/geo-service/api-client";
import ms from "ms";
import APIClientWeather from "../services/weather-service/api-client";
import { groupByDays } from "../utils/groupByDays";
import { IpData } from "../entities/IpData";
import { WeatherResponse } from "../entities/WeatherResponse";
import useSelectedCityStore from "../state-management/selected-city/store";

const apiClientGeo = new APIClientGeo<IpData>("/ipgeo");
const apiClientWeather = new APIClientWeather<WeatherResponse>(
  "/data/2.5/forecast"
);

const useGeo = () => {
  const {
    data: geoData,
    isLoading: geoLoading,
    error: geoError,
  } = useQuery<IpData>({
    queryKey: ["location"],
    queryFn: () => apiClientGeo.getAll(),
    staleTime: ms("24h"),
  });

  const coordinates = geoData
    ? {
        lat: geoData.latitude,
        lon: geoData.longitude,
      }
    : null;

  const {
    data: weatherData,
    isLoading: weatherLoading,
    error: weatherError,
  } = useQuery<WeatherResponse>({
    queryKey: ["weather"],
    queryFn: () =>
      apiClientWeather.getAll({
        params: coordinates,
      }),
    enabled: !!coordinates,
    staleTime: ms("24h"),
  });

  const ipLocationForecast = groupByDays(weatherData?.list);

  return {
    geoData,
    ipLocationForecast,
    geoLoading,
    weatherLoading,
    geoError,
    weatherError,
  };
};

export default useGeo;
