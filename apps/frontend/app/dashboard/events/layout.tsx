import React from "react";
import DateStateProvider from "./context/DateStateProvider";

function EventsLayout({ children }: { children: React.ReactNode }) {
  return <DateStateProvider>{children}</DateStateProvider>;
}

export default EventsLayout;
