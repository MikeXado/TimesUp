"use client";

import Task from "./Task";
import useSWR from "swr";
import AddNewTask from "../addTask/AddNewTask";
import { Spinner } from "flowbite-react";
import Droppable from "./dnd/Droppable";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import AddNewColumn from "./columns/AddNewColumn";
export default function Column({ boardId, id, tasks, status, isLoading }) {
  return (
    <div className="h-full w-[500px] mt-3 mr-2 px-4 overflow-y-auto rounded-lg pb-[200px]">
      <div className="flex justify-between items-center">
        <div className="font-semibold text-md pt-3 uppercase">
          {status}
          <span
            className={
              "inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-black  rounded-full bg-gray-200"
            }
          >
            {tasks?.length}
          </span>
        </div>

        <AddNewTask boardId={boardId} id={id} status={status} />
      </div>
      <div className={"w-full h-1 my-4 bg-gray-200"} />
      <SortableContext items={tasks?.map((el) => el.id)}>
        <Droppable dropableName={status}>
          {tasks?.map((task, index) => {
            return (
              <Task
                key={task.id}
                task={task}
                boardId={boardId}
                uid={id}
                index={index}
                taskId={task.id}
                status={status}
              />
            );
          })}
        </Droppable>
        {isLoading ? (
          <div className="flex mt-3 justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <></>
        )}
      </SortableContext>
    </div>
  );
}
