import { createChatDb } from "../../lib/db";

export default async function handler(req, res) {
  let user = await req.body;

  try {
    const combinedUid = await createChatDb(user);
    res.status(200).json(combinedUid);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
