"use client";
import React, { useState } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { cn } from "@/lib/utils";
import { ProjectType } from "@/types";
import dynamic from "next/dynamic";
import ProjectCard from "./projects-card";
import deleteProjectFetch from "@/lib/functions/delete-project-fetch";

const EditProjectSheet = dynamic(
  () => import("../../components/project/edit-project-sheet")
);

interface ProjectTypeWithId extends ProjectType {
  id: string;
  completed_tasks: number;
  total_tasks: number;
}

function ProjectContext({
  uid,
  project,
}: {
  uid: string;
  project: ProjectTypeWithId;
}) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ContextMenu>
      <ContextMenuTrigger className={cn("w-full")}>
        <ProjectCard project={project} />
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Project</ContextMenuLabel>
        <ContextMenuSeparator />
        <EditProjectSheet uid={uid} project={project} />
        <ContextMenuItem
          disabled={isLoading}
          onClick={(e) => {
            e.preventDefault();
            setIsLoading(true);
            deleteProjectFetch(uid, project.id);
            setIsLoading(false);
          }}
          className={cn("cursor-pointer focus:bg-red-500 focus:text-white")}
        >
          {isLoading ? "Deleting..." : "Delete"}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export default ProjectContext;
