"use client";
import React, { useState } from "react";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

interface TaskTypeWithId extends TaskType {
  id: string;
}
import EditTaskDialog from "@/app/dashboard/components/project/edit-task-dialog";
import { TaskType } from "@/types";
import { cn } from "@/lib/utils";
import deleteTask from "@/lib/functions/delete-task-fetch";
function TaskContextMenu({
  trigger,
  uid,
  projectId,
  task,
}: {
  trigger: React.ReactNode;
  uid: string;
  projectId: string;
  task: TaskTypeWithId;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <ContextMenu>
      <ContextMenuTrigger>{trigger}</ContextMenuTrigger>
      <ContextMenuContent>
        <EditTaskDialog
          uid={uid}
          projectId={projectId}
          taskId={task.id}
          task={task}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          trigger={
            <ContextMenuItem
              onClick={(e) => {
                e.preventDefault();
                setIsOpen((prev) => !prev);
              }}
            >
              Edit
            </ContextMenuItem>
          }
        />
        <ContextMenuItem
          disabled={isLoading}
          onClick={(e) => {
            e.preventDefault();
            setIsLoading(true);
            deleteTask(uid, projectId, task.id, task.status);
            setIsLoading(false);
          }}
          className={cn("cursor-pointer focus:bg-red-500 focus:text-white")}
        >
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export default TaskContextMenu;
