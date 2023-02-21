import { updateTaskProgress } from "../../../lib/db";

export default async function handler(req, res) {
  const data = req.body;
  try {
    await updateTaskProgress(data);
    res.status(200).json({ message: "Task progress updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
