"use client";

import { useState, createContext, useMemo, ReactNode } from "react";
import { ContextOpenType } from "../../../../../types";

const defaultChangeEventContext: ContextOpenType = {
  isOpen: false,
  setIsOpen: () => {},
};
export const ChangeEventContext = createContext<ContextOpenType>(
  defaultChangeEventContext
);

export default function ChangeEventProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ChangeEventContext.Provider
      value={useMemo(() => ({ isOpen, setIsOpen }), [isOpen, setIsOpen])}
    >
      {children}
    </ChangeEventContext.Provider>
  );
}
