import { NextApiRequest, NextApiResponse } from "next";
import {
  deleteColumn,
  deleteTask,
  getTasks,
} from "../../../../../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const { uid, columnId, boardId } = req.query;
    const column = req.body;
    try {
      const tasks = await getTasks(uid, boardId);
      tasks.forEach(async (el) => {
        if (el.status === column) {
          await deleteTask({ uid, boardId, taskId: el.id });
        }
      });
      await deleteColumn(uid, boardId, columnId);
      res.status(200).json("deleted");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
