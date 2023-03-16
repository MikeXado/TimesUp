import { KanbanTaskType } from "../../types";

export const tasksFetcher = async (
  uid: string,
  boardId: string
): Promise<KanbanTaskType[]> => {
  const res = await fetch("/api/getTasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uid, boardId }),
  });
  const tasks = await res.json();
  return tasks;
};
