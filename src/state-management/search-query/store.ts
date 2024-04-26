import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";

interface QueryStore {
  query: string;
  setQuery: (city: string) => void;
}

const useQueryStore = create<QueryStore>((set) => ({
  query: "",
  setQuery: (city) => set(() => ({ query: city })),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("QueryStore", useQueryStore);
}

export default useQueryStore;
