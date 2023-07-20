import editSubtask from "@/viewmodels/firebase/db/edit-subtask";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { uid, projectId, taskId, subtaskId, done } = req.body;
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
