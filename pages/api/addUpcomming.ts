import { NextApiRequest, NextApiResponse } from "next";
import { addSession } from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, description, time, date, uid } = req.body;

  try {
    await addSession(title, description, date, time, uid);
    res.status(200).send({ message: "Session added" });
  } catch (err) {
    res.status(500).send({ message: err });
  }
}
