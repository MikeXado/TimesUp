import { changeSubtask } from "../../lib/db";

export default async function handler(req, res) {
  const data = req.body;
  try {
    await changeSubtask(data);
    res.status(200).json({ message: "subtask changed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
