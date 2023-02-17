import { addMessage, getSpecificUser } from "../../lib/db";

import { serverPusher } from "../../pusher";
import { uuidv4 } from "@firebase/util";
export default async function handler(req, res) {
  const { id, message, members, currentUser } = req.body;

  const regU = await getSpecificUser(currentUser);
  const messages = {
    message: message,
    displayName: regU.displayName,
    email: regU.email,
    uid: regU.uid,
    id: uuidv4(),
  };

  await addMessage(id, messages, members, currentUser);
  serverPusher.trigger("messages", "new-message", messages);
  res.status(200).json({ message: "added" });
}
