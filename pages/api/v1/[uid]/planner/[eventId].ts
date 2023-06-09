import { NextApiRequest, NextApiResponse } from "next";
import { changeEvents } from "../../../../../lib/db";

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

  if (req.method === "PUT") {
    try {
      const data = req.body;
      await changeEvents(data);
      res.status(200).json({ message: "event added with success" });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
}
