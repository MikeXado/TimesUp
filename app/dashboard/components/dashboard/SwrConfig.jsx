"use client";

import { Spinner } from "flowbite-react";
import { Suspense, useEffect } from "react";
import { SWRConfig, mutate } from "swr";

export default function SwrConfig({ children }) {
  return (
    <SWRConfig
      value={{
        fetcher: (...args) => fetch(...args).then((res) => res.json()),
        use: [tackQueries],
      }}
    >
      {children}
    </SWRConfig>
  );
}

let queries = new Set();

function tackQueries(useSWRNext) {
  return (key, fetcher, config) => {
    const swr = useSWRNext(key, fetcher, config);

    useEffect(() => {
      queries.add(key);

      return () => queries.delete(key);
    }, [key]);

    return swr;
  };
}

export const revalidate = async () => {
  let promises = [...queries.values()].map((key) => mutate(key));

  return Promise.all(promises);
};
