import { signIn } from "../../lib/firebase";
import { serialize } from "cookie";
import { getSessionToken } from "../../lib/firebase";
export default async function handler(req, res) {
  let { password, email } = req.body;

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

    // const userData = {
    //   displayName: user.displayName,
    //   email: user.email,
    //   uid: user.uid,
    // };

    res.setHeader("Set-Cookie", [
      serialize("token", tokenId, options),
      serialize("u_i", user.uid, options),
    ]);

    res.status(200).json({ message: "succes" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
}
