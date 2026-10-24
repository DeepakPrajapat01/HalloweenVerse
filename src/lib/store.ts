import { create } from "zustand";

interface WorldStore {
    /** ID of the currently selected zone, or null */
    activeZone: string | null;
    setActiveZone: (id: string | null) => void;
    clearZone: () => void;
}

export const useWorldStore = create<WorldStore>((set) => ({
    activeZone: null,
    setActiveZone: (id) => set({ activeZone: id }),
    clearZone: () => set({ activeZone: null }),
}));
