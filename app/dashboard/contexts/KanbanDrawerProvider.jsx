"use client";
import { useState, createContext, useMemo } from "react";

export const KanbanDrawerContext = createContext();

export default function KanbanDrawerProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <KanbanDrawerContext.Provider
      value={useMemo(() => ({ isOpen, setIsOpen }), [isOpen, setIsOpen])}
    >
      {children}
    </KanbanDrawerContext.Provider>
  );
}
