"use client";
import { TaskType } from "@/types";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import TaskDetailSheet from "./task-sheet";
import { getTasksFetcher } from "@/lib/functions/get-tasks";
import useSWR from "swr";
interface TaskTypeWithId extends TaskType {
  id: string;
}

function TaskBlock({
  title,

  projectId,
  value,
}: {
  title: string;

  projectId: string;
  value: string;
}) {
  const { data: tasks, mutate } = useSWR<TaskTypeWithId[]>(
    `/api/v1/project/tasks/get?status=${value}`,
    () => getTasksFetcher(projectId, null, value),
    {
      revalidateOnFocus: false,
    }
  );
  const [isLoading, setIsLoading] = useState(false);
  const handleLoadMore = async () => {
    if (tasks) {
      setIsLoading(true);
      const lastTask = tasks[tasks.length - 1];

      const newTasks = await getTasksFetcher(
        projectId,
        lastTask._createdAt,
        value
      );

      mutate((prevData: TaskTypeWithId[] | undefined) => {
        if (prevData) {
          return [...prevData, ...newTasks];
        }
        return newTasks;
      }, false); // Set revalidate to false to prevent an immediate revalidation
    }
    setIsLoading(false);
  };
  return (
    <div className={"p-5 m-2 bg-[#f7f7f7] rounded-xl max-h-full "}>
      <div className="flex items-center space-x-1">
        <h2 className=" font-bold text-lg">{title}</h2>
        <span className="text-lg text-muted-foreground fomt-semibold">
          {tasks?.length}
        </span>
      </div>

      <ul className="xl:grid-cols-none gap-5 grid mt-5 sm:grid-cols-project_fluid_card grid-cols-1 ">
        {tasks?.map((task) => (
          <TaskDetailSheet projectId={projectId} key={task.id} task={task} />
        ))}
      </ul>

      {tasks && tasks.length >= 5 && (
        <Button
          disabled={isLoading}
          onClick={handleLoadMore}
          className={cn("w-full mt-10")}
        >
          {isLoading ? "Loading..." : "Load More"}
        </Button>
      )}
    </div>
  );
}

export default TaskBlock;
