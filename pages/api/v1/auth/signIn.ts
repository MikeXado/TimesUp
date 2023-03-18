import { signIn } from "../../../../lib/firebase";
import { serialize } from "cookie";
import { getSessionToken } from "../../../../lib/firebase";
import { NextApiRequest, NextApiResponse } from "next";

type RequestBody = {
  email: string;
  password: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  let { password, email }: RequestBody = req.body;

  try {
    const { user } = await signIn(email, password);
    const token = await user.getIdToken();
    const tokenId = await getSessionToken(token);
    const options = {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    };
    res.setHeader("Set-Cookie", [
      serialize("token", tokenId, options),
      serialize("u_i", user.uid, options),
    ]);

    res.status(200).json({ message: "succes" });
  } catch (err) {
    res.status(500).json({ message: err.code });
  }
}
