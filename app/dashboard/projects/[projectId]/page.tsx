import { getUser } from "@/viewmodels/firebase/auth";
import getProjectById from "@/viewmodels/firebase/db/get-project-by-id";
import { cookies } from "next/headers";
import React from "react";
import ProjectTasks from "./components/project-tasks";

async function Project({ params }: { params: { projectId: string } }) {
  const cookiesStore = cookies();
  const tkn = cookiesStore.get("session-token")?.value;
  const data = await getUser(tkn!);

  const project = await getProjectById(data.uid, params.projectId);
  return (
    <ProjectTasks project={project} id={params.projectId} uid={data.uid} />
  );
}

export default Project;
