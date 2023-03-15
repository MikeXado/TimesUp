"use client";
import Task from "./Task";
const AddNewTask = dynamic(() => import("../addTask/AddNewTask"));
import Droppable from "./dnd/Droppable";
import { SortableContext } from "@dnd-kit/sortable";
import dynamic from "next/dynamic";
import { KanbanColumnsType, KanbanTaskType } from "../../../../../../types";

interface ColumnTypeProps {
  boardId: string;
  tasks: KanbanTaskType[];
  column: string;
}
export default function Column({ boardId, tasks, column }: ColumnTypeProps) {
  return (
    <div className="h-full w-[400px] mt-3 mr-2 px-4 overflow-y-auto rounded-lg pb-[200px]">
      <div className="flex justify-between items-center">
        <div className="font-semibold text-md pt-3 uppercase text-white">
          {column}
          <span
            className={
              "inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-black  rounded-full bg-gray-200"
            }
          >
            {tasks?.length}
          </span>
        </div>

        <AddNewTask boardId={boardId} status={column} />
      </div>
      <div className={"w-full h-[1px] my-4 bg-gray-200"} />
      <SortableContext items={tasks}>
        <Droppable dropableName={column}>
          {tasks?.map((task) => {
            return <Task key={task.id} task={task} />;
          })}
        </Droppable>
      </SortableContext>
    </div>
  );
}
