"use client";
import { useState, createContext, useMemo } from "react";

export const ChatDrawerContext = createContext();

export default function ChatDrawerProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ChatDrawerContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ChatDrawerContext.Provider>
  );
}
