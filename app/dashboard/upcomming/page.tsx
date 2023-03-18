import TableSessions from "./components/TableSessions";
import { cookies } from "next/headers";
import { Session } from "../../../types";

const getSessions = async (currentUserUid: string | undefined) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/v1/${currentUserUid}/sessions/upcoming`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  const sessions = await res.json();
  return sessions;
};

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
