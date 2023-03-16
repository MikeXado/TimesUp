import { NextApiRequest, NextApiResponse } from "next";
import { getBoards } from "../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const uid = req.body;

  try {
    const boards = await getBoards(uid);
    res.status(200).json(boards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
