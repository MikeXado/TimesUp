import { cookies } from "next/headers";
import { getBoards } from "../../../../../lib/db";
import Board from "./Board";

export default async function KanbanBoards() {
  const nextCookies = cookies();
  const id = nextCookies.get("u_i").value;
  const boards = await getBoards(id);
  return (
    <div className="flex flex-col">
      {" "}
      {boards.map((el) => {
        return <Board key={el.id} board={el} />;
      })}
    </div>
  );
}
