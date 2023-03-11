// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { signUp } from "../../lib/firebase";

export default async function handler(req, res) {
  const { email, password } = req.body;

  try {
    await signUp(email, password);
    res.status(200).json({ message: "success" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
}
