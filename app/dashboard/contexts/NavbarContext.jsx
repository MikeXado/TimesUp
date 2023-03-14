"use client";
import { useState, createContext, useMemo } from "react";

export const NavbarContext = createContext();

export default function NavbarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NavbarContext.Provider
      value={useMemo(() => ({ isOpen, setIsOpen }), [isOpen, setIsOpen])}
    >
      {children}
    </NavbarContext.Provider>
  );
}
