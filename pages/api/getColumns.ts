import { NextApiRequest, NextApiResponse } from "next";
import { getColumns } from "../../lib/db";
import { KanbanColumnsType } from "../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { uid, boardId } = req.body;

  try {
    const columns: KanbanColumnsType[] = await getColumns(uid, boardId);
    res.status(200).json(columns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
