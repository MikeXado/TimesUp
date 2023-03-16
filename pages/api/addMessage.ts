import { addMessage, getSpecificUser } from "../../lib/db";

import { serverPusher } from "../../pusher";
import { uuidv4 } from "@firebase/util";
import { NextApiRequest, NextApiResponse } from "next";
import { MessageType } from "../../types";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, message, members, currentUser } = req.body;

  const regU = await getSpecificUser(currentUser);
  const messages: MessageType = {
    message: message,
    displayName: regU.displayName,
    email: regU.email,
    uid: regU.uid,
    id: uuidv4(),
  };

  try {
    await serverPusher.trigger("messages", "new-message", messages);
    await addMessage(id, messages, members, currentUser);
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: err });
  }
}
