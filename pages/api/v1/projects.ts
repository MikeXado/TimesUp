import { getUser } from "@/viewmodels/firebase/auth";
import getProjects from "@/viewmodels/firebase/db/get-projects";
import { parse } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const cookies = parse(req.headers.cookie || "");
      const token = cookies["session-token"];
      const data = await getUser(token);

      const response = await getProjects(data.uid);

      res.status(200).json({ message: response });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Something went wrong during projects fetching" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
