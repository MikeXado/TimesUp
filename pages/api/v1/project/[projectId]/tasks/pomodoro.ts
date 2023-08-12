import processQueryString from "@/lib/functions/process-query";
import { getUser } from "@/viewmodels/firebase/auth";
import { getPomodoroByProject } from "@/viewmodels/firebase/db/pomodoro-settings";
import { parse } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { projectId } = req.query;
  if (projectId) {
    const proccesedId = processQueryString(projectId);
    if (req.method === "GET") {
      try {
        const cookies = parse(req.headers.cookie || "");
        const token = cookies["session-token"];
        const { uid } = await getUser(token);
        const data = await getPomodoroByProject(uid, proccesedId);
        res.status(200).json({ message: data });
      } catch (err) {
        res.status(500).json({
          message: "Something went wrong during pomodoro settings fetching",
        });
      }
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } else {
    res.status(404).json({ mssage: "Project not found" });
  }
}
