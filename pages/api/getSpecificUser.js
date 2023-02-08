import { getSpecificUser } from "../../lib/db";

export default async function handler(req, res) {
  const currentMember = req.body;

  try {
    const user = await getSpecificUser(currentMember);

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
