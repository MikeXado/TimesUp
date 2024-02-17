"use client";
import React from "react";
import TaskBlock from "./task-board/task-block";
import { TaskType } from "@/types";
interface TaskTypeWithId extends TaskType {
  id: string;
  completedTasks?: number;
  tasks?: number;
}

function TaskBoard({ projectId }: { projectId: string }) {
  return (
    <div className="grid xl:grid-cols-3 grid-cols-1 items-start justify-center sm:min-h-screen   gap-5 mt-5 w-full">
      <TaskBlock projectId={projectId} title="To Do" value="todo" />
      <TaskBlock projectId={projectId} title="In Progress" value="inprogress" />
      <TaskBlock projectId={projectId} title="Done" value="done" />
    </div>
  );
}

export default TaskBoard;
