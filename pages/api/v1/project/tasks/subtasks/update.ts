import { getUser } from "@/viewmodels/firebase/auth";
import editSubtask from "@/viewmodels/firebase/db/edit-subtask";
import { parse } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { projectId, taskId, subtaskId, done } = req.body;
    const cookies = parse(req.headers.cookie || "");
    const token = cookies["session-token"];
    const { uid } = await getUser(token);
    const response = await editSubtask(uid, projectId, taskId, subtaskId, done);
    if (response.success) {
      res.status(200).json({ message: response.description });
    } else {
      res.status(500).json({ message: response.description });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
