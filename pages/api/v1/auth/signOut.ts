import { NextApiRequest, NextApiResponse } from "next";

import { serialize } from "cookie";
import { logOutFirebase } from "@/viewmodels/firebase/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await logOutFirebase();
    res.setHeader("Set-Cookie", [
      serialize("session-token", "", {
        maxAge: -1,
        path: "/",
      }),
    ]);
    res.status(200).json({ message: "Success" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}
