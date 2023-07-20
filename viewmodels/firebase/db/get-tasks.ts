import { db } from "@/models/firebase-admin";

const getTasks = async (
  uid: string,
  id: string,
  startAfter: string | null,
  status: string | null
) => {
  try {
    let taskRef = db
      .collection("private")
      .doc(uid)
      .collection("projects")
      .doc(id)
      .collection("tasks");

    let taskRefOrder = taskRef.orderBy("_createdAt", "asc");
    if (status) {
      taskRefOrder = taskRefOrder.where("status", "==", status);
    }
    if (startAfter) {
      taskRefOrder = taskRefOrder.startAfter(startAfter);
    }

    const snapshot = await taskRefOrder.limit(5).get();

    const tasks = [];

    for (const doc of snapshot.docs) {
      const tasksData = doc.data();

      const subtasksRef = taskRef.doc(doc.id).collection("subtasks");
      const subtasksSnapshot = await subtasksRef.get();

      const completedSubtasks = subtasksSnapshot.docs.filter(
        (subtaskDoc) => subtaskDoc.data().done === true
      );
      const completedSubtasksCount = completedSubtasks.length;
      const totalSubtasksCount = subtasksSnapshot.docs.length;

      const taskWithSubtasks = {
        ...tasksData,
        id: doc.id,
        completedTasks: completedSubtasksCount,
        tasks: totalSubtasksCount,
      };

      tasks.push(taskWithSubtasks);
    }
    return tasks;
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};

export default getTasks;
