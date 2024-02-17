import { TaskType } from "@/types";
import { format, parseISO } from "date-fns";
import { Calendar, CheckCheck } from "lucide-react";
import React from "react";

interface TaskTypeWithId extends TaskType {
  id: string;
  completedTasks?: number;
  tasks?: number;
}

function TaskCard({ task }: { task: TaskTypeWithId }) {
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-md">{task.title}</h3>
      </div>
      <p className="text-gray-500 text-left truncate mt-5">
        {task.description}
      </p>
      <div className="mt-5 grid sm:grid-cols-task_fluid_labels grid-cols-1  gap-2">
        {task.labels.map((label, index) => {
          return (
            <span
              key={index}
              className="bg-gray-200 font-bold justify-center flex w-full  text-sm text-gray-500 rounded-xl py-[5px]"
            >
              {label}
            </span>
          );
        })}

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

      <div className="text-sm mt-10 text-gray-500 flex items-center space-x-5">
        <div className="flex items-center space-x-1">
          <Calendar size={20} />
          <span>{format(parseISO(task._createdAt), "dd/MM/yyyy")}</span>
        </div>
        <div className="flex items-center space-x-1">
          <CheckCheck />
          <span>
            {task.completedTasks}/{task.tasks}
          </span>
        </div>
      </div>
    </>
  );
}

export default TaskCard;
