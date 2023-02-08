import { changeSession } from "../../lib/db";

export default async function handler(req, res) {
  const { title, description, time, date, id, uid } = req.body;

  await changeSession(title, description, date, time, id, uid);
  res.status(200).json({
    message: "success",
  });
}
