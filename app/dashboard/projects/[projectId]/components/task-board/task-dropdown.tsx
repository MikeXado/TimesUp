"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { mutate } from "swr";
import { TaskType } from "@/types";
import dynamic from "next/dynamic";
import deleteTask from "@/lib/functions/delete-task-fetch";
const EditTaskDialog = dynamic(
  () => import("@/app/dashboard/components/project/edit-task-dialog")
);
interface TaskTypeWithId extends TaskType {
  id: string;
}

function TaskDropdown({
  projectId,
  taskId,
  task,
}: {
  projectId: string;
  taskId: string;
  task: TaskTypeWithId;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn("text-muted-foreground hover:text-black")}
      >
        <Edit />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Task</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <EditTaskDialog
          task={task}
          projectId={projectId}
          taskId={taskId}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          trigger={
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
                setIsOpen((prev) => !prev);
              }}
            >
              Edit
            </DropdownMenuItem>
          }
        />

        <DropdownMenuItem
          disabled={isLoading}
          onClick={(e) => {
            e.preventDefault();
            setIsLoading(true);
            deleteTask(projectId, taskId, task.status);
            setIsLoading(false);
          }}
          className={cn("cursor-pointer focus:bg-red-500 focus:text-white")}
        >
          {isLoading ? "Deleting..." : "Delete"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default TaskDropdown;
