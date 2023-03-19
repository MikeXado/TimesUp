import { NextApiRequest, NextApiResponse } from "next";
import { deleteColumn } from "../../../../../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const { uid, boardId, columnId } = req.query;
    try {
      await deleteColumn(uid, boardId, columnId);
      res.status(200).json("deleted");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
