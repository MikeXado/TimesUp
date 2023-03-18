import { NextApiRequest, NextApiResponse } from "next";
import { createChatDb, getAllChats } from "../../../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { uid } = req.query;
    try {
      const chats = await getAllChats(uid);
      res.status(200).json({ chats: chats, currentUser: uid });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else if (req.method === "POST") {
    const data = req.body;
    try {
      const combinedUid = await createChatDb(data);
      res.status(200).json({ id: combinedUid });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
