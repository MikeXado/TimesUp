"use client";
import { useState, createContext, useMemo, ReactNode } from "react";
import { ContextOpenType } from "../../../types";

const defaultChatDrawerContext: ContextOpenType = {
  isOpen: false,
  setIsOpen: () => {},
};

export const ChatDrawerContext = createContext<ContextOpenType>(
  defaultChatDrawerContext
);

export default function ChatDrawerProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ChatDrawerContext.Provider
      value={useMemo(() => ({ isOpen, setIsOpen }), [isOpen, setIsOpen])}
    >
      {children}
    </ChatDrawerContext.Provider>
  );
}
