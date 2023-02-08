import { getTasks } from "../../lib/db";

export default async function handler(req, res) {
  const { boardId, uid } = req.body;

  try {
    const data = await getTasks(uid, boardId);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
