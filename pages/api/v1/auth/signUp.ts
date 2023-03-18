import { NextApiRequest, NextApiResponse } from "next";
import { signUp } from "../../../../lib/firebase";

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
    res.status(200).json({ message: currentUser });
  } catch (err) {
    res.status(500).json({ message: err.code });
  }
}
