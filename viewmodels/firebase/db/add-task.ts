import { db } from "@/models/firebase-admin";
import { SubtaskType, TaskType } from "@/types";

const addTask = async (
  id: string,
  uid: string,
  data: TaskType,
  subtasks: SubtaskType[]
) => {
  try {
    const colRef = db
      .collection("private")
      .doc(uid)
      .collection("projects")
      .doc(id)
      .collection("tasks");
    const taskRef = await colRef.add(data);

    // Add subtasks to a separate collection using the task's ID
    const subtasksRef = db
      .collection("private")
      .doc(uid)
      .collection("projects")
      .doc(id)
      .collection("tasks")
      .doc(taskRef.id)
      .collection("subtasks");

    // Batch write to add multiple subtasks
    const batch = db.batch();
    subtasks.forEach((subtask) => {
      const subtaskDocRef = subtasksRef.doc();
      batch.set(subtaskDocRef, subtask);
    });
    await batch.commit();

    const message = {
      success: true,
      message: "Task and subtasks were created successfully",
    };

    return message;
  } catch (err) {
    const message = {
      success: false,
      message:
        "Something went wrong during the task and subtasks creation process",
    };
    return message;
  }
};

export default addTask;
