import { NextApiRequest, NextApiResponse } from "next";
import { getChatDb } from "../../../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { roomId } = req.query;
  if (req.method === "GET") {
    try {
      const chat = await getChatDb(roomId);

      res.status(200).json(chat);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
