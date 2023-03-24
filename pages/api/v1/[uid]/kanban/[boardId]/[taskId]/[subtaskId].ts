import { NextApiRequest, NextApiResponse } from "next";
import { changeSubtask, deleteSubTask } from "../../../../../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { uid } = req.query;
  const currentUserUid = req.cookies.u_i;

  if (currentUserUid !== uid) {
    res.status(401).send("Unauthorized");
    return;
  }

  if (req.method === "PUT") {
    const data = req.body;
    try {
      await changeSubtask(data);
      res.status(200).json({ message: "subtask changed" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else if (req.method === "DELETE") {
    const data = req.body;
    try {
      await deleteSubTask(data);
      res.status(200).json({ message: "subtask deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
