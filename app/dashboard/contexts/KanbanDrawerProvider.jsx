"use client";
import { useState, createContext } from "react";

export const KanbanDrawerContext = createContext();

export default function KanbanDrawerProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <KanbanDrawerContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </KanbanDrawerContext.Provider>
  );
}
