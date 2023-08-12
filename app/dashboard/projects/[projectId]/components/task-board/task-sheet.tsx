import { SubtaskType, TaskType } from "@/types";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import TaskCard from "./task-card";
import TaskDropdown from "./task-dropdown";
import calculateDaysLeft, { cn } from "@/lib/utils";
import { Tags } from "lucide-react";
import { Progress } from "@/components/ui/progress";

import { parseISO } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import useSWR from "swr";
import TaskContextMenu from "./task-context-menu";
import updateSubtasksFetcher from "@/lib/functions/update-subtask-fetch";
import TaskPomodoro from "./task-pomodoro-settings";
import fetcher from "@/lib/functions/fetcher";
interface TaskTypeWithId extends TaskType {
  id: string;
  completedTasks?: number;
  tasks?: number;
}

interface SubtaskTypeWithId extends SubtaskType {
  id: string;
}
function TaskDetailSheet({
  task,
  projectId,
}: {
  task: TaskTypeWithId;
  projectId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: subtasks } = useSWR<SubtaskTypeWithId[]>(
    `/api/v1/project/${projectId}/tasks/${task.id}/subtasks`,
    fetcher
  );

  const progress =
    task.completedTasks && task.tasks
      ? Math.floor((task.completedTasks / task.tasks) * 100)
      : 0;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <TaskContextMenu
        projectId={projectId}
        task={task}
        trigger={
          <li
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setIsOpen((prev) => !prev);
            }}
            className="p-4 bg-white cursor-pointer  shadow rounded-xl"
          >
            <TaskCard task={task} />
          </li>
        }
      />
      <SheetContent
        className={cn("h-full md:min-w-[30%] min-w-full overflow-y-auto")}
      >
        <SheetHeader>
          <SheetTitle className={cn("flex items-center justify-between mt-10")}>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-3xl">{task.title}</span>
              <span
                className={`bg-gray-200 flex justify-center font-bold text-sm text-gray-500 rounded-xl py-[5px] px-5 ${
                  task.priority === "Low"
                    ? "bg-green-400 text-green-800"
                    : task.priority === "Medium"
                    ? "bg-orange-200 text-orange-500"
                    : "bg-red-200 text-red-500"
                }`}
              >
                {task.priority}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <TaskPomodoro
                taskId={task.id}
                title={task.title}
                projectId={projectId}
              />
              <TaskDropdown
                projectId={projectId}
                taskId={task.id}
                task={task}
              />
            </div>
          </SheetTitle>
        </SheetHeader>
        <div className="flex space-x-2 mt-10">
          <span className="text-gray-500">
            <Tags />
          </span>

          <ul className="grid grid-cols-5 gap-4 ">
            {task.labels.map((label, index) => {
              return (
                <li
                  className=" bg-gray-200 font-bold justify-center flex  text-sm text-gray-500 rounded-xl py-[5px] px-5"
                  key={index}
                >
                  {label}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 font-medium text-lg">
              <span>{progress}%</span>
              <span>complete</span>
            </div>
            <div>
              <span>
                {calculateDaysLeft(parseISO(task._updatedAt!)) === 0
                  ? "Today"
                  : calculateDaysLeft(parseISO(task._updatedAt!)) + "days left"}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Progress value={progress} className={cn("h-[10px] bg-gray-300")} />
          </div>
        </div>

        <div className="mt-10">
          <span className="font-bold text-lg">Subtasks</span>
          <ul className="mt-5 space-y-2">
            {subtasks?.map((subtask) => {
              return (
                <li
                  key={subtask.id}
                  className="flex items-center space-x-3 text-lg"
                >
                  <Checkbox
                    onCheckedChange={(checked) => {
                      updateSubtasksFetcher(
                        checked,
                        subtask.id,
                        task.id,
                        task.status,
                        projectId
                      );
                    }}
                    checked={subtask.done}
                    className={cn(
                      "h-6 w-6 rounded-lg border-gray-500 data-[state=checked]:bg-green-500 data-[state=checked]:text-white data-[state=checked]:font-bold"
                    )}
                  />
                  <span className="block">{subtask.title}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default TaskDetailSheet;
