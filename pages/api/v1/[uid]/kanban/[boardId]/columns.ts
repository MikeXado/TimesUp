import { NextApiRequest, NextApiResponse } from "next";
import { addColumn, getColumns } from "../../../../../../lib/db";
import { KanbanColumnsType } from "../../../../../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data = req.body;

    try {
      await addColumn(data);
      res.status(200).json({ message: "success" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else if (req.method === "GET") {
    const { uid, boardId } = req.query;

    try {
      const columns: KanbanColumnsType[] = await getColumns(uid, boardId);
      res.status(200).json(columns);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
