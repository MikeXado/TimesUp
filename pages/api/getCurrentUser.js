import { auth } from "../../lib/firebase";

export default async function handler(req, res) {
  const currentUser = auth.currentUser;
  const user = {
    uid: currentUser?.uid,
    displayName: currentUser?.displayName,
    email: currentUser?.email,
  };

  res.status(200).json(user);
}
