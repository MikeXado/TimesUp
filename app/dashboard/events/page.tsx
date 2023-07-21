import React from "react";

import EventsPageHeader from "./components/header";
import { cookies } from "next/headers";
import { getUser } from "@/viewmodels/firebase/auth";
import getEvents from "@/viewmodels/firebase/db/get-events";
import EventsCards from "./components/events-cards";

async function EventsPage() {
  const cookiesStore = cookies();
  const tkn = cookiesStore.get("session-token")?.value;
  const data = await getUser(tkn!);
  const events = await getEvents(data.uid);
  return (
    <div className="mt-10">
      <EventsPageHeader />
      <EventsCards events={events} />
    </div>
  );
}

export default EventsPage;
