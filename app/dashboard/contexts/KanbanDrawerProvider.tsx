"use client";
import { useState, createContext, useMemo, ReactNode } from "react";
import { ContextOpenType } from "../../../types";

const defaultKanbanDrawerContext: ContextOpenType = {
  isOpen: false,
  setIsOpen: () => {},
};

export const KanbanDrawerContext = createContext<ContextOpenType>(
  defaultKanbanDrawerContext
);

export default function KanbanDrawerProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <KanbanDrawerContext.Provider
      value={useMemo(() => ({ isOpen, setIsOpen }), [isOpen, setIsOpen])}
    >
      {children}
    </KanbanDrawerContext.Provider>
  );
}
