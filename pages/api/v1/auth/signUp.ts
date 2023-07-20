import { signUp } from "@/viewmodels/firebase/auth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password, displayName } = req.body;
    const data = await signUp(email, password, displayName);
    if (data.success) {
      res.status(200).json({ message: data.description });
    } else {
      res.status(500).json({
        message: data.description,
      });
    }
  } else {
    res.status(405).send("Method not allowed");
  }
}
