import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { getUser } from "@/viewmodels/firebase/auth";
import { Plus } from "lucide-react";
import { cookies } from "next/headers";
import React from "react";
import ProjectsCards from "./components/projects-cards";
import getProjects from "@/viewmodels/firebase/db/get-projects";
import dynamic from "next/dynamic";

const AddProjectDialog = dynamic(
  () => import("@/app/dashboard/components/project/add-project-dialog")
);

async function Projects() {
  const cookiesStore = cookies();
  const tkn = cookiesStore.get("session-token")?.value;
  const data = await getUser(tkn!);
  const projects = await getProjects(data.uid);
  return (
    <div className="mt-5">
      <div className="sm:flex sm:items-center sm:justify-between sm:px-2">
        <h2 className="font-bold text-3xl">Projects</h2>
        <AddProjectDialog
          trigger={
            <DialogTrigger
              className={cn(
                "flex items-center space-x-2 sm:mt-0 mt-5 rounded-xl px-2 py-2 bg-green-200 text-green-800 text-md font-bold transition-all duration-300 ease-in-out hover:bg-green-300 "
              )}
            >
              <Plus /> <span>New project</span>
            </DialogTrigger>
          }
        />
      </div>
      <ProjectsCards projects={projects} />
    </div>
  );
}

export default Projects;
