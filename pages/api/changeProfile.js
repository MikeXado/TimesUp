import { updateSpecificUser } from "../../lib/db";

export default async function handler(req, res) {
  const userInfo = req.body;
  try {
    await updateSpecificUser(userInfo);
    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error on updating user", err: err.message });
  }
}
