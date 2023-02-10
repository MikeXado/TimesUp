import { getSubtasks } from "../../lib/db";

export default async function handler(req, res) {
  const data = req.body;
  try {
    const subtasks = await getSubtasks(data);

    res.status(200).json(subtasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
