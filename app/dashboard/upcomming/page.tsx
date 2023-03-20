import TableSessions from "./components/TableSessions";
import { cookies } from "next/headers";
import { Session } from "../../../types";
import { getSessions } from "../../../lib/db";

export default async function Sessions() {
  const nextCookies = cookies();

  const currentUserUid = nextCookies.get("u_i")?.value;

  const sessions: Session[] = await getSessions(currentUserUid);

  return (
    <div className="mt-24 px-5 h-screen">
      <TableSessions sessions={sessions} />
    </div>
  );
}
