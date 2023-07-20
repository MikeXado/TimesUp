import addTask from "@/viewmodels/firebase/db/add-task";
import EditTask from "@/viewmodels/firebase/db/edit-task";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { uid, projectId, taskId, taskData, subtasks } = req.body;
    const response = await EditTask(projectId, uid, taskId, taskData, subtasks);

    if (response.success) {
      res.status(200).json({ message: response.message });
    } else {
      res.status(500).json({ message: response.message });
    }
  } else {
    res.status(405).send("Method not allowed");
  }
}
