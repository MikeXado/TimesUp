import { create } from "zustand";

export const useStore = create((set) => ({
  currentUser: {},

  addCurrentUser: (payload) =>
    set((state) => ({
      currentUser: payload,
    })),
}));
