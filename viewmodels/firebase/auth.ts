import { adminAuth } from "@/models/firebase-admin";
import { auth } from "@/models/firebase-client";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { redirect } from "next/navigation";

async function signUp(email: string, password: string, displayName: string) {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const uid = user.uid;
    await updateUserDisplayName(uid, displayName);
    const message = {
      success: true,
      description: "Congrats! , You're now part of our family",
    };
    return message;
  } catch (err) {
    const message = {
      success: false,
      description: "Something went wrong during Sign Up process",
    };
    return message;
  }
}

async function signIn(email: string, password: string) {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const tkn = await user.getIdToken();

    const message = {
      success: true,
      tkn: tkn,
    };

    return message;
  } catch (err) {
    const message = {
      success: false,
      description: "Error during Sign In process",
    };
    return message;
  }
}

async function getSessionToken(idToken: string) {
  const decodedToken = await adminAuth.verifyIdToken(idToken);
  if (new Date().getTime() / 1000 - decodedToken.auth_time > 5 * 60) {
    throw new Error("Recent sign in required");
  }

  const twoWeeks = 60 * 60 * 24 * 14 * 1000;
  return adminAuth.createSessionCookie(idToken, { expiresIn: twoWeeks });
}

async function updateUserDisplayName(uid: string, displayName: string) {
  try {
    await adminAuth.updateUser(uid, {
      displayName: displayName,
    });
    const message = {
      success: true,
      description: "User display name was succesffuly updated",
    };
    return message;
  } catch (err) {
    const message = {
      success: false,
      description:
        "Something went wrong during update user process! Try again later",
    };
    return message;
  }
}

async function updateUser(uid: string, displayName: string, photoUrl: string) {
  try {
    await adminAuth.updateUser(uid, {
      displayName: displayName,
      photoURL: photoUrl,
    });
    const message = {
      success: true,
      description: "User was succesffuly updated",
    };
    return message;
  } catch (err) {
    console.log(err);
    const message = {
      success: false,
      description: err,
    };
    return message;
  }
}

async function logOutFirebase() {
  await signOut(auth);
}

async function sendPasswordReset(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
    const message = {
      success: true,
      description:
        "A reset password email was send to your email. Check inbox!",
    };
    return message;
  } catch (err) {
    const message = {
      success: false,
      description: "Something went wrong! Try again later",
    };
    return message;
  }
}

async function getUser(idToken: string) {
  try {
    const decodedToken = await adminAuth.verifySessionCookie(idToken);
    const user = await adminAuth.getUser(decodedToken.uid);
    const userData = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
    };
    return userData;
  } catch (err) {
    redirect("/signIn");
  }
}

export {
  signIn,
  signUp,
  getSessionToken,
  logOutFirebase,
  sendPasswordReset,
  updateUserDisplayName,
  getUser,
  updateUser,
};
