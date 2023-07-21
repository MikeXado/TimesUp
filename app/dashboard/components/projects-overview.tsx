"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectsOverviewTable from "./project-overview-table/table";
import { ProjectType } from "@/types";
import ProjectsCards from "../projects/components/projects-cards";
import { compareAsc, parseISO } from "date-fns";
import ProjectContext from "../projects/components/project-context-menu";
import { useRouter } from "next/navigation";

interface ProjectTypeWithId extends ProjectType {
  id: string;
}

function ProjectsOverview({
  projectsLength,
  groupedProjects,

  projects,
}: {
  projectsLength: number;
  groupedProjects: { [status: string]: ProjectTypeWithId[] };

  projects: ProjectTypeWithId[];
}) {
  const router = useRouter();

  const handleViewAll = () => {
    router.push("/dashboard/projects");
  };
  return (
    <div className="border border-gray-300 rounded-xl p-3">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold ">Project summary</h2>
        <Button
          onClick={handleViewAll}
          variant="secondary"
          className={cn(
            "bg-green-50 sm:mt-0 mt-5 text-green-700 fond-bold  hover:bg-[#e6f5dd] transition-all"
          )}
        >
          View All
        </Button>
      </div>

      <Tabs defaultValue="proposed" className={cn("w-full mt-5")}>
        <TabsList
          className={cn(
            "bg-transparent border-b-2 border-gray-200 rounded-none w-full justify-start"
          )}
        >
          <TabsTrigger
            className={cn(
              " font-semibold border-green-500 rounded-none duration-75 data-[state=active]:bg-none data-[state=active]:border-b-2 py-2.5 data-[state=active]:text-green-500 data-[state=active]:shadow-none hover:border-b-2 hover:text-green-500"
            )}
            value="proposed"
          >
            Proposed
          </TabsTrigger>
          <TabsTrigger
            className={cn(
              " font-semibold border-green-500 rounded-none duration-75 data-[state=active]:bg-none data-[state=active]:border-b-2 py-2.5 data-[state=active]:text-green-500 data-[state=active]:shadow-none hover:border-b-2 hover:text-green-500"
            )}
            value="on-going"
          >
            On Going
          </TabsTrigger>
          <TabsTrigger
            className={cn(
              " font-semibold border-green-500 rounded-none duration-75 data-[state=active]:bg-none data-[state=active]:border-b-2 py-2.5 data-[state=active]:text-green-500 data-[state=active]:shadow-none hover:border-b-2 hover:text-green-500"
            )}
            value="finished"
          >
            Finished
          </TabsTrigger>
        </TabsList>
        {projectsLength === 0 ? (
          <div className="flex justify-center items-center w-full my-20">
            No projets yet
          </div>
        ) : (
          Object.keys(groupedProjects).map((type) => {
            return (
              <TabsContent key={type} value={type}>
                <ProjectsOverviewTable
                  projects={groupedProjects[type].slice(0, 5)}
                />

                <ul className="lg:hidden grid sm:grid-cols-project_fluid_card  grid-cols-1 sm:justify-items-center  w-full gap-y-10 sm:gap-x-5 ">
                  {groupedProjects[type].slice(0, 5).map((project) => {
                    return (
                      <ProjectContext key={project.id} project={project} />
                    );
                  })}
                </ul>
              </TabsContent>
            );
          })
        )}
      </Tabs>
    </div>
  );
}

export default ProjectsOverview;
