import { getUser } from "@/viewmodels/firebase/auth";
import editEvent from "@/viewmodels/firebase/db/edit-event";
import { parse } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { eventId, data } = req.body;
    const cookies = parse(req.headers.cookie || "");
    const token = cookies["session-token"];
    const { uid } = await getUser(token);

    const response = await editEvent(uid, eventId, data);

    if (response.success) {
      res.status(200).json({ message: response.description });
    } else {
      res.status(500).json({ message: response.description });
    }
  } else {
    res.status(405).send("Method not allowed");
  }
}
