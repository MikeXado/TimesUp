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
import { getStorage } from "firebase-admin/storage";
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};
if (!firebase.getApps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = getAuth();

const config = {
  credential: admin.cert({
    projectId: process.env["FIREBASE_ADMIN_PROJECT_ID"],
    clientEmail: process.env["FIREBASE_ADMIN_CLIENT_EMAIL"],
    privateKey: process.env["FIREBASE_ADMIN_PRIVATE_KEY"].replace(/\\n/g, "\n"),
    storageBucket: process.env.STORAGE_BUCKET,
  }),
};

if (!admin.getApps().length) {
  admin.initializeApp(config);
}
const storage = getStorage().bucket(process.env.STORAGE_BUCKET);
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
  admin,
  adminAuth,
  getAdminAuth,
  signIn,
  signUp,
  getSessionToken,
  logOutFirebase,
  updateUser,
  db,
  resetPassword,
  storage,
  config,
  firebaseConfig,
};
