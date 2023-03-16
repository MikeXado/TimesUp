import { NextApiRequest, NextApiResponse } from "next";
import { addBoard } from "../../lib/db";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;

  try {
    await addBoard(data);
    res.status(200).json({ message: "board added" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
