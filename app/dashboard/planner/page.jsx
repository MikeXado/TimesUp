import { getEvents } from "../../../lib/db";
import Calendar from "./components/Calendar";
import { cookies } from "next/headers";
import MobileCalendar from "./components/mobile/MobileCalendar";

export default async function Planner() {
  const nextCookies = cookies();

  const currentUserUid = nextCookies.get("u_i").value;

  const events = await getEvents(currentUserUid);

  return (
    <div className="mx-3 mb-3 mt-24">
      <Calendar events={events} />
      <MobileCalendar events={events} />
    </div>
  );
}
