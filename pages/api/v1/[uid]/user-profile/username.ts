import { NextApiRequest, NextApiResponse } from "next";
import { createUserDb } from "../../../../../lib/db";
import { updateUser } from "../../../../../lib/firebase";
import { auth } from "../../../../../lib/firebase";

interface CurrentUserData {
  email: string;
  displayName: string | null;
  uid: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  const { firstName, lastName }: { firstName: string; lastName: string } =
    req.body;

  try {
    await updateUser(`${firstName} ${lastName}`);

    let currentUserData: CurrentUserData = {
      email: auth.currentUser?.email ?? "",
      displayName: auth.currentUser?.displayName ?? "",
      uid: auth.currentUser?.uid ?? "",
    };

    await createUserDb(currentUserData);

    res.status(200).json({
      message: "User updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.code,
    });
  }
}
