import { NextApiRequest, NextApiResponse } from "next";
import { resetPassword } from "../../../../lib/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  const { email }: { email: string } = req.body;

  try {
    await resetPassword(email);
    res.status(200).json({ message: "OK" });
  } catch (err) {
    res.status(500).json({ message: err.code });
  }
}
