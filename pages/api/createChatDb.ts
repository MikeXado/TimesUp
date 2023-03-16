import { NextApiRequest, NextApiResponse } from "next";
import { createChatDb } from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let user = await req.body;

  try {
    const combinedUid: string = await createChatDb(user);
    res.status(200).json(combinedUid);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
