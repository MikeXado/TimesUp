import { addSession } from "../../lib/db";

export default async function handler(req, res) {
  const { title, description, time, date, uid } = req.body;

  const session = await addSession(title, description, date, time, uid);
  res.status(200).json(session);
}
