import { deleteSession } from "../../lib/db";

export default async function handler(req, res) {
  const data = req.body;
  try {
    await deleteSession(data);
    res.status(200).send({ message: "session deleted" });
  } catch (err) {
    res.status(500).send({ message: err });
  }
}
