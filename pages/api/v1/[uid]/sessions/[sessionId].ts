import { NextApiResponse, NextApiRequest } from "next";
import { changeSession, deleteSession } from "../../../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, description, time, date, id, uid } = req.body;

  if (req.method === "PUT") {
    try {
      await changeSession(title, description, date, time, uid, id);
      res.status(200).json({
        message: "success",
      });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  } else if (req.method === "DELETE") {
    const { uid, sessionId } = req.query;
    try {
      await deleteSession({ uid, sessionId });
      res.status(200).send({ message: "session deleted" });
    } catch (err) {
      res.status(500).send({ message: err });
    }
  }
}
