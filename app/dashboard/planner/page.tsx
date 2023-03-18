import Calendar from "./components/Calendar";
import { cookies } from "next/headers";
import MobileCalendar from "./components/mobile/MobileCalendar";
import ChangeEventProvider from "./components/context/ChangeEventProvider";
import { EventsType } from "../../../types";

const getEvents = async (currentUserUid: string | undefined) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/v1/${currentUserUid}/planner/events`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  const sessions = await res.json();
  return sessions;
};

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
