import { getSessions } from "../../../lib/db";
import TableSessions from "./Table";
import { cookies } from "next/headers";

export default async function Sessions() {
  const nextCookies = cookies();

  const currentUserUid = nextCookies.get("u_i").value;

  const sessions = await getSessions(currentUserUid);

  return (
    <div className="mt-24 px-5">
      <TableSessions sessions={sessions} uid={currentUserUid} />
    </div>
  );
}
