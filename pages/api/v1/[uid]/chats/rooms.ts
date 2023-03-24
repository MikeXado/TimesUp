import { NextApiRequest, NextApiResponse } from "next";
import { createChatDb, getAllChats } from "../../../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { uid } = req.query;
  const currentUserUid = req.cookies.u_i;

  if (currentUserUid !== uid) {
    res.status(401).send("Unauthorized");
    return;
  }

  if (req.method === "GET") {
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
