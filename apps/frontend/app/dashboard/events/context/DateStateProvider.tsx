"use client";
import { ContextDatePickType } from "@/types";
import { useState, createContext, useMemo, ReactNode } from "react";

const defaultDateStateContext: ContextDatePickType = {
  date: [new Date()],
  setDate: () => {},
};

export const DateStateContext = createContext<ContextDatePickType>(
  defaultDateStateContext
);

export default function DateStateProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [date, setDate] = useState<Date[] | undefined>([new Date()]);

  return (
    <DateStateContext.Provider
      value={useMemo(() => ({ date, setDate }), [date, setDate])}
    >
      {children}
    </DateStateContext.Provider>
  );
}
