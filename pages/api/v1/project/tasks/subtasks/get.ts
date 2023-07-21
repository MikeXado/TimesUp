import { getUser } from "@/viewmodels/firebase/auth";
import getSubtasks from "@/viewmodels/firebase/db/get-subtasks";
import { parse } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { projectId, taskId } = req.body;
    try {
      const cookies = parse(req.headers.cookie || "");
      const token = cookies["session-token"];
      const { uid } = await getUser(token);
      const data = await getSubtasks(uid, projectId, taskId);

      res.status(200).json({ message: data });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Something went wrong during subtasks fetching" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
