import { getMessages } from "../../lib/db";
import { auth } from "../../lib/firebase";

export default async function handler(req, res) {
  const id = req.body;
  const currenUserUid = auth.currentUser.uid;
  const data = await getMessages(id, currenUserUid);

  res.status(200).json(data);
}
