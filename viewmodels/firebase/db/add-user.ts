import { db } from "@/models/firebase-admin";

export const addUser = async (data: {
  displayName: string;
  uid: string;
  email: string;
  _createdAt: string;
  _updatedAt: string;
}) => {
  try {
    const colRef = db
      .collection("private")
      .doc("users")
      .collection("data")
      .doc(`${data.uid}`);

    await colRef.set(data);
  } catch (err) {
    return err;
  }
};
