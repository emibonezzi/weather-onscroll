import { useQuery } from "@tanstack/react-query";
import APIClientGeo from "../services/geo-service/api-client";
import ms from "ms";
import APIClientWeather from "../services/weather-service/api-client";

const apiClientGeo = new APIClientGeo("/ipgeo");
const apiClientWeather = new APIClientWeather("/data/2.5/forecast");

const useGeo = () => {
  const {
    data: geoData,
    isLoading: geoLoading,
    error: geoError,
  } = useQuery({
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
  } = useQuery({
    queryKey: ["weather"],
    queryFn: () =>
      apiClientWeather.getAll({
        params: coordinates,
      }),
    enabled: !!coordinates,
    staleTime: ms("24h"),
  });

  return { geoData, weatherData, geoLoading, weatherLoading };
};

export default useGeo;
