import { getEvents } from "../../../lib/db";
import Calendar from "./components/Calendar";

export const getCurrentUser = async () => {
  const data = await fetch("https://be-better.netlify.app/api/getCurrentUser");
  const currentUser = await data.json();
  return currentUser;
};

export default async function Planner() {
  const currentUser = await getCurrentUser();

  const events = await getEvents(currentUser.uid);

  return <Calendar events={events} />;
}
