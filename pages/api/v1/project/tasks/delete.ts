import { getUser } from "@/viewmodels/firebase/auth";
import deleteTask from "@/viewmodels/firebase/db/delete-task";
import { parse } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { projectId, taskId } = req.body;
    const cookies = parse(req.headers.cookie || "");
    const token = cookies["session-token"];
    const { uid } = await getUser(token);
    const response = await deleteTask(uid, projectId, taskId);
    if (response.success) {
      res.status(200).json({ message: response.description });
    } else {
      res.status(500).json({ message: response.description });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
