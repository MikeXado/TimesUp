import { NextApiRequest, NextApiResponse } from "next";
import { addNewTask, getTasks } from "../../../../../../lib/db";
import { KanbanTaskType } from "../../../../../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { boardId, uid } = req.query;
  const currentUserUid = req.cookies.u_i;

  if (currentUserUid !== uid) {
    res.status(401).send("Unauthorized");
    return;
  }

  if (req.method === "GET") {
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
  } else {
    res.status(405).send("Method not allowed");
  }
}
