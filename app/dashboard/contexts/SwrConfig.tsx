"use client";

import { ReactNode } from "react";
import { SWRConfig, mutate } from "swr";

export default function SwrConfig({ children }: { children: ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string, options: RequestInit) =>
          fetch(url, options).then((res) => res.json()),
      }}
    >
      {children}
    </SWRConfig>
  );
}

export const revalidate = async (keys: string[]) => {
  let promises = keys.map((key) => {
    mutate(key);
  });

  return Promise.all(promises);
};
