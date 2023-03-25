import { updateEmail } from "firebase/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { getSpecificUser, updateSpecificUser } from "../../../../../lib/db";
import { adminAuth } from "../../../../../lib/firebase";
import { UserData } from "../../../../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { uid, userId } = req.query;
  const currentUserUid = req.cookies.u_i;

  if (currentUserUid !== uid) {
    res.status(401).send("Unauthorized");
    return;
  }

  if (req.method === "PUT") {
    try {
      const userInfo = req.body;
      await updateSpecificUser(userInfo);
      adminAuth.updateUser(`${currentUserUid}`, {
        email: userInfo.email,
        photoURL: userInfo.photoUrl,
        displayName: userInfo.displayName,
      });
      res.status(200).json({ message: "User updated successfully" });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error on updating user", err: err.message });
    }
  } else if (req.method === "GET") {
    try {
      const user: UserData = await getSpecificUser(userId);

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
