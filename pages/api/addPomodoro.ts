import { NextApiRequest, NextApiResponse } from "next";
import { addPomodoro } from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;
  try {
    await addPomodoro(data);
    res.status(200).json({ message: "pomodoro added" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
