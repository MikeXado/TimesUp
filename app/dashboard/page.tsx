import React from "react";
import ProjectsOverview from "./components/projects-overview";

import ProjectsProgress from "./components/projects-progress";
import QuickEvents from "./components/calendar-overview";
import { ProjectType } from "@/types";
import { cookies } from "next/headers";
import { getUser } from "@/viewmodels/firebase/auth";
import getProjects from "@/viewmodels/firebase/db/get-projects";

interface ProjectTypeWithId extends ProjectType {
  id: string;
  completed_tasks: number;
  total_tasks: number;
}

async function Dashboard() {
  const cookiesStore = cookies();
  const tkn = cookiesStore.get("session-token")?.value;
  const data = await getUser(tkn!);

  const projects = await getProjects(data.uid);

  const groupedByStatusProjects: { [status: string]: ProjectTypeWithId[] } =
    projects.reduce((result, project) => {
      const { status } = project;
      if (!result[status]) {
        result[status] = [];
      }

      result[status].push(project);

      return result;
    }, {} as { [status: string]: ProjectTypeWithId[] });

  return (
    <div className="mt-5 items-start justify-center gap-6 grid grid-cols-2">
      <div className="col-span-12 ">
        <ProjectsOverview
          projects={projects}
          uid={data.uid}
          projectsLength={projects.length}
          groupedProjects={groupedByStatusProjects}
        />
      </div>
      <div
        className={
          "" +
          (projects.length === 0 ? "col-span-12" : " xl:col-span-8 col-span-12")
        }
      >
        <QuickEvents uid={data.uid} />
      </div>
      {projects.length !== 0 && (
        <div className="xl:col-span-4 col-span-12 ">
          <ProjectsProgress groupedProjects={groupedByStatusProjects} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
