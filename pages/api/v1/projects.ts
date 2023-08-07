import { getUser } from "@/viewmodels/firebase/auth";
import { addProject } from "@/viewmodels/firebase/db/add-project";
import getProjects from "@/viewmodels/firebase/db/get-projects";
import { parse } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookies = parse(req.headers.cookie || "");
  const token = cookies["session-token"];
  const data = await getUser(token);

  if (req.method === "GET") {
    try {
      const response = await getProjects(data.uid);

      res.status(200).json({ message: response });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Something went wrong during projects fetching" });
    }
  } else if (req.method === "POST") {
    const { sendData } = req.body;
    const response = await addProject(data.uid, sendData);
    if (response.success) {
      res.status(200).json({ message: response.message });
    } else {
      res.status(500).json({ message: response.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
