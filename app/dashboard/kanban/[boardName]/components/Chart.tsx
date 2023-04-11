"use client";

import { useContext } from "react";
import { UserContext } from "../../../contexts/UserProvider";
import TasksProgress from "./progress/TasksProgress";
import useSWR from "swr";
import { KanbanTaskType } from "../../../../../types";
import { Spinner } from "flowbite-react";
export default function Chart({ selectedBoard }) {
  const uid = useContext(UserContext);
  const getTasks = async () => {
    const res = await fetch(`/api/v1/${uid}/kanban/${selectedBoard}/tasks`, {
      method: "GET",
    });
    const tasks = await res.json();
    return tasks;
  };

  const { data: tasks, isLoading } = useSWR<KanbanTaskType[]>(
    `/api/v1/${uid}/kanban/${selectedBoard}/tasks`,
    getTasks
  );

  const groupedTasks = tasks?.reduce((group, task) => {
    const { status } = task;
    if (!group[status]) {
      group[status] = group[status] ?? [];
    }
    group[status].push(task);
    return group;
  }, {});

  console.log(groupedTasks)

  const chartData = {
    labels:groupedTasks && Object.keys(groupedTasks), 
    datasets: [
      {
        label: "tasks",
        data:
          // groupedTasks &&
          // Object.keys(groupedTasks).map((el) => {
          //   let statusTasksLenth = groupedTasks[el].length;
          //   console.log(statusTasksLenth)
          //   return statusTasksLenth;
          groupedTasks &&  Object.values(groupedTasks).map((tasks: KanbanTaskType[]) => tasks.length),
         
      
        backgroundColor: [
          "rgba(63, 49, 216, 0.2)"
         
     
        ],
        
      },
    ],
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-start w-full py-10">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center w-full">
      {tasks?.length === 0 ? (
        <div className="flex justify-center text-white text-lg font-semibold">
          No tasks yet
        </div>
      ) : (
        <TasksProgress chartData={chartData} />
      )}
    </div>
  );
}
