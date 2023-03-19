import { cookies } from "next/headers";

import { KanbanColumnsType, KanbanTaskType } from "../../../../types";
import KanbanSettings from "./components/settings/KanbanSettings";

const getColumns = async (uid, boardName) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/v1/${uid}/kanban/${boardName}/columns`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  const columns = await res.json();
  return columns;
};

const getTasks = async (uid, boardName) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/v1/${uid}/kanban/${boardName}/tasks`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  const tasks = await res.json();
  return tasks;
};

import Board from "./components/tasks/Board";
export default async function Page({ params: { boardName } }) {
  const nextCookies = cookies();
  const uid = nextCookies.get("u_i")?.value;

  const tasks: KanbanTaskType[] = await getTasks(uid, boardName);
  const columns: KanbanColumnsType[] = await getColumns(uid, boardName);

  return (
    <>
      <div className="flex flex-wrap pt-20 ml-3">
        <div className="bg-[#111c44] rounded-lg w-full xl:w-[99%] mb-5 xl:mb-0 px-4 ">
          <Board tasks={tasks} boardId={boardName} initColumns={columns} />
        </div>
      </div>
    </>
  );
}
