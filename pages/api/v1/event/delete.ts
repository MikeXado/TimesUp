import { getUser } from "@/viewmodels/firebase/auth";
import deleteEvent from "@/viewmodels/firebase/db/delete-event";
import { parse } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { eventId } = req.body;
    const cookies = parse(req.headers.cookie || "");
    const token = cookies["session-token"];
    const data = await getUser(token);

    const response = await deleteEvent(data.uid, eventId);

    if (response.success) {
      res.status(200).json({ message: response.description });
    } else {
      res.status(500).json({ message: response.description });
    }
  } else {
    res.status(405).send("Method not allowed");
  }
}
