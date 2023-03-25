import { NextApiRequest, NextApiResponse } from "next";
import { createUserDb } from "../../../../../lib/db";
import { adminAuth } from "../../../../../lib/firebase";

interface CurrentUserData {
  email: string;
  displayName: string | null;
  uid: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { firstName, lastName }: { firstName: string; lastName: string } =
    req.body;
  const { uid } = req.query;
  try {
    await adminAuth.updateUser(`${uid}`, {
      displayName: `${firstName} ${lastName}`,
    });

    const currentUser = await adminAuth.getUser(`${uid}`);

    await createUserDb({
      email: currentUser.email,
      displayName: currentUser.displayName,
      uid: currentUser.uid,
    });

    res.status(200).json({
      message: "User updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.code,
    });
  }
}
