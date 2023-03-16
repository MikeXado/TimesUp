import { NextApiRequest, NextApiResponse } from "next";
import { deleteTask } from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;

  try {
    await deleteTask(data);
    res.status(200).json({ message: "task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
