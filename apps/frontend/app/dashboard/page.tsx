import React from "react";
import ProjectsOverview from "./components/projects-overview";

import ProjectsProgress from "./components/projects-progress";
import QuickEvents from "./components/calendar-overview";
import { cookies } from "next/headers";
import { getUser } from "@/viewmodels/firebase/auth";
import getProjects from "@/viewmodels/firebase/db/get-projects";

async function Dashboard() {
  const cookiesStore = cookies();
  const tkn = cookiesStore.get("session-token")?.value;
  const data = await getUser(tkn!);

  const projects = await getProjects(data.uid);

  return (
    <div className="mt-5 items-start justify-center gap-6 grid grid-cols-2">
      <div className="col-span-12 ">
        <ProjectsOverview
          projects={projects}
          projectsLength={projects.length}
        />
      </div>
      <div
        className={
          "" +
          (projects.length === 0 ? "col-span-12" : " xl:col-span-8 col-span-12")
        }
      >
        <QuickEvents />
      </div>
      {projects.length !== 0 && (
        <div className="xl:col-span-4 col-span-12 ">
          <ProjectsProgress projects={projects} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
