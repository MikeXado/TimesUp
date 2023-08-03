import { db } from "@/models/firebase-admin";
import { PomoType } from "@/types";

type PomoTypeWithoutId = Omit<PomoType, "id">;

const addPomodoroSettings = async (
  data: PomoTypeWithoutId,
  uid: string,
  projectId: string,
  taskId: string
) => {
  try {
    const pomodorRef = db
      .collection("private")
      .doc(uid)
      .collection("projects")
      .doc(projectId)
      .collection("tasks")
      .doc(taskId)
      .collection("pomodoro")
      .doc("pomodoro_settings");

    await pomodorRef.set(data);
    const message = {
      success: true,
      message: "Pomodoro settings was saved successfully",
    };
    return message;
  } catch (err) {
    const message = {
      success: false,
      message: "Something went wrong during saving pomodoro. Try again later",
    };
    return message;
  }
};

export const getPomodoroSettings = async (
  uid: string,
  projectId: string,
  taskId: string
) => {
  try {
    const pomodorRef = db
      .collection("private")
      .doc(uid)
      .collection("projects")
      .doc(projectId)
      .collection("tasks")
      .doc(taskId)
      .collection("pomodoro")
      .doc("pomodoro_settings");

    const pomodoroSnapshot = await pomodorRef.get();
    return pomodoroSnapshot.data();
  } catch (err: any) {
    throw new Error(err);
  }
};

export default addPomodoroSettings;
