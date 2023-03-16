import { NextApiRequest, NextApiResponse } from "next";
import { deleteSession } from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;
  try {
    await deleteSession(data);
    res.status(200).send({ message: "session deleted" });
  } catch (err) {
    res.status(500).send({ message: err });
  }
}
