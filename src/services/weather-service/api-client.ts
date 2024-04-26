import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.openweathermap.org",
  params: {
    appid: import.meta.env.VITE_API_KEY_WEATHER,
    units: "imperial",
  },
});

class APIClientWeather<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll(config: AxiosRequestConfig) {
    return axiosInstance.get<T>(this.endpoint, config).then((res) => res.data);
  }
}

export default APIClientWeather;
