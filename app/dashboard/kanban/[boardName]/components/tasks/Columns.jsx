"use client";

import Task from "./Task";
import useSWR from "swr";
import AddNewTask from "../addTask/AddNewTask";
import { Spinner } from "flowbite-react";
import Droppable from "./dnd/Droppable";
import { SortableContext } from "@dnd-kit/sortable";
export default function Column({ boardId, id, tasks, column, isLoading }) {
  return (
    <div className="h-full w-[500px] mt-3 mr-2 px-4 overflow-y-auto rounded-lg pb-[200px]">
      <div className="flex justify-between items-center">
        <div className="font-semibold text-md pt-3 uppercase">
          {column}
          <span
            className={
              "inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-black  rounded-full bg-gray-200"
            }
          >
            {tasks?.length}
          </span>
        </div>

        <AddNewTask boardId={boardId} uid={id} status={column} />
      </div>
      <div className={"w-full h-1 my-4 bg-gray-200"} />
      <SortableContext items={tasks?.map((el) => el.id)}>
        <Droppable dropableName={column}>
          {tasks?.map((task) => {
            return <Task key={task.id} task={task} />;
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
