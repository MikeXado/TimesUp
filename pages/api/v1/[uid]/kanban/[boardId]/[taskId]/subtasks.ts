import { NextApiRequest, NextApiResponse } from "next";
import { getSubtasks } from "../../../../../../../lib/db";

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
  if (req.method === "GET") {
    try {
      const subtasks = await getSubtasks({ uid, boardId, taskId });

      res.status(200).json(subtasks);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
