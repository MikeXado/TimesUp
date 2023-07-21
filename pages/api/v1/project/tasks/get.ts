import { getUser } from "@/viewmodels/firebase/auth";
import getTasks from "@/viewmodels/firebase/db/get-tasks";
import { parse } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { id, startAfter, status } = req.body;
      const cookies = parse(req.headers.cookie || "");
      const token = cookies["session-token"];
      const { uid } = await getUser(token);
      const response = await getTasks(uid, id, startAfter, status);
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error while fetching tasks" });
    }
  } else {
    res.status(405).send("Method not allowed");
  }
}
