import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { logOutFirebase } from "../../lib/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await logOutFirebase();
  res.setHeader("Set-Cookie", [
    serialize("token", "", {
      maxAge: -1,
      path: "/",
    }),
    serialize("u_i", "", {
      maxAge: -1,
      path: "/",
    }),
  ]);
  res.status(200).json({ message: "success" });
}
