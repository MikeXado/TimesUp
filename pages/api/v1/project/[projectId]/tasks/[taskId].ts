import processQueryString from "@/lib/functions/process-query";
import { getUser } from "@/viewmodels/firebase/auth";
import deleteTask from "@/viewmodels/firebase/db/delete-task";
import EditTask from "@/viewmodels/firebase/db/edit-task";
import { parse } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { projectId, taskId } = req.query;
  if (projectId && taskId) {
    const proccesedId = processQueryString(projectId);
    const proccesedTaskId = processQueryString(taskId);
    const cookies = parse(req.headers.cookie || "");
    const token = cookies["session-token"];
    const { uid } = await getUser(token);
    if (req.method === "PUT") {
      const { taskData, subtasks } = req.body;
      const response = await EditTask(
        proccesedId,
        uid,
        proccesedTaskId,
        taskData,
        subtasks
      );

      if (response.success) {
        res.status(200).json({ message: response.message });
      } else {
        res.status(500).json({ message: response.message });
      }
    } else if (req.method === "DELETE") {
      const response = await deleteTask(uid, proccesedId, proccesedTaskId);
      if (response.success) {
        res.status(200).json({ message: response.description });
      } else {
        res.status(500).json({ message: response.description });
      }
    } else {
      res.status(405).send("Method not allowed");
    }
  } else {
    res.status(404).send("Project or Task not found");
  }
}
