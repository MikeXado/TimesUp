import { getEvents } from "../../lib/db";

export default async function handler(req, res) {
  const data = req.body;
  const events = await getEvents(data);

  res.status(200).json(events);
}
