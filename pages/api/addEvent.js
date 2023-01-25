import { addEvent } from "../../lib/db";

export default async function handler(req, res) {
  const data = req.body;
  await addEvent(data);

  res.status(200).json({ message: "event added with success" });
}
