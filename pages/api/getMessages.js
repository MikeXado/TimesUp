import { getMessages } from "../../lib/db";
import { auth } from "../../lib/firebase";

export default async function handler(req, res) {
  const { id, currentUserUid } = req.body;
  const data = await getMessages(id, currentUserUid);

  res.status(200).json(data);
}
