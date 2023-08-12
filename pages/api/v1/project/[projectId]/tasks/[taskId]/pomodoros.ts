import processQueryString from "@/lib/functions/process-query";
import { getUser } from "@/viewmodels/firebase/auth";
import addPomodoroSettings, {
  getPomodoroSettings,
} from "@/viewmodels/firebase/db/pomodoro-settings";
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
    if (req.method === "GET") {
      try {
        const cookies = parse(req.headers.cookie || "");
        const token = cookies["session-token"];
        const { uid } = await getUser(token);
        const data = await getPomodoroSettings(
          uid,
          proccesedId,
          proccesedTaskId
        );
        res.status(200).json({ message: data });
      } catch (err) {
        res.status(500).json({
          message: "Something went wrong during pomodoro settings fetching",
        });
      }
    } else if (req.method === "POST") {
      const { data } = req.body;
      const cookies = parse(req.headers.cookie || "");
      const token = cookies["session-token"];
      const { uid } = await getUser(token);
      const response = await addPomodoroSettings(
        data,
        uid,
        proccesedId,
        proccesedTaskId
      );

      if (response.success) {
        res.status(200).json({ message: response.message });
      } else {
        res.status(500).json({ message: response.message });
      }
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } else {
    res.status(404).json({ mssage: "Project or task id not found" });
  }
}
