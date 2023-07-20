import { db } from "@/models/firebase-admin";
import { SubtaskType } from "@/types";

interface SubtasksTypeWithId extends SubtaskType {
  id: string;
}

const getSubtasks = async (uid: string, projectId: string, taskId: string) => {
  try {
    const subtasksRef = db
      .collection("private")
      .doc(uid)
      .collection("projects")
      .doc(projectId)
      .collection("tasks")
      .doc(taskId)
      .collection("subtasks");
    const subtasksSnapshot = await subtasksRef.get();
    let subtasks: SubtasksTypeWithId[] = [];
    subtasksSnapshot.forEach((doc) => {
      const subtaskData = doc.data();
      const subtask: SubtasksTypeWithId = {
        id: doc.id,
        title: subtaskData.title,
        done: subtaskData.done,
      };
      subtasks.push(subtask);
    });

    return subtasks;
  } catch (err: any) {
    throw new Error(err);
  }
};

export default getSubtasks;
