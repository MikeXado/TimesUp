import { NextApiRequest, NextApiResponse } from "next";
import { getSubtasks } from "../../../../../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { uid, boardId, taskId } = req.query;
    try {
      const subtasks = await getSubtasks({ uid, boardId, taskId });

      res.status(200).json(subtasks);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
