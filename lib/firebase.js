import * as admin from "firebase-admin/app";
import * as firebase from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { getAuth as getAdminAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};
if (!firebase.getApps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = getAuth();

const config = {
  credential: admin.cert({
    projectId: process.env["NEXT_PUBLIC_FIREBASE_ADMIN_PROJECT_ID"],
    clientEmail: process.env["NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_EMAIL"],
    privateKey: process.env["NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY"].replace(
      /\\n/g,
      "\n"
    ),
  }),
};

if (!admin.getApps().length) {
  admin.initializeApp(config);
}

const adminAuth = getAdminAuth();
const db = getFirestore();

async function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function signInGoogle(provider) {
  return signInWithPopup(auth, provider);
}

async function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

async function getSessionToken(idToken) {
  const decodedToken = await getAdminAuth().verifyIdToken(idToken);
  if (new Date().getTime() / 1000 - decodedToken.auth_time > 5 * 60) {
    throw new Error("Recent sign in required");
  }
  const twoWeeks = 60 * 60 * 24 * 14 * 1000;
  return getAdminAuth().createSessionCookie(idToken, { expiresIn: twoWeeks });
}

async function updateUser(displayName) {
  return await updateProfile(auth.currentUser, {
    displayName: displayName,
  });
}

async function logOutFirebase() {
  await signOut(auth);
}

async function resetPassword(email) {
  await sendPasswordResetEmail(auth, email);
}

export {
  firebase,
  auth,
  adminAuth,
  getAdminAuth,
  signIn,
  signUp,
  getSessionToken,
  logOutFirebase,
  updateUser,
  db,
  resetPassword,
};
