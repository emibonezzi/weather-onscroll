import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";

interface SelectedCityStore {
  selectedCity: {
    lat: number;
    lon: number;
  };
  setSelectedCity: (city: { lat: number; lon: number }) => void;
}

const useSelectedCityStore = create<SelectedCityStore>((set) => ({
  selectedCity: {
    lat: 0,
    lon: 0,
  },
  setSelectedCity: (city) => set(() => ({ selectedCity: city })),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("SelectedCityStore", useSelectedCityStore);
}

export default useSelectedCityStore;
