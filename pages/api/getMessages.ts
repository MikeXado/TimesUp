import { NextApiRequest, NextApiResponse } from "next";
import { getMessages } from "../../lib/db";
import { auth } from "../../lib/firebase";
import { MessageType } from "../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, currentUserUid } = req.body;
  const data: MessageType[] = await getMessages(id, currentUserUid);

  res.status(200).json(data);
}
