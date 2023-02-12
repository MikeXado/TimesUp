import { getColumns } from "../../lib/db";

export default async function handler(req, res) {
  const { uid, boardId } = req.body;

  try {
    const columns = await getColumns(uid, boardId);
    res.status(200).json(columns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
