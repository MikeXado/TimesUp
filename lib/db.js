import { uuidv4 } from "@firebase/util";
import { uniqueId } from "lodash";
import { db, auth } from "./firebase";
const Cryptr = require("cryptr");

const cryptr = new Cryptr(process.env.NEXT_PUBLIC_KEY);

export const addCurrentUser = async (user) => {
  const ecr = cryptr.encrypt(JSON.stringify(user));
  const colRef = await db.doc("currentUser/logged").set({ ecr });
};

export const getCurrentUser = async () => {
  const colRef = await db.doc("currentUser/logged").get();
  let dcr = cryptr.decrypt(colRef.data().ecr);
  return JSON.parse(dcr);
};

export const addSession = async (title, description, data, time, uid) => {
  const colRef = db.doc(`users/${uid}`).collection("sessions");
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
export const changeSession = async (
  title,
  description,
  data,
  time,
  id,
  uid
) => {
  const colRef = await db
    .doc(`users/${uid}`)
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

export const updateSpecificUser = async (userInfo) => {
  const ecr = cryptr.encrypt(JSON.stringify(userInfo));
  return await db.doc(`users/${userInfo.uid}`).set({ ecr });
};

export const createChatDb = async (user) => {
  const combinedUid =
    user.currentUser > user.uid
      ? user.currentUser + user.uid
      : user.uid + user.currentUser;

  const roomObj = {
    members: [user.currentUser, user.uid],
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

export const addMessage = async (id, messages, members, currentUser) => {
  const ecr = cryptr.encrypt(JSON.stringify(messages));
  const colRef = db.doc(`rooms/${id}`).collection("messages");
  members.forEach(async (member) => {
    if (member !== currentUser) return;
    await colRef.add({
      ecr,
      members: members,
      timeStamp: new Date(),
    });
  });
};

export const addEvent = async (data) => {
  const ecr = cryptr.encrypt(JSON.stringify(data));
  const colRef = db.doc(`users/${data.uid}`).collection("events");
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
  console.log(data);
  const ecr = cryptr.encrypt(JSON.stringify(data));
  const colRef = await db
    .doc(`users/${data.uid}`)
    .collection("events")
    .doc(`${data.id}`);

  return await colRef.set({ ecr });
};

export const addPomodoro = async (data) => {
  const ecr = cryptr.encrypt(JSON.stringify(data));
  return await db.doc(`users/${data.id}`).collection("pomodoros").add({ ecr });
};

export const getPomodoros = async (id) => {
  const colRef = await db.doc(`users/${id}`).collection("pomodoros").get();
  let pomodoros = [];
  colRef.forEach((el) => {
    const dcr = JSON.parse(cryptr.decrypt(el.data().ecr));
    pomodoros.push({ ...dcr, id: el.id });
  });
  return pomodoros;
};

export const addBoard = async (data) => {
  const ecr = cryptr.encrypt(JSON.stringify(data));
  const colRef = db.doc(`users/${data.id}`).collection("boards");
  await colRef.add({ ecr });
};

export const getBoards = async (id) => {
  const colRef = db.doc(`users/${id}`).collection("boards").get();
  let boards = [];
  (await colRef).forEach((el) => {
    const dcr = JSON.parse(cryptr.decrypt(el.data().ecr));
    boards.push({ ...dcr, id: el.id });
  });
  return boards;
};

export const addNewTask = async (data) => {
  const ecrTask = cryptr.encrypt(
    JSON.stringify({
      boardId: data.boardId,
      uid: data.uid,
      status: data.status,
      title: data.title,
      description: data.description,
    })
  );
  let taskId = uuidv4();
  const colRef = db
    .doc(`users/${data.uid}`)
    .collection("boards")
    .doc(`${data.boardId}`)
    .collection("tasks")
    .doc(`${taskId}`);
  await colRef.set({ ecrTask, timeStamp: new Date() });

  data.subtasks.forEach(async (el) => {
    const ecrSubtask = cryptr.encrypt(
      JSON.stringify({ title: el, done: false })
    );
    await colRef
      .collection("subtasks")
      .add({ ecrSubtask, timeStamp: new Date() });
  });
};

export const getSubtasks = async (data) => {
  const colRef = await db
    .doc(`users/${data.uid}`)
    .collection("boards")
    .doc(`${data.boardId}`)
    .collection("tasks")
    .doc(`${data.taskId}`)
    .collection("subtasks")
    .get();

  let subtasks = [];
  colRef.forEach((el) => {
    const dcrSubtasks = JSON.parse(cryptr.decrypt(el.data().ecrSubtask));
    subtasks.push({ ...dcrSubtasks, id: el.id });
  });

  return subtasks;
};

export const changeSubtask = async (data) => {
  const ecrSubtask = cryptr.encrypt(
    JSON.stringify({ title: data.title, done: data.done, id: data.id })
  );
  return await db
    .doc(`users/${data.uid}`)
    .collection("boards")
    .doc(`${data.boardId}`)
    .collection("tasks")
    .doc(`${data.taskId}`)
    .collection("subtasks")
    .doc(`${data.id}`)
    .set({ ecrSubtask });
};

export const getTasks = async (uid, boardName) => {
  const colRef = await db
    .doc(`users/${uid}`)
    .collection("boards")
    .doc(`${boardName}`)
    .collection("tasks")
    .get();

  let tasks = [];
  colRef.forEach((el) => {
    const dcr = JSON.parse(cryptr.decrypt(el.data().ecrTask));
    tasks.push({ ...dcr, id: el.id });
  });
  return tasks;
};

export const deleteTask = async (data) => {
  return await db
    .doc(`users/${data.uid}`)
    .collection("boards")
    .doc(`${data.boardId}`)
    .collection("tasks")
    .doc(`${data.taskId}`)
    .delete();
};

export const deleteSubTask = async (data) => {
  return await db
    .doc(`users/${data.uid}`)
    .collection("boards")
    .doc(`${data.boardId}`)
    .collection("tasks")
    .doc(`${data.taskId}`)
    .collection("subtasks")
    .doc(`${data.id}`)
    .delete();
};

export const editTask = async (data) => {
  const ecrTask = cryptr.encrypt(
    JSON.stringify({
      boardId: data.boardId,
      id: data.id,
      uid: data.uid,
      status: data.status,
      title: data.title,
      description: data.description,
    })
  );
  const colRef = db
    .doc(`users/${data.uid}`)
    .collection("boards")
    .doc(`${data.boardId}`)
    .collection("tasks")
    .doc(`${data.id}`);
  await colRef.set({ ecrTask, timeStamp: new Date() });
  data.subtasks.forEach(async (el) => {
    const ecrSubtask = cryptr.encrypt(JSON.stringify({ ...el }));
    await colRef
      .collection("subtasks")
      .add({ ecrSubtask, timeStamp: new Date() });
  });
};

export const addColumn = async (data) => {
  const ecrColumn = cryptr.encrypt(JSON.stringify({ column: data.column }));
  return await db
    .doc(`users/${data.uid}`)
    .collection("boards")
    .doc(`${data.boardId}`)
    .collection("columns")
    .add({ ecrColumn, timeStamp: new Date() });
};

export const getColumns = async (uid, boardName) => {
  const colRef = await db
    .doc(`users/${uid}`)
    .collection("boards")
    .doc(`${boardName}`)
    .collection("columns")
    .orderBy("timeStamp")
    .get();
  let columns = [];

  colRef.forEach(async (el) => {
    const dcrColumn = JSON.parse(cryptr.decrypt(el.data().ecrColumn));
    columns.push({ ...dcrColumn, id: el.id });
  });
  return columns;
};
