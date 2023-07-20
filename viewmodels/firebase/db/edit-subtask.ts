import { db } from "@/models/firebase-admin";

const editSubtask = async (
  uid: string,
  projectId: string,
  taskId: string,
  subtaskId: string,
  done: boolean
) => {
  try {
    const subtaskRef = db
      .collection("private")
      .doc(uid)
      .collection("projects")
      .doc(projectId)
      .collection("tasks")
      .doc(taskId)
      .collection("subtasks")
      .doc(subtaskId);

    const taskRef = db
      .collection("private")
      .doc(uid)
      .collection("projects")
      .doc(projectId)
      .collection("tasks")
      .doc(taskId);

    await subtaskRef.update({
      done: done,
    });
    await taskRef.update({
      _updatedAt: new Date().toISOString(),
    });

    const message = {
      success: true,
      description: "Subtask was updated successfully",
    };
    return message;
  } catch (err) {
    console.log(err);
    const message = {
      success: false,
      description:
        "Something went wrong during subtask status changing. Please try again later",
    };
    return message;
  }
};

export default editSubtask;
