import { resetPassword } from "../../lib/firebase";

export default async function handler(req, res) {
  const { email } = req.body;
  await resetPassword(email);

  res.status(200).json({ message: "OK" });
}
