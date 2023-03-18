import { NextApiRequest, NextApiResponse } from "next";
import { addEvent, changeEvents, getEvents } from "../../../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { uid } = req.query;

  if (req.method === "GET") {
    try {
      const events = await getEvents(uid);
      res.status(200).json(events);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else if (req.method === "POST") {
    try {
      const data = req.body;
      await addEvent(data);

      res.status(200).json({ message: "event added with success" });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
}
