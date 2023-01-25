import { changeSession } from "../../lib/db";

export default async function handler(req, res) {
  const { title, description, time, date, id } = req.body;

  await changeSession(title, description, date, time, id);
  res.status(200).json({
    message: "success",
  });
}
