import { createChatDb } from "../../lib/db";

export default async function handler(req, res) {
  let user = await req.body;
  const combinedUid = await createChatDb(user);

  res.status(200).json(combinedUid);
}
