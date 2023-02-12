"use client";

import { mutate, SWRConfig } from "swr";
import { Provider } from "react-redux";
import store from "../utils/store";
import { useEffect } from "react";
export default function Providers({ children }) {
  return (
    <Provider store={store}>
      {" "}
      <SWRConfig
        value={{
          fetcher: (...args) => fetch(...args).then((res) => res.json()),
          use: [tackQueries],
        }}
      >
        {children}{" "}
      </SWRConfig>
    </Provider>
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

export async function revalidate() {
  let promises = [...queries.values()].map((key) => mutate(key));

  return Promise.all(promises);
}
