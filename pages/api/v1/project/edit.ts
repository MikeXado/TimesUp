import { addProject } from "@/viewmodels/firebase/db/add-project";
import editProject from "@/viewmodels/firebase/db/edit-project";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { uid, projectId, form, icon } = req.body;

    console.log(form, icon);
    const response = await editProject(uid, projectId, form, icon);
    if (response.success) {
      res.status(200).json({ message: response.message });
    } else {
      res.status(500).json({ message: response.message });
    }
  } else {
    res.status(405).send("Method not allowed");
  }
}
