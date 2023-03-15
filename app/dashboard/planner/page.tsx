import { getEvents } from "../../../lib/db";
import Calendar from "./components/Calendar";
import { cookies } from "next/headers";
import MobileCalendar from "./components/mobile/MobileCalendar";
import ChangeEventProvider from "./components/context/ChangeEventProvider";
import { EventsType } from "../../../types";

export default async function Planner() {
  const nextCookies = cookies();

  const currentUserUid = nextCookies.get("u_i")?.value;

  const events: EventsType[] = await getEvents(currentUserUid);

  return (
    <div className="mx-3 mb-3 mt-24 overflow-hidden">
      <ChangeEventProvider>
        <Calendar events={events} />
        <MobileCalendar events={events} />
      </ChangeEventProvider>
    </div>
  );
}
