import { getChatId } from "../../lib/db";

export default async function handler(req, res) {
  const chat = req.body;
  const id = await getChatId(chat);

  res.status(200).json(id);
}
