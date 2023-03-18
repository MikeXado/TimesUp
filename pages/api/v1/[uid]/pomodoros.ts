import { NextApiRequest, NextApiResponse } from "next";
import { addPomodoro, getPomodoros } from "../../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data = req.body;
    try {
      await addPomodoro(data);
      res.status(200).json({ message: "pomodoro added" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else if (req.method === "GET") {
    const { uid } = req.query;
    try {
      const pomodoros = await getPomodoros(uid);
      res.status(200).json(pomodoros);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
