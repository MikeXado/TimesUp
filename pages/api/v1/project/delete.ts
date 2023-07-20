import deleteProject from "@/viewmodels/firebase/db/delete-project";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { uid, id } = req.body;

    const response = await deleteProject(uid, id);
    if (response.success) {
      res.status(200).json({ message: response.description });
    } else {
      res.status(500).json({ message: response.description });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
