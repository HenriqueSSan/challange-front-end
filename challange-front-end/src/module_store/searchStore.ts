import { create } from "zustand"

export const useSearchStore = create<{ search: string; setSearch(search: string): void; clearSearch(): void }>(
  (set) => ({
    search: "",
    setSearch: (search: string) => {
      set((state) => ({ ...state, search }))
    },
    clearSearch: () => {
      set((state) => ({ ...state, search: "" }))
    },
  }),
)
