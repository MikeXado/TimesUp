"use client";
import { PomoType } from "@/types";
import { ReactNode, createContext, useEffect, useMemo, useState } from "react";

interface ContextActivePomoType {
  state: PomoType | undefined;
  setState: React.Dispatch<React.SetStateAction<PomoType | undefined>>;
}

const defaultActivePomoContext: ContextActivePomoType = {
  state: undefined,
  setState: () => {},
};

export const ActivePomoContext = createContext(defaultActivePomoContext);

export default function ActivePomoProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, setState] = useState<PomoType | undefined>();

  useEffect(() => {
    const handleBeforeUnload = (e: any) => {
      if (state) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [state]);
  return (
    <ActivePomoContext.Provider
      value={useMemo(() => ({ state, setState }), [state, setState])}
    >
      {children}
    </ActivePomoContext.Provider>
  );
}

export type { ContextActivePomoType };
