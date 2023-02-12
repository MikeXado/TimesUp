import { addNewTask } from "../../lib/db";

export default async function handler(req, res) {
  const data = req.body;
  console.log(data);
  try {
    await addNewTask(data);
    res.status(200).json({ message: "succes" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
