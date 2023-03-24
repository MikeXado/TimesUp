import { NextApiRequest, NextApiResponse } from "next";
import { deleteTask, editTask } from "../../../../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { boardId, uid, taskId } = req.query;
  const currentUserUid = req.cookies.u_i;

  if (currentUserUid !== uid) {
    res.status(401).send("Unauthorized");
    return;
  }

  if (req.method === "PUT") {
    const data = req.body;
    try {
      await editTask(data);
      res.status(200).json({ message: "success" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else if (req.method === "DELETE") {
    try {
      await deleteTask({ uid, boardId, taskId });
      res.status(200).json({ message: "task deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
