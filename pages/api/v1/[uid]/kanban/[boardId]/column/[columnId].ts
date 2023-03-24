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
  const { boardId, uid, columnId } = req.query;
  const currentUserUid = req.cookies.u_i;

  if (currentUserUid !== uid) {
    res.status(401).send("Unauthorized");
    return;
  }

  if (req.method === "DELETE") {
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
