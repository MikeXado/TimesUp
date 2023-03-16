import { getAllChats } from "../../lib/db";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { ChatData } from "../../types";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const currentUserUid = cookie.parse(req.headers.cookie).u_i;
  try {
    const chats: ChatData[] = await getAllChats(currentUserUid);
    res.status(200).json({ chats: chats, currentUser: currentUserUid });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
