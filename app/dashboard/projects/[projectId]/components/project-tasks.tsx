"use client";

import getProject from "@/lib/functions/get-project-by-id-fetch";
import { ProjectType } from "@/types";
import { Plus } from "lucide-react";
import React from "react";
import useSWR from "swr";
import TaskBoard from "./TaskBoard";
import dynamic from "next/dynamic";
const AddTaskSheet = dynamic(
  () => import("@/app/dashboard/components/project/add-task-sheet")
);

interface ProjectTypeWithId extends ProjectType {
  id: string;
}

function ProjectTasks({
  project,

  id,
}: {
  project: ProjectTypeWithId;

  id: string;
}) {
  const { data } = useSWR("/api/v1/project/get", (url) => getProject(url, id), {
    fallbackData: project,
    revalidateOnMount: true,
  });

  return (
    <div className="mt-10">
      <div className="sm:flex sm:items-center sm:justify-between w-full">
        <h3 className="font-bold text-3xl">{data?.title}</h3>

        <AddTaskSheet
          id={id}
          trigger={
            <div className="flex items-center sm:mt-0 mt-5 rounded-xl space-x-2 px-2 py-2 bg-green-200 text-green-800 text-md font-bold transition-all duration-300 ease-in-out hover:bg-green-300 ">
              <Plus />
              <span>Create task</span>
            </div>
          }
        />
      </div>

      <TaskBoard projectId={id} />
    </div>
  );
}

export default ProjectTasks;
