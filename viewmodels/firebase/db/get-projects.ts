import { db, storage } from "@/models/firebase-admin";
import { ProjectType } from "@/types";

interface ProjectTypeWithId extends ProjectType {
  id: string;
}

const getProjects = async (uid: string) => {
  try {
    const colRef = await db
      .collection("private")
      .doc(uid)
      .collection("projects")
      .orderBy("start", "desc")
      .get();

    const projectsPromises = colRef.docs.map(async (doc) => {
      const data = doc.data();
      const expires = new Date();
      expires.setDate(expires.getDate() + 1);
      let projectIconUrl;
      if (data.icon) {
        const projectIconPath = `private/projects/icons/${data.icon}`;
        const projectIconRef = storage.file(projectIconPath);

        const response = await projectIconRef.getSignedUrl({
          action: "read",
          expires: expires.getTime(),
        });
        projectIconUrl = response[0];
      }

      const tasksRef = db
        .collection("private")
        .doc(uid)
        .collection("projects")
        .doc(doc.id)
        .collection("tasks");
      const tasksSnapshot = await tasksRef.get();
      const completedTasks = tasksSnapshot.docs.filter(
        (taskdoc) => taskdoc.data().status === "done"
      );
      const completedTasksCount = completedTasks.length;
      const totalTasks = tasksSnapshot.docs.length;

      const project: ProjectTypeWithId = {
        id: doc.id,
        start: data.start,
        end: data.end ? data.end : undefined,
        status: data.status,
        title: data.title,
        type: data.type,
        description: data.description,
        icon: projectIconUrl ? projectIconUrl : undefined,
        completed_tasks: completedTasksCount,
        total_tasks: totalTasks,
      };
      return project;
    });
    const projects = await Promise.all(projectsPromises);

    return projects;
  } catch (err: any) {
    throw new Error(err);
  }
};

export default getProjects;
