import { db, storage } from "@/models/firebase-admin";
import { ProjectType } from "@/types";
interface ProjectTypeWithId extends ProjectType {
  id: string;
}

const getProjectById = async (uid: string, id: string) => {
  try {
    const colRef = await db
      .collection("private")
      .doc(uid)
      .collection("projects")
      .doc(id)
      .get();
    const projectData = colRef.data();
    const expires = new Date();
    expires.setDate(expires.getDate() + 1);
    let projectIconUrl;
    if (projectData?.icon) {
      const projectIconPath = `private/projects/icons/${projectData.icon}`;
      const projectIconRef = storage.file(projectIconPath);
      const response = await projectIconRef.getSignedUrl({
        action: "read",
        expires: expires.getTime(),
      });
      projectIconUrl = response[0];
    }

    const taskRef = db
      .collection("private")
      .doc(uid)
      .collection("projects")
      .doc(id)
      .collection("tasks");

    const tasksSnapshot = await taskRef.get();
    const completedTasks = tasksSnapshot.docs.filter(
      (taskdoc) => taskdoc.data().status === "done"
    );
    const completedTasksCount = completedTasks.length;
    const totalTasks = tasksSnapshot.docs.length;

    const project: ProjectTypeWithId = {
      id: id,
      start: projectData?.start,
      end: projectData?.end ? projectData.end : undefined,
      status: projectData?.status,
      description: projectData?.description,
      title: projectData?.title,
      type: projectData?.type,
      icon: projectIconUrl ? projectIconUrl : undefined,
      completed_tasks: completedTasksCount,
      total_tasks: totalTasks,
    };

    return project;
  } catch (err: any) {
    throw new Error(err);
  }
};

export default getProjectById;
