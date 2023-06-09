import { NextApiRequest, NextApiResponse } from "next";
import { createUserDb } from "../../../../lib/db";
import { signUp } from "../../../../lib/firebase";
import generateUsernameFromEmail from "../../../../utils/username-generator";
type RequestBody = {
  email: string;
  password: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  const { email, password }: RequestBody = req.body;

  try {
    const register = await signUp(email, password);
    const currentUser = register.user.uid;
    const username = generateUsernameFromEmail(email);
    const userData = {
      email: email,
      displayName: username,
      uid: currentUser,
    };
    await createUserDb(userData);
    res.status(200).json({ message: currentUser });
  } catch (err) {
    res.status(500).json({ message: err.code });
  }
}
