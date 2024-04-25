import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";

interface NewCityStore {
  newCity: string;
  setNewCity: (city: string) => void;
}

const useNewCityStore = create<NewCityStore>((set) => ({
  newCity: "",
  setNewCity: (city) => set(() => ({ newCity: city })),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("NewCityStore", useNewCityStore);
}

export default useNewCityStore;
