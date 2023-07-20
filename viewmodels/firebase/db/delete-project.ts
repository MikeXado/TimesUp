import { db, storage } from "@/models/firebase-admin";
import { CollectionReference } from "firebase-admin/firestore";

const deleteProject = async (uid: string, id: string) => {
  try {
    const projectRef = db
      .collection("private")
      .doc(uid)
      .collection("projects")
      .doc(id);
    const projectTasksRef = projectRef.collection("tasks");
    const projectSnapshot = await projectRef.get();

    const projectData = projectSnapshot.data();

    await deleteStorageProjectIcon(projectData?.icon);
    await deleteCollection(projectTasksRef);
    await projectRef.delete();
    const message = {
      success: true,
      description: "Project was deleted",
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

async function deleteStorageProjectIcon(filename: string) {
  if (filename) {
    const projectIconFile = storage.file(`private/projects/icons/${filename}`);

    if (projectIconFile) {
      await projectIconFile.delete();
    }
  }
}

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

export default deleteProject;
