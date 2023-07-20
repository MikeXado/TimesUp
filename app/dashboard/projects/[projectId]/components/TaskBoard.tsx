"use client";
import React from "react";
import TaskBlock from "./task-board/task-block";
import { TaskType } from "@/types";
interface TaskTypeWithId extends TaskType {
  id: string;
  completedTasks?: number;
  tasks?: number;
}

function TaskBoard({ projectId, uid }: { projectId: string; uid: string }) {
  return (
    <div className="grid xl:grid-cols-3 grid-cols-1 items-start justify-center sm:min-h-screen   gap-5 mt-5 w-full">
      <TaskBlock projectId={projectId} uid={uid} title="To Do" value="todo" />
      <TaskBlock
        projectId={projectId}
        uid={uid}
        title="In Progress"
        value="inprogress"
      />
      <TaskBlock projectId={projectId} uid={uid} title="Done" value="done" />
    </div>
  );
}

export default TaskBoard;
