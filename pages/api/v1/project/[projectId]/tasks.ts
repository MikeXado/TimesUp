import processQueryString from "@/lib/functions/process-query";
import { getUser } from "@/viewmodels/firebase/auth";
import addTask from "@/viewmodels/firebase/db/add-task";
import getTasks from "@/viewmodels/firebase/db/get-tasks";
import { parse } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { start } from "repl";

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
    if (req.method === "POST") {
      const { taskData, subtasks } = req.body;

      const response = await addTask(proccesedId, uid, taskData, subtasks);
      if (response.success) {
        res.status(200).json({ message: response.message });
      } else {
        res.status(500).json({ message: response.message });
      }
    } else if (req.method === "GET") {
      try {
        if (!req.url) {
          throw new Error("Request URL is missing.");
        }

        const { startAfter, status } = req.query;
        let proccesedStartAfter = startAfter
          ? processQueryString(startAfter)
          : null;
        let proccesedStatus = status ? processQueryString(status) : null;

        const response = await getTasks(
          uid,
          proccesedId,
          proccesedStartAfter,
          proccesedStatus
        );
        res.status(200).json({ message: response });
      } catch (err) {
        res.status(500).json({ message: "Error while fetching tasks" });
      }
    } else {
      res.status(405).send("Method not allowed");
    }
  } else {
    res.status(404).send("Project not found");
  }
}
