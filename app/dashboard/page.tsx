import { getSessions } from "../../lib/db";

import Chat from "./components/dashboard/chat/Chat";
import Upcoming from "./components/dashboard/upcoming/Upcoming";

import { cookies } from "next/headers";

interface Session {
  date: string;
  title: string;
  description: string;
  time: string;
  id: string;
}

export default async function Dashboard() {
  const nextCookies = cookies();

  const currentUser: string | undefined = nextCookies.get("u_i")?.value;

  const sessions: Session[] | null = await getSessions(currentUser);

  return (
    <div className="flex flex-wrap lg:mt-25 mt-24">
      <div className="w-full xl:w-[60%] mb-12 xl:mb-0 px-4">
        {sessions && <Upcoming sessions={sessions} />}
      </div>
      <div className="w-full xl:w-[40%] lg:w-full mb-12 xl:mb-0 px-4">
        {/* @ts-expect-error Async Server Component */}
        <Chat />
      </div>
    </div>
  );
}
