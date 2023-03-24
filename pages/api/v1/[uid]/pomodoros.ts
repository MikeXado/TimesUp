import { NextApiRequest, NextApiResponse } from "next";
import { addPomodoro, getPomodoros } from "../../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { uid } = req.query;
  const currentUserUid = req.cookies.u_i;

  if (currentUserUid !== uid) {
    res.status(401).send("Unauthorized");
    return;
  }

  if (req.method === "POST") {
    try {
      const data = req.body;
      await addPomodoro(data);
      res.status(200).json({ message: "pomodoro added" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else if (req.method === "GET") {
    try {
      const pomodoros = await getPomodoros(uid);
      res.status(200).json(pomodoros);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
