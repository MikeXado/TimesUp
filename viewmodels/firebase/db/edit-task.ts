import { db } from "@/models/firebase-admin";
import { SubtaskType, TaskType } from "@/types";

interface SubtasksTypeWithId extends SubtaskType {
  id?: string;
}

const EditTask = async (
  id: string,
  uid: string,
  taskId: string,
  data: TaskType,
  subtasks: SubtasksTypeWithId[]
) => {
  try {
    const colRef = db
      .collection("private")
      .doc(uid)
      .collection("projects")
      .doc(id)
      .collection("tasks")
      .doc(taskId);
    const taskRef = await colRef.set(data);

    // Add subtasks to a separate collection using the task's ID
    const subtasksRef = db
      .collection("private")
      .doc(uid)
      .collection("projects")
      .doc(id)
      .collection("tasks")
      .doc(taskId)
      .collection("subtasks");

    // Batch write to add multiple subtasks
    const batch = db.batch();
    subtasks.forEach((subtask) => {
      if (!subtask.id) {
        const subtaskDocRef = subtasksRef.doc();
        batch.set(subtaskDocRef, subtask);
      }
    });
    await batch.commit();

    const message = {
      success: true,
      message: "Task and subtasks were edit successfully",
    };

    return message;
  } catch (err) {
    console.log(err);
    const message = {
      success: false,
      message:
        "Something went wrong during the task and subtasks editing process",
    };
    return message;
  }
};

export default EditTask;
