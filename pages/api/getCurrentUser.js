import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../lib/firebase";

export default async function handler(req, res) {
  await onAuthStateChanged(auth, (e) => {
    if (e) {
      res.status(200).json(e);
    } else {
      res.status(500).json({ message: "User not found" });
    }
  });

  // const currentUser = auth.currentUser;

  // const user = {
  //   uid: currentUser.uid,
  //   displayName: currentUser.displayName,
  //   email: currentUser.email,
  // };
}
