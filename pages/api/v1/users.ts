import { NextApiRequest, NextApiResponse } from "next";
import { getUsersDb } from "../../../lib/db";
import { UserData } from "../../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const users: UserData[] = await getUsersDb();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
}
