import { addColumn } from "../../lib/db";

export default async function handler(req, res) {
  const data = req.body;

  try {
    await addColumn(data);
    res.status(200).json({ message: "success" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
