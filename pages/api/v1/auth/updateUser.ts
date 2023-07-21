import { getUser, updateUser } from "@/viewmodels/firebase/auth";
import { parse } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { displayName, photoUrl } = req.body;
    const cookies = parse(req.headers.cookie || "");
    const token = cookies["session-token"];
    const data = await getUser(token);

    const response = await updateUser(data.uid, displayName, photoUrl);
    if (response.success) {
      res.status(200).json({ message: response.description });
    } else {
      res.status(500).json({ message: response.description });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
