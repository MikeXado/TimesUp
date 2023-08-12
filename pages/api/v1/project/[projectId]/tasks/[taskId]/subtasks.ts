import processQueryString from "@/lib/functions/process-query";
import { getUser } from "@/viewmodels/firebase/auth";
import getSubtasks from "@/viewmodels/firebase/db/get-subtasks";
import { parse } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { projectId, taskId } = req.query;
    if (projectId && taskId) {
      const proccesedId = processQueryString(projectId);
      const proccesedTaskId = processQueryString(taskId);

      try {
        const cookies = parse(req.headers.cookie || "");
        const token = cookies["session-token"];
        const { uid } = await getUser(token);
        const data = await getSubtasks(uid, proccesedId, proccesedTaskId);

        res.status(200).json({ message: data });
      } catch (err) {
        res
          .status(500)
          .json({ message: "Something went wrong during subtasks fetching" });
      }
    } else {
      res.status(404).json({ message: "Project or task id not found" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
