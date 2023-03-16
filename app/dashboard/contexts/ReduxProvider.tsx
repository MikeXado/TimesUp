"use client";
import { Provider } from "react-redux";
import store from "../../../utils/store";
import React, { ReactNode } from "react";

export default function ReduxProvider({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
