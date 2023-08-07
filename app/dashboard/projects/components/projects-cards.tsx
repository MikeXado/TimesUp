"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ProjectType } from "@/types";
import React from "react";
import useSWR from "swr";
import ProjectContext from "./project-context-menu";
import fetcher from "@/lib/functions/fetcher";

interface ProjectTypeWithId extends ProjectType {
  id: string;
  completed_tasks: number;
  total_tasks: number;
}

function ProjectsCards({ projects }: { projects: ProjectTypeWithId[] }) {
  const { data } = useSWR<ProjectTypeWithId[]>("/api/v1/projects", fetcher, {
    fallbackData: projects,
    revalidateOnMount: true,
  });

  const groupedByStatusProjects: { [status: string]: ProjectTypeWithId[] } =
    data?.reduce((result, project) => {
      const { status } = project;
      if (!result[status]) {
        result[status] = [];
      }

      result[status].push(project);

      return result;
    }, {} as { [status: string]: ProjectTypeWithId[] }) || {};

  return (
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
      <div className="min-h-screen max-h-full">
        {data?.length === 0 ? (
          <div className="flex justify-center items-center w-full my-20">
            No projets yet
          </div>
        ) : (
          Object.keys(groupedByStatusProjects).map((type) => {
            return (
              <TabsContent key={type} value={type}>
                <ul className="grid sm:grid-cols-project_fluid_card  grid-cols-1 sm:justify-items-center  w-full gap-y-10 sm:gap-x-5 ">
                  {groupedByStatusProjects[type].map((project) => {
                    return (
                      <ProjectContext key={project.id} project={project} />
                    );
                  })}
                </ul>
              </TabsContent>
            );
          })
        )}
      </div>
    </Tabs>
  );
}

export default ProjectsCards;
