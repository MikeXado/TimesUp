import getProjectById from "@/viewmodels/firebase/db/get-project-by-id";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { uid, id } = req.body;
      const project = await getProjectById(uid, id);
      res.status(200).json(project);
    } catch (err) {
      res.status(500).json({ message: "Error while fetching project " });
    }
  } else {
    res.status(405).send("Method not allowed");
  }
}
