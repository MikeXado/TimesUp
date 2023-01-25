import { addMessage } from "../../lib/db";
import { auth } from "../../lib/firebase";
import { serverPusher } from "../../pusher";
import { uuidv4 } from "@firebase/util";
export default async function handler(req, res) {
  const { id, message, members } = req.body;

  const messages = {
    message: message,
    displayName: auth?.currentUser?.displayName,
    email: auth?.currentUser?.email,
    uid: auth?.currentUser?.uid,
    id: uuidv4(),
  };

  await addMessage(id, messages, members);
  serverPusher.trigger("messages", "new-message", messages);
  res.status(200).json({ message: "added" });
}
