import { cookies } from "next/headers";
import { getColumns, getTasks } from "../../../../lib/db";
import Board from "./components/tasks/Board";
export default async function Page({ params: { boardName } }) {
  const nextCookies = cookies();
  const uid = nextCookies.get("u_i").value;

  const tasks = await getTasks(uid, boardName);
  const columns = await getColumns(uid, boardName);

  return (
    <div className="bg-white overflow-y-hidden lg:ml-56 lg:mt-24 mt-5">
      <Board
        tasks={tasks}
        uid={uid}
        boardId={boardName}
        initColumns={columns}
      />
    </div>
  );
}
