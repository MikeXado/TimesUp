import { NextApiRequest, NextApiResponse } from "next";
import { getTasks } from "../../lib/db";
import { KanbanTaskType } from "../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { boardId, uid } = req.body;

  try {
    const data: KanbanTaskType[] = await getTasks(uid, boardId);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
