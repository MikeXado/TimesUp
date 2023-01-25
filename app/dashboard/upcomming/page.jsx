import { getSessions } from "../../../lib/db";
import TableSessions from "./Table";
import { useStore } from "../../../utils/store";
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

export default async function Sessions() {
  const currentUser = await getCurrentUser();

  const sessions = await getSessions(currentUser.uid);

  return (
    <>
      <TableSessions sessions={sessions} />
    </>
  );
}
