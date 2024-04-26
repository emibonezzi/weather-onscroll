import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";
import { SearchResult } from "../../entities/SearchResult";

interface SelectedCityStore {
  selectedCity: SearchResult;
  setSelectedCity: (city: SearchResult) => void;
}

const useSelectedCityStore = create<SelectedCityStore>((set) => ({
  selectedCity: {
    name: "",
    country: "",
    state: "",
    lat: 0,
    lon: 0,
  },
  setSelectedCity: (city) => set(() => ({ selectedCity: city })),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("SelectedCityStore", useSelectedCityStore);
}

export default useSelectedCityStore;
