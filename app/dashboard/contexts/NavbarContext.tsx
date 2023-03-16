"use client";
import { useState, createContext, useMemo, ReactNode } from "react";
import { ContextOpenType } from "../../../types";

const defaultNavbarContext: ContextOpenType = {
  isOpen: false,
  setIsOpen: () => {},
};
export const NavbarContext =
  createContext<ContextOpenType>(defaultNavbarContext);

export default function NavbarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NavbarContext.Provider
      value={useMemo(() => ({ isOpen, setIsOpen }), [isOpen, setIsOpen])}
    >
      {children}
    </NavbarContext.Provider>
  );
}
