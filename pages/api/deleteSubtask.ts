import { NextApiRequest, NextApiResponse } from "next";
import { deleteSubTask } from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;
  try {
    await deleteSubTask(data);
    res.status(200).json({ message: "subtask deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
