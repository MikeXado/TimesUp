import { db } from "@/models/firebase-admin";
import { ProjectType } from "@/types";

const addProject = async (uid: string, data: ProjectType) => {
  try {
    const colRef = db.collection("private").doc(uid).collection("projects");
    await colRef.add(data);
    const message = {
      success: true,
      message: "Project was created successfully",
    };
    return message;
  } catch (err) {
    const message = {
      success: false,
      message:
        "Something went wrong during saving project proccess. Try again later",
    };
    return message;
  }
};

export { addProject };
