import processQueryString from "@/lib/functions/process-query";
import { getUser } from "@/viewmodels/firebase/auth";
import deleteProject from "@/viewmodels/firebase/db/delete-project";
import editProject from "@/viewmodels/firebase/db/edit-project";
import getProjectById from "@/viewmodels/firebase/db/get-project-by-id";
import { parse } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { projectId } = req.query;

  if (projectId) {
    let proccesedId = processQueryString(projectId);
    const cookies = parse(req.headers.cookie || "");
    const token = cookies["session-token"];
    const { uid } = await getUser(token);
    if (req.method === "GET") {
      try {
        const project = await getProjectById(uid, proccesedId);
        res.status(200).json(project);
      } catch (err) {
        res.status(500).json({ message: "Error while fetching project " });
      }
    } else if (req.method === "PUT") {
      const { form, icon } = req.body;

      const response = await editProject(uid, proccesedId, form, icon);
      if (response.success) {
        res.status(200).json({ message: response.message });
      } else {
        res.status(500).json({ message: response.message });
      }
    } else if (req.method === "DELETE") {
      const response = await deleteProject(uid, proccesedId);
      if (response.success) {
        res.status(200).json({ message: response.description });
      } else {
        res.status(500).json({ message: response.description });
      }
    } else {
      res.status(405).send("Method not allowed");
    }
  }
}
