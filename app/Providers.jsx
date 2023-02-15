"use client";

import { mutate, SWRConfig } from "swr";
import { Provider } from "react-redux";
import store from "../utils/store";
import { Suspense, useEffect } from "react";
import { Spinner } from "flowbite-react";
export default function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
