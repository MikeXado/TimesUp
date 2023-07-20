import { getSessionToken, signIn } from "@/viewmodels/firebase/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize, CookieSerializeOptions } from "cookie";
type SignInDataType = {
  success: boolean;
  description?: string;
  tkn?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const data: SignInDataType = await signIn(email, password);

    if (data.success && data.tkn) {
      try {
        const sessionToken = await getSessionToken(data.tkn);
        const options: CookieSerializeOptions = {
          path: "/",
          maxAge: 15 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        };
        res.setHeader("Set-Cookie", [
          serialize("session-token", sessionToken, options),
        ]);
        res.status(200).json({
          message: "Sign In successfully . Wait until dashboard will load",
        });
      } catch (err) {
        res.status(500).json({ message: "Error during the Sign In process" });
      }
    } else {
      res.status(500).json({ message: "Error during the Sign In process" });
    }
  } else {
    res.status(405).send("Method not allowed");
  }
}
