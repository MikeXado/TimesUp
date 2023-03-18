import { NextApiRequest, NextApiResponse } from "next";
import {
  addSession,
  changeSession,
  deleteSession,
  getSessions,
} from "../../../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, description, time, date, id, uid } = req.body;

  if (req.method === "POST") {
    try {
      await addSession(title, description, date, time, uid);
      res.status(200).send({ message: "Session added" });
    } catch (err) {
      res.status(500).send({ message: err });
    }
  } else if (req.method === "GET") {
    try {
      const { uid } = req.query;
      const sessions = await getSessions(uid);
      res.status(200).json(sessions);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
}
