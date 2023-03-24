import { NextApiRequest, NextApiResponse } from "next";
import { addBoard, getBoards } from "../../../../../lib/db";

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
    const data = req.body;

    try {
      await addBoard(data);
      res.status(200).json({ message: "board added" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else if (req.method === "GET") {
    try {
      const boards = await getBoards(uid);
      res.status(200).json(boards);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
