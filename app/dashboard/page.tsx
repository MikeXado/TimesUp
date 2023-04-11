import Chat from "./components/dashboard/chat/Chat";
import Upcoming from "./components/dashboard/upcoming/Upcoming";
import Chart from "../dashboard/kanban/[boardName]/components/Chart";
import { cookies } from "next/headers";
import { initializeTasksByBoards } from "../../utils/tasks";
import KanbanStatistics from "./kanban/[boardName]/components/KanbanStatistics";
import { getBoards, getSessions, getTasks } from "../../lib/db";
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
  const boards = await getBoards(currentUser);

  return (
    <div className="flex flex-wrap lg:mt-25 mt-24 pb-3 h-screen">
      <div className="w-full xl:w-[60%] mb-10 xl:mb-4 px-4">
        {sessions && <Upcoming sessions={sessions} />}
      </div>
      <div className="w-full xl:w-[40%] lg:w-full mb-10 xl:mb-4 px-4">
        {/* @ts-expect-error Async Server Component */}
        <Chat />
      </div>
      <div className="w-full xl:w-[40%] lg:w-full pb-5 xl:pb-0 mb-10 xl:mb-4 px-4">
        <KanbanStatistics boards={boards} />
      </div>
    </div>
  );
}
