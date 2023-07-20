import { db } from "@/models/firebase-admin";
import { ProjectType } from "@/types";

type FormType = {
  title: string;
  description: string;
  type: string;
  start: Date;
  end?: Date;
  status: string;
};

const editProject = async (
  uid: string,
  projectId: string,
  form: FormType,
  icon: string
) => {
  try {
    const projectRef = db
      .collection("private")
      .doc(uid)
      .collection("projects")
      .doc(projectId);
    await projectRef.set(form);

    if (icon) {
      await projectRef.update({
        icon: icon,
      });
    }
    const message = {
      success: true,
      message: "Project was successfully edited",
    };
    return message;
  } catch (err) {
    console.log(err);
    const message = {
      success: false,
      message: "Something went wrong during the project editing proccess",
    };
    return message;
  }
};

export default editProject;
