import { NextApiResponse, NextApiRequest } from "next";
import { changeSession, deleteSession } from "../../../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { uid, sessionId } = req.query;
  const currentUserUid = req.cookies.u_i;

  if (currentUserUid !== uid) {
    res.status(401).send("Unauthorized");
    return;
  }

  if (req.method === "PUT") {
    try {
      const { title, description, time, date, id, uid } = req.body;
      await changeSession(title, description, date, time, uid, id);
      res.status(200).json({
        message: "success",
      });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  } else if (req.method === "DELETE") {
    try {
      await deleteSession({ uid, sessionId });
      res.status(200).send({ message: "session deleted" });
    } catch (err) {
      res.status(500).send({ message: err });
    }
  }
}
