import { getSessions } from "../../../lib/db";
import TableSessions from "./Table";
export const getCurrentUser = async () => {
  const data = await fetch("https://be-better.netlify.app/api/getCurrentUser");
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
