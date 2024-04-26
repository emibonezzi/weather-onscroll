import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.ipgeolocation.io",
  params: {
    apiKey: import.meta.env.VITE_API_KEY_GEO,
  },
});

class APIClientGeo<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll() {
    return axiosInstance.get<T>(this.endpoint).then((res) => res.data);
  }
}

export default APIClientGeo;
