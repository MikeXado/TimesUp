"use client";

import { useContext, useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { UserContext } from "../../../contexts/UserProvider";
import Status from "./progress/Status";
import TasksProgress from "./progress/TasksProgress";

export default function Progress({ boardId, initTasks, initColumns }) {
  const uid = useContext(UserContext);
  const tasksFetcher = async () => {
    const res = await fetch("/api/getTasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid, boardId }),
    });
    const tasks = await res.json();
    return tasks;
  };

  const columnsFetcher = async () => {
    const res = await fetch("/api/getColumns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid, boardId }),
    });

    const columns = await res.json();
    return columns;
  };

  const { data } = useSWR("/api/getTasks", tasksFetcher, {
    fallbackData: initTasks,
    revalidateOnMount: true,
  });

  const { data: columnsData } = useSWR("/api/getColumns", columnsFetcher, {
    fallbackData: initColumns,
    revalidateOnMount: true,
  });

  const groupedTasks = data.reduce((group, task) => {
    const { status } = task;
    if (!group[status]) {
      group[status] = group[status] ?? [];
    }
    group[status].push(task);
    return group;
  }, {});

  const chartData = {
    labels: data.map((el) => el.status),
    datasets: [
      {
        label: "tasks",
        data: Object.keys(groupedTasks).map((el) => {
          let statusTasksLenth = groupedTasks[el].length;
          return statusTasksLenth;
        }),
        backgroundColor: [
          "#4dc9f6",
          "#f67019",
          "#f53794",
          "#537bc4",
          "#acc236",
          "#166a8f",
          "#00a950",
          "#58595b",
          "#8549ba",
        ],
      },
    ],
  };

  return (
    <div className="flex flex-col justify-center w-full">
      {data.length === 0 || columnsData === 0 ? (
        <div className="flex justify-center">No tasks yet</div>
      ) : (
        <>
          <TasksProgress chartData={chartData} dataLength={data.length} />

          <div className="xl:overflow-y-auto xl:max-h-[calc(100vh-330px)]  mt-3 grid grid-cols-2 gap-2 justify-center w-full">
            {columnsData.map((el) => {
              return (
                <Status
                  key={el.id}
                  column={el.column}
                  tasks={groupedTasks[el.column]?.length}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
