import { db } from "@/models/firebase-admin";
import { CollectionReference } from "firebase-admin/firestore";

const deleteTask = async (uid: string, projectId: string, taskId: string) => {
  try {
    const taskRef = db
      .collection("private")
      .doc(uid)
      .collection("projects")
      .doc(projectId)
      .collection("tasks")
      .doc(taskId);

    const subtasksRef = taskRef.collection("subtasks");
    await deleteCollection(subtasksRef);
    await taskRef.delete();
    const message = {
      success: true,
      description: "Task was deleted",
    };
    return message;
  } catch (err) {
    const message = {
      success: false,
      description: "Something went wrong during task delete proccess",
    };
    return message;
  }
};

async function deleteCollection(collectionRef: CollectionReference) {
  const batchSize = 500;
  const query = collectionRef.limit(batchSize);

  while (true) {
    const snapshot = await query.get();

    if (snapshot.size === 0) {
      break;
    }

    const batch = db.batch();

    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    if (snapshot.size < batchSize) {
      break;
    }
  }
}

export default deleteTask;
