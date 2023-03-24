import { uuidv4 } from "@firebase/util";
import { NextApiRequest, NextApiResponse } from "next";
import {
  addMessage,
  getMessages,
  getSpecificUser,
} from "../../../../../../lib/db";
import { serverPusher } from "../../../../../../pusher";
import { MessageType } from "../../../../../../types";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { uid, roomId } = req.query;
  const currentUserUid = req.cookies.u_i;

  if (currentUserUid !== uid) {
    res.status(401).send("Unauthorized");
    return;
  }

  if (req.method === "GET") {
    try {
      const messages = await getMessages(roomId, uid);
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else if (req.method === "POST") {
    const { id, message, members, currentUser } = req.body;

    try {
      const regU = await getSpecificUser(currentUser);
      const sendingMessage: MessageType = {
        message: message,
        displayName: regU.displayName,
        email: regU.email,
        uid: regU.uid,
        id: uuidv4(),
      };

      serverPusher.trigger("messages", "new-message", sendingMessage);
      await addMessage(id, sendingMessage, members, currentUser);

      res.status(200).json({ messages: "Success" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
