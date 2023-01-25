import { addSession } from "../../lib/db";

export default async function handler(req, res) {
  const { title, description, time, date } = req.body;

  const session = await addSession(title, description, date, time);
  res.status(200).json(session);
}
