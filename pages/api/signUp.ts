// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import { signUp } from "../../lib/firebase";

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
    await signUp(email, password);
    res.status(200).json({ message: "success" });
  } catch (err) {
    res.status(500).json({ message: err.code });
  }
}
