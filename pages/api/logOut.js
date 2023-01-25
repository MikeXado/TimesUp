import { serialize } from "cookie";
import { logOutFirebase } from "../../lib/firebase";

export default async function handler(req, res) {
  await logOutFirebase();
  res.setHeader(
    "Set-Cookie",
    serialize("token", "", {
      maxAge: -1,
      path: "/",
    })
  );
  res.status(200).json({ message: "success" });
}
