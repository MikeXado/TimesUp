import processQueryString from "@/lib/functions/process-query";
import { getUser } from "@/viewmodels/firebase/auth";
import deleteSubtask from "@/viewmodels/firebase/db/delete-subtask";
import editSubtask from "@/viewmodels/firebase/db/edit-subtask";
import { parse } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { projectId, taskId, subtaskId } = req.query;
  if (projectId && taskId && subtaskId) {
    const proccesedId = processQueryString(projectId);
    const proccesedTaskId = processQueryString(taskId);
    const proccesedSubtaskId = processQueryString(subtaskId);
    const cookies = parse(req.headers.cookie || "");
    const token = cookies["session-token"];
    const { uid } = await getUser(token);
    if (req.method === "PUT") {
      const { done } = req.body;

      const response = await editSubtask(
        uid,
        proccesedId,
        proccesedTaskId,
        proccesedSubtaskId,
        done
      );
      if (response.success) {
        res.status(200).json({ message: response.description });
      } else {
        res.status(500).json({ message: response.description });
      }
    } else if (req.method === "DELETE") {
      const response = await deleteSubtask(
        uid,
        proccesedId,
        proccesedTaskId,
        proccesedSubtaskId
      );
      if (response.success) {
        res.status(200).json({ message: response.description });
      } else {
        res.status(500).json({ message: response.description });
      }
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } else {
    res.status(404).json({ message: "Project or task id not found" });
  }
}
