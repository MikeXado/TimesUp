import { createUserDb } from "../../lib/db";
import { updateUser } from "../../lib/firebase";
import { auth } from "../../lib/firebase";
export default async function handler(req, res) {
  const { firstName, lastName } = req.body;
  await updateUser(`${firstName} ${lastName}`);
  let currentUserData = {
    email: auth.currentUser.email,
    displayName: auth.currentUser.displayName,
    uid: auth.currentUser.uid,
  };

  await createUserDb(currentUserData);

  res.status(200).json({
    message: "User updated successfully",
  });
}
