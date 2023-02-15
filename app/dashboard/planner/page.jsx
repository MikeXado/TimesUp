import { getEvents } from "../../../lib/db";
import Calendar from "./components/Calendar";
import { cookies } from "next/headers";
import { Suspense } from "react";

export default async function Planner() {
  const nextCookies = cookies();

  const currentUserUid = nextCookies.get("u_i").value;

  const events = await getEvents(currentUserUid);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Calendar events={events} uid={currentUserUid} />
    </Suspense>
  );
}
