import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "../../lib/firebase";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const currentUser = auth.currentUser;

  const user = {
    uid: currentUser?.uid,
    displayName: currentUser?.displayName,
    email: currentUser?.email,
  };

  res.status(200).json(user);
}
