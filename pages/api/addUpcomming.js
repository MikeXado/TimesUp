import { addSession } from "../../lib/db";

export default async function handler(req, res) {
  const { title, description, time, date, uid } = req.body;

  try {
    await addSession(title, description, date, time, uid);
    res.status(200).send({ message: "Session added" });
  } catch (err) {
    res.status(500).send({ message: err });
  }
}
