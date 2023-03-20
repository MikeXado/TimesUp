import { uuidv4 } from "@firebase/util";
import {
  ChatData,
  EventsType,
  KanbanBoards,
  KanbanColumnsType,
  KanbanTaskType,
  MessageType,
  PomodoroType,
  Session,
  SubtasksType,
  UserData,
} from "../types";
import { db } from "./firebase";
const Cryptr = require("cryptr");

const cryptr = new Cryptr(process.env.KEY);

export const addCurrentUser = async (user: UserData) => {
  try {
    const ecr = cryptr.encrypt(JSON.stringify(user));
    return await db.doc("currentUser/logged").set({ ecr });
  } catch (err) {
    throw new Error(err);
  }
};

export const getCurrentUser = async () => {
  try {
    const colRef = await db.doc("currentUser/logged").get();
    let dcr = cryptr.decrypt(colRef.data()?.ecr);
    return JSON.parse(dcr);
  } catch (err) {
    throw new Error(err);
  }
};

export const addSession = async (
  title: string,
  description: string,
  data: string,
  time: string,
  uid: string | string[] | undefined
) => {
  try {
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
  } catch (err) {
    throw new Error(err);
  }
};
export const changeSession = async (
  title: string,
  description: string,
  data: string,
  time: string,
  uid: string | string[] | undefined,
  id: string
) => {
  try {
    const colRef = db.doc(`users/${uid}`).collection("sessions").doc(`${id}`);

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
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteSession = async (data: {
  uid: string | string[] | undefined;
  sessionId: string | string[] | undefined;
}) => {
  try {
    const colRef = db
      .doc(`users/${data.uid}`)
      .collection("sessions")
      .doc(`${data.sessionId}`);
    return await colRef.delete();
  } catch (err) {
    throw new Error(err);
  }
};

export const getSessions = async (id: string | string[] | undefined) => {
  try {
    const omit = (obj, ...props) => {
      const result = { ...obj };
      props.forEach(function (prop) {
        delete result[prop];
      });
      return result;
    };

    const colRef = db.doc(`users/${id}`).collection("sessions");
    // .orderBy("timeStamp");
    let sessions: Session[] = [];

    (await colRef.get()).forEach((el) => {
      const dcr = JSON.parse(cryptr.decrypt(el.data().ecr));

      const result = omit(dcr, "timeStamp");
      sessions.push({ ...result, id: el.id });
    });
    return sessions;
  } catch (err) {
    throw new Error(err);
  }
};

export const createUserDb = async (currentUser: { uid: string }) => {
  try {
    let currentUserUid = currentUser.uid;
    const ecr = cryptr.encrypt(JSON.stringify(currentUser));
    return await db.doc(`users/${currentUserUid}`).set({ ecr });
  } catch (err) {
    throw new Error(err);
  }
};

export const getUsersDb = async () => {
  try {
    const colRef = await db.collection("users").get();
    let users: UserData[] = [];

    colRef.forEach((el) => {
      const dcr = JSON.parse(cryptr.decrypt(el.data().ecr));
      users.push({ ...dcr, id: el.id });
    });

    return users;
  } catch (err) {
    throw new Error(err);
  }
};

export const getSpecificUser = async (id: string | string[] | undefined) => {
  try {
    const colRef = await db.doc(`users/${id}`).get();
    const dcr = JSON.parse(cryptr.decrypt(colRef.data()?.ecr));
    return dcr;
  } catch (err) {
    throw new Error(err);
  }
};

export const updateSpecificUser = async (userInfo: UserData) => {
  try {
    const ecr = cryptr.encrypt(JSON.stringify(userInfo));
    return await db.doc(`users/${userInfo.uid}`).set({ ecr });
  } catch (err) {
    throw new Error(err);
  }
};

interface createChatDbTypeUser extends UserData {
  currentUser: string;
}

export const createChatDb = async (user: createChatDbTypeUser) => {
  try {
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
  } catch (err) {
    throw new Error(err);
  }
};

export const getChatDb = async (id: string | string[] | undefined) => {
  try {
    const colRef = await db.doc(`rooms/${id}`).get();
    // JSON.parse(cryptr.decrypt(colRef.data().ecr));

    return colRef.data();
  } catch (err) {
    throw new Error(err);
  }
};

export const getAllChats = async (id: string | string[] | undefined) => {
  try {
    const colRef = await db
      .collection("rooms")
      .where("members", "array-contains", id)
      .get();
    let chats: ChatData[] = [];
    colRef.forEach((el) => {
      // const dcr = JSON.parse(cryptr.decrypt(el.data().ecr));
      let chatData: ChatData = {
        id: el.id,
        members: el.data().members,
      };
      chats.push({ ...chatData });
    });

    return chats;
  } catch (err) {
    throw new Error(err);
  }
};

export const getMessages = async (
  id: string | string[] | undefined,
  userId: string | string[] | undefined
) => {
  try {
    const colRef = await db
      .doc(`rooms/${id}`)
      .collection("messages")
      .where("members", "array-contains", userId)
      .orderBy("timeStamp")
      .get();
    let messages: MessageType[] = [];
    colRef.forEach((el) => {
      const dcr = JSON.parse(cryptr.decrypt(el.data().ecr));

      messages.push({
        ...dcr,
      });
    });
    return messages;
  } catch (err) {
    throw new Error(err);
  }
};

export const addMessage = async (
  id: string,
  messages: MessageType,
  members: string[],
  currentUser: string
) => {
  try {
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
  } catch (err) {
    throw new Error(err);
  }
};

interface FunctionsEventType extends EventsType {
  uid: string;
}

export const addEvent = async (data: FunctionsEventType) => {
  try {
    const ecr = cryptr.encrypt(JSON.stringify(data));
    const colRef = db.doc(`users/${data.uid}`).collection("events");
    return await colRef.add({ ecr });
  } catch (err) {
    throw new Error(err);
  }
};

export const getEvents = async (id: string | string[] | undefined) => {
  try {
    const colRef = await db.doc(`users/${id}`).collection("events").get();
    const events: EventsType[] = [];
    colRef.forEach((el) => {
      const dcr = JSON.parse(cryptr.decrypt(el.data().ecr));

      events.push({ ...dcr, id: el.id });
    });
    return events;
  } catch (err) {
    throw new Error(err);
  }
};

export const changeEvents = async (data: FunctionsEventType) => {
  try {
    const ecr = cryptr.encrypt(JSON.stringify(data));
    const colRef = db
      .doc(`users/${data.uid}`)
      .collection("events")
      .doc(`${data.id}`);

    return await colRef.set({ ecr });
  } catch (err) {
    throw new Error(err);
  }
};

export const addPomodoro = async (data: PomodoroType) => {
  try {
    const ecr = cryptr.encrypt(JSON.stringify(data));
    return await db
      .doc(`users/${data.id}`)
      .collection("pomodoros")
      .add({ ecr });
  } catch (err) {
    throw new Error(err);
  }
};

export const getPomodoros = async (id: string | string[] | undefined) => {
  try {
    const colRef = await db.doc(`users/${id}`).collection("pomodoros").get();
    let pomodoros: PomodoroType[] = [];
    colRef.forEach((el) => {
      const dcr = JSON.parse(cryptr.decrypt(el.data().ecr));
      pomodoros.push({ ...dcr, id: el.id });
    });
    return pomodoros;
  } catch (err) {
    throw new Error(err);
  }
};

interface AddBoardType {
  title: string;
  description: string;
  uid: string | string[] | undefined;
}
export const addBoard = async (data: AddBoardType) => {
  try {
    const ecr = cryptr.encrypt(JSON.stringify(data));
    const colRef = db.doc(`users/${data.uid}`).collection("boards");
    await colRef.add({ ecr });
  } catch (err) {
    throw new Error(err);
  }
};

export const getBoards = async (uid: string | string[] | undefined) => {
  try {
    const colRef = db.doc(`users/${uid}`).collection("boards").get();
    let boards: KanbanBoards[] = [];
    (await colRef).forEach((el) => {
      const dcr = JSON.parse(cryptr.decrypt(el.data().ecr));
      boards.push({ ...dcr, id: el.id });
    });
    return boards;
  } catch (err) {
    throw new Error(err);
  }
};

interface FunctionsKanbanTasksType extends KanbanTaskType {
  subtasks: SubtasksType[];
}

export const addNewTask = async (data: FunctionsKanbanTasksType) => {
  try {
    const ecrTask = cryptr.encrypt(
      JSON.stringify({
        boardId: data.boardId,
        uid: data.uid,
        status: data.status,
        title: data.title,
        description: data.description,
        progress: data.progress,
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
  } catch (err) {
    throw new Error(err);
  }
};

export const getSubtasks = async (data: {
  uid: string | string[] | undefined;
  boardId: string | string[] | undefined;
  taskId: string | string[] | undefined;
}) => {
  try {
    const colRef = await db
      .doc(`users/${data.uid}`)
      .collection("boards")
      .doc(`${data.boardId}`)
      .collection("tasks")
      .doc(`${data.taskId}`)
      .collection("subtasks")
      .get();

    let subtasks: SubtasksType[] = [];
    colRef.forEach((el) => {
      const dcrSubtasks = JSON.parse(cryptr.decrypt(el.data().ecrSubtask));
      subtasks.push({ ...dcrSubtasks, id: el.id });
    });

    return subtasks;
  } catch (err) {
    throw new Error(err);
  }
};

interface ChangeSubtasksType extends SubtasksType {
  uid: string;
  boardId: string;
  taskId: string;
}

export const changeSubtask = async (data: ChangeSubtasksType) => {
  try {
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
  } catch (err) {
    throw new Error(err);
  }
};

export const getTasks = async (
  uid: string | string[] | undefined,
  boardName: string | string[] | undefined
) => {
  try {
    const colRef = await db
      .doc(`users/${uid}`)
      .collection("boards")
      .doc(`${boardName}`)
      .collection("tasks")
      .get();

    let tasks: KanbanTaskType[] = [];
    colRef.forEach((el) => {
      const dcr = JSON.parse(cryptr.decrypt(el.data().ecrTask));
      tasks.push({ ...dcr, id: el.id });
    });
    return tasks;
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteTask = async (data: {
  uid: string | string[] | undefined;
  boardId: string | string[] | undefined;
  taskId: string | string[] | undefined;
}) => {
  try {
    return await db
      .doc(`users/${data.uid}`)
      .collection("boards")
      .doc(`${data.boardId}`)
      .collection("tasks")
      .doc(`${data.taskId}`)
      .delete();
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteSubTask = async (data: {
  uid: string;
  boardId: string;
  taskId: string;
  id: string;
}) => {
  try {
    return await db
      .doc(`users/${data.uid}`)
      .collection("boards")
      .doc(`${data.boardId}`)
      .collection("tasks")
      .doc(`${data.taskId}`)
      .collection("subtasks")
      .doc(`${data.id}`)
      .delete();
  } catch (err) {
    throw new Error(err);
  }
};

export const editTask = async (data: FunctionsKanbanTasksType) => {
  try {
    const ecrTask = cryptr.encrypt(
      JSON.stringify({
        boardId: data.boardId,
        id: data.id,
        uid: data.uid,
        status: data.status,
        title: data.title,
        description: data.description,
        progress: data.progress,
      })
    );
    const colRef = db
      .doc(`users/${data.uid}`)
      .collection("boards")
      .doc(`${data.boardId}`)
      .collection("tasks")
      .doc(`${data.id}`);
    await colRef.set({ ecrTask, timeStamp: new Date() });
    data?.subtasks?.forEach(async (el) => {
      const ecrSubtask = cryptr.encrypt(JSON.stringify({ ...el }));
      await colRef
        .collection("subtasks")
        .add({ ecrSubtask, timeStamp: new Date() });
    });
  } catch (err) {
    throw new Error(err);
  }
};

interface AddColumnType extends KanbanColumnsType {
  uid: string;
  boardId: string;
}

export const addColumn = async (data: AddColumnType) => {
  try {
    const ecrColumn = cryptr.encrypt(JSON.stringify({ column: data.column }));

    return await db
      .doc(`users/${data.uid}`)
      .collection("boards")
      .doc(`${data.boardId}`)
      .collection("columns")
      .add({ ecrColumn, timeStamp: new Date() });
  } catch (err) {
    throw new Error(err);
  }
};

export const getColumns = async (
  uid: string | string[] | undefined,
  boardName: string | string[] | undefined
) => {
  try {
    const colRef = await db
      .doc(`users/${uid}`)
      .collection("boards")
      .doc(`${boardName}`)
      .collection("columns")
      .orderBy("timeStamp")
      .get();
    let columns: KanbanColumnsType[] = [];

    colRef.forEach(async (el) => {
      const dcrColumn = JSON.parse(cryptr.decrypt(el.data().ecrColumn));
      columns.push({ ...dcrColumn, id: el.id });
    });

    return columns;
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteColumn = async (
  uid: string | string[] | undefined,
  boardId: string | string[] | undefined,
  columnId: string | string[] | undefined
) => {
  try {
    return await db
      .doc(`users/${uid}`)
      .collection("boards")
      .doc(`${boardId}`)
      .collection("columns")
      .doc(`${columnId}`)
      .delete();
  } catch (err) {
    throw new Error(err);
  }
};
