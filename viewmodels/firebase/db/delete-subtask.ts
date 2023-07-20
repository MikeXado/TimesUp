import { db } from "@/models/firebase-admin";

const deleteSubtask = async (
  uid: string,
  projectId: string,
  taskId: string,
  subtaskId: string
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
    await subtaskRef.delete();
    const message = {
      success: true,
      description: "Subtask deleted successfully",
    };
    return message;
  } catch (err) {
    const message = {
      success: false,
      description: "Something wrong during deleting subtask proccess",
    };
    return message;
  }
};

export default deleteSubtask;
