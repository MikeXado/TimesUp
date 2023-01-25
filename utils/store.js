import { create } from "zustand";

export const useStore = create((set) => ({
  displayName: "",
  email: "",
  uid: "",
}));
