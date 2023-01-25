import { changeEvents } from "../../lib/db";

export default async function handler(req, res) {
  const data = req.body;
  await changeEvents(data);
  res.status(200).json({ message: "event added with success" });
}
