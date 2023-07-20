import getTasks from "@/viewmodels/firebase/db/get-tasks";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { uid, id, startAfter, status } = req.body;
      console.log(startAfter, status);
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
