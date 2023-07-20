import getProjects from "@/viewmodels/firebase/db/get-projects";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const uid = req.body;

      const response = await getProjects(uid);

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
