import * as admin from "firebase-admin/app";
import { getAuth as getAdminAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const config = {
  credential: admin.cert({
    projectId: process.env["FIREBASE_ADMIN_PROJECT_ID"],
    clientEmail: process.env["FIREBASE_ADMIN_CLIENT_EMAIL"],
    privateKey: process.env["FIREBASE_ADMIN_PRIVATE_KEY"]?.replace(
      /\\n/g,
      "\n"
    ),
  }),
};

if (!admin.getApps().length) {
  admin.initializeApp(config);
}
const storage = getStorage().bucket(process.env.STORAGE_BUCKET);
const adminAuth = getAdminAuth();

const db = getFirestore();

export { db, storage, adminAuth };
