import { NextApiRequest, NextApiResponse } from "next";
import { getSpecificUser } from "../../lib/db";
import { UserData } from "../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const currentMember = req.body;

  try {
    const user: UserData = await getSpecificUser(currentMember);

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
