import { getSessionToken } from "@/viewmodels/firebase/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize, CookieSerializeOptions } from "cookie";
import { AuthError, AuthErrorCodes } from "firebase/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "POST") {
    const { tkn }: { tkn?: string } = req.body;

    if (tkn) {
      try {
        const sessionToken = await getSessionToken(tkn);

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
          message: "Login successfully. Wait until the dashboard loads.",
        });
      } catch (error: any) {
        const errorCode = error.code;
        let errorMessage = "An error occurred during authentication.";

        switch (errorCode) {
          case "auth/invalid-token":
            errorMessage = "Invalid token. Authentication failed.";
            res.status(401).json({ message: errorMessage });
            break;
          case "auth/network-request-failed":
            errorMessage = "Network request failed. Please try again later.";
            res.status(500).json({ message: errorMessage });
            break;

          default:
            res.status(500).json({ message: errorMessage });
        }
      }
    } else {
      res.status(400).json({ message: "Token not provided." });
    }
  } else {
    res.status(405).send("Method not allowed");
  }
}
