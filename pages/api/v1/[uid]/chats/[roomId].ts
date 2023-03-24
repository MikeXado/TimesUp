import { NextApiRequest, NextApiResponse } from "next";
import { getChatDb } from "../../../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { uid, roomId } = req.query;
  const currentUserUid = req.cookies.u_i;

  if (currentUserUid !== uid) {
    res.status(401).send("Unauthorized");
    return;
  }

  if (req.method === "GET") {
    try {
      const chat = await getChatDb(roomId);

      res.status(200).json(chat);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
