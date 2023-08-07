import processQueryString from "@/lib/functions/process-query";
import { getUser } from "@/viewmodels/firebase/auth";
import deleteEvent from "@/viewmodels/firebase/db/delete-event";
import editEvent from "@/viewmodels/firebase/db/edit-event";
import { parse } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { eventId } = req.query;
  if (eventId) {
    const proccesedEventId = processQueryString(eventId);
    const cookies = parse(req.headers.cookie || "");
    const token = cookies["session-token"];
    const { uid } = await getUser(token);
    if (req.method === "PUT") {
      const { data } = req.body;
      const response = await editEvent(uid, proccesedEventId, data);
      if (response.success) {
        res.status(200).json({ message: response.description });
      } else {
        res.status(500).json({ message: response.description });
      }
    } else if (req.method === "DELETE") {
      const response = await deleteEvent(uid, proccesedEventId);

      if (response.success) {
        res.status(200).json({ message: response.description });
      } else {
        res.status(500).json({ message: response.description });
      }
    } else {
      res.status(405).send("Method not allowed");
    }
  } else {
    res.status(404).send("Event not found");
  }
}
