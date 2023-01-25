import { firestore } from "firebase-admin";
import { db, auth } from "./firebase";
const Cryptr = require("cryptr");

const cryptr = new Cryptr(process.env.NEXT_PUBLIC_KEY);

export const addSession = async (title, description, data, time) => {
  let currentUserUid = auth.currentUser.uid;
  const colRef = await db.doc(`users/${currentUserUid}`).collection("sessions");
  const session = {
    date: data,
    title: title,
    description: description,
    time: time,
    timeStamp: new Date(),
  };

  const ecr = cryptr.encrypt(JSON.stringify(session));

  await colRef.add({ ecr });

  return session;
};
export const changeSession = async (title, description, data, time, id) => {
  let currentUserUid = auth.currentUser.uid;
  const colRef = await db
    .doc(`users/${currentUserUid}`)
    .collection("sessions")
    .doc(`${id}`);

  const session = {
    date: data,
    title: title,
    description: description,
    time: time,
    timeStamp: new Date(),
  };
  const ecr = cryptr.encrypt(JSON.stringify(session));
  await colRef.set({ ecr });

  return session;
};

export const getSessions = async (id) => {
  const omit = (obj, ...props) => {
    const result = { ...obj };
    props.forEach(function (prop) {
      delete result[prop];
    });
    return result;
  };

  const colRef = db.doc(`users/${id}`).collection("sessions");
  // .orderBy("timeStamp");
  let sessions = [];

  (await colRef.get()).forEach((el) => {
    const dcr = JSON.parse(cryptr.decrypt(el.data().ecr));

    const result = omit(dcr, "timeStamp");
    sessions.push({ ...result, id: el.id });
  });
  return sessions;
};

export const createUserDb = async (currentUser) => {
  let currentUserUid = currentUser.uid;
  const ecr = cryptr.encrypt(JSON.stringify(currentUser));
  return await db.doc(`users/${currentUserUid}`).set({ ecr });
};

export const getUsersDb = async () => {
  const colRef = await db.collection("users").get();
  let users = [];

  colRef.forEach((el) => {
    const dcr = JSON.parse(cryptr.decrypt(el.data().ecr));
    users.push({ ...dcr, id: el.id });
  });

  return users;
};

export const getSpecificUser = async (id) => {
  const colRef = await db.doc(`users/${id}`).get();
  const dcr = JSON.parse(cryptr.decrypt(colRef.data().ecr));
  return dcr;
};

export const createChatDb = async (user) => {
  const currentUser = auth.currentUser;
  const combinedUid =
    currentUser > user.uid
      ? currentUser.uid + user.uid
      : user.uid + currentUser.uid;

  const currUser = {
    email: currentUser.email,
    displayName: currentUser.displayName,
    uid: currentUser.uid,
  };

  const roomObj = {
    members: [currentUser.uid, user.uid],
    user1: currUser,
    user2: user,
  };
  // const ecr = cryptr.encrypt(JSON.stringify(user));
  const colRef = db.doc(`rooms/${combinedUid}`);
  await colRef.set(roomObj);

  return combinedUid;
};

export const getChatDb = async (id) => {
  const colRef = await db.doc(`rooms/${id}`).get();
  // JSON.parse(cryptr.decrypt(colRef.data().ecr));

  return colRef.data();
};

export const getAllChats = async (id) => {
  const colRef = await db
    .collection("rooms")
    .where("members", "array-contains", id)
    .get();
  const chats = [];
  colRef.forEach((el) => {
    // const dcr = JSON.parse(cryptr.decrypt(el.data().ecr));
    chats.push({ ...el.data(), id: el.id });
  });

  return chats;
};

export const getMessages = async (id, userId) => {
  const omit = (obj, ...props) => {
    const result = { ...obj };
    props.forEach(function (prop) {
      delete result[prop];
    });
    return result;
  };

  const colRef = await db
    .doc(`rooms/${id}`)
    .collection("messages")
    .where("members", "array-contains", userId)
    .orderBy("timeStamp")
    .get();
  let messages = [];
  colRef.forEach((el) => {
    const dcr = JSON.parse(cryptr.decrypt(el.data().ecr));

    messages.push({
      ...dcr,
    });
  });
  return messages;
};

export const addMessage = async (id, messages, members) => {
  const currentUser = auth.currentUser;
  // const messageObj = {
  //   message: message,
  //   displayName: currentUser.displayName,
  //   email: currentUser.email,
  //   uid: currentUser.uid,
  // };
  const ecr = cryptr.encrypt(JSON.stringify(messages));
  const colRef = db.doc(`rooms/${id}`).collection("messages");
  members.forEach(async (member) => {
    if (member !== currentUser.uid) return;
    await colRef.add({
      ecr,
      members: members,
      timeStamp: new Date(),
    });
  });
};

export const addEvent = async (data) => {
  let currentUserUid = auth.currentUser.uid;
  const ecr = cryptr.encrypt(JSON.stringify(data));
  const colRef = db.doc(`users/${currentUserUid}`).collection("events");
  return await colRef.add({ ecr });
};

export const getEvents = async (id) => {
  const colRef = await db.doc(`users/${id}`).collection("events").get();
  const events = [];
  colRef.forEach((el) => {
    const dcr = JSON.parse(cryptr.decrypt(el.data().ecr));

    events.push({ ...dcr, id: el.id });
  });
  return events;
};

export const changeEvents = async (data) => {
  let currentUserUid = auth.currentUser.uid;
  const ecr = cryptr.encrypt(JSON.stringify(data));
  const colRef = db
    .doc(`users/${currentUserUid}`)
    .collection("events")
    .doc(`${data.id}`);

  return await colRef.set({ ecr });
};
