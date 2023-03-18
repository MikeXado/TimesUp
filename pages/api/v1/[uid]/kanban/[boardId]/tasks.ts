import { NextApiRequest, NextApiResponse } from "next";
import { addNewTask, getTasks } from "../../../../../../lib/db";
import { KanbanTaskType } from "../../../../../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { boardId, uid } = req.query;

    try {
      const data: KanbanTaskType[] = await getTasks(uid, boardId);

      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else if (req.method === "POST") {
    const data = req.body;
    try {
      await addNewTask(data);
      res.status(200).json({ message: "succes" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
