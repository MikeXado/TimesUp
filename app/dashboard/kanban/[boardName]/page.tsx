import { cookies } from "next/headers";
import { getColumns, getTasks } from "../../../../lib/db";

import { KanbanColumnsType, KanbanTaskType } from "../../../../types";
import KanbanSettings from "./components/settings/KanbanSettings";

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
