import { getAllChats } from "../../lib/db";
import cookie from "cookie";
export default async function handler(req, res) {
  const currentUserUid = cookie.parse(req.headers.cookie).u_i;
  try {
    const chats = await getAllChats(currentUserUid);
    res.status(200).json({ chats: [...chats], currentUser: currentUserUid });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
