import { getUser } from "@/viewmodels/firebase/auth";
import addEvent from "@/viewmodels/firebase/db/add-event";
import getEvents from "@/viewmodels/firebase/db/get-events";
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
      const response = await getEvents(data.uid);

      res.status(200).json({ message: response });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Something went wrong during projects fetching" });
    }
  } else if (req.method === "POST") {
    const { data } = req.body;
    const response = await addEvent(data.uid, data);
    if (response.success) {
      res.status(200).json({ message: response.message });
    } else {
      res.status(500).json({ message: response.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
