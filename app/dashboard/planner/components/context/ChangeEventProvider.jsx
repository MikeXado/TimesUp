"use client";

import { useState, createContext, useMemo } from "react";

export const ChangeEventContext = createContext();

export default function ChangeEventProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ChangeEventContext.Provider
      value={useMemo(() => ({ isOpen, setIsOpen }), [isOpen, setIsOpen])}
    >
      {children}
    </ChangeEventContext.Provider>
  );
}
