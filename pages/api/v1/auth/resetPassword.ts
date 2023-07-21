import { sendPasswordReset } from "@/viewmodels/firebase/auth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  let email = req.body;

  const message = await sendPasswordReset(email);

  if (message.success) {
    res.status(200).json({ message: message.description });
  } else {
    res.status(500).json({ message: message.description });
  }
}
