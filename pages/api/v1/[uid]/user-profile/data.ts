import { NextApiRequest, NextApiResponse } from "next";
import { getSpecificUser, updateSpecificUser } from "../../../../../lib/db";
import { UserData } from "../../../../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const userInfo = req.body;
    try {
      await updateSpecificUser(userInfo);
      res.status(200).json({ message: "User updated successfully" });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error on updating user", err: err.message });
    }
  } else if (req.method === "GET") {
    const { uid } = req.query;
    try {
      const user: UserData = await getSpecificUser(uid);

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
