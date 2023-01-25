import { getEvents } from "../../../lib/db";
import { useStore } from "../../../utils/store";
import Calendar from "./components/Calendar";

export const getCurrentUser = async () => {
  const data = await fetch(
    "https://productivity-dashboard-myeffnzrq-mikexado.vercel.app/api/getCurrentUser",
    {
      cache: "no-store",
    }
  );
  const currentUser = await data.json();
  return currentUser;
};

export default async function Planner() {
  const currentUser = await getCurrentUser();

  const events = await getEvents(currentUser.uid);

  return <Calendar events={events} />;
}
