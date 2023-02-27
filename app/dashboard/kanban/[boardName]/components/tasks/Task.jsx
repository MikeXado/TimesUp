import { Inter } from "@next/font/google";
import { Spinner } from "flowbite-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
  memo,
} from "react";
import More from "./dropdowns/More";
import PreviewTask from "./PreviewTask";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDraggable } from "@dnd-kit/core";
import useSWR, { mutate } from "swr";
const inter = Inter({
  display: "swap",
});

export default function Task({ task }) {
  const [progress, setProgress] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  const getSubtasks = async () => {
    const data = await fetch(`/api/getSubtasks/subtasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        boardId: task.boardId,
        uid: task.uid,
        taskId: task.id,
      }),
    });
    const subtasks = await data.json();
    return subtasks;
  };

  const { data: subtasks } = useSWR(
    `/api/getSubtasks/subtasks/${task.id}`,
    getSubtasks
  );

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
      data: {
        task: task,
      },
    });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  useEffect(() => {
    if (!subtasks) {
      return;
    }
    let doneSubtasks = subtasks?.filter((subtask) => {
      return subtask.done === true;
    });
    let doneSubtasksLength = doneSubtasks?.length;
    let allSubtasksLength = subtasks?.length;
    let newProgress = Math.floor(
      (doneSubtasksLength * 100) / allSubtasksLength
    );
    setProgress(newProgress);
  }, [subtasks]);

  const memoTasks = useMemo(() => task, [task]);

  return (
    <>
      <li
        className="py-3 sm:py-4 mb-5 list-none w-full bg-[#192555] shadow-xl rounded-lg px-3"
        style={style}
        ref={setNodeRef}
        {...listeners}
        {...attributes}
      >
        <More task={memoTasks} />
        <div onClick={handleClick}>
          <div
            className={
              "font-semibold mb-2 text-white cursor-pointer text-lg " +
              inter.className
            }
          >
            {" "}
            {task.title}
          </div>
          <div className={"text-md text-[#cbcdd7] " + inter.className}>
            {task.description}
          </div>
          <div>
            <div className="flex w-full justify-end mb-1">
              <span className="text-sm font-medium text-[#6e6ae4] dark:text-white">
                {isNaN(progress) ? 0 : progress}%
              </span>
            </div>
            <div className="w-full  rounded-full h-2.5 bg-[#051139]">
              <div
                className="bg-gradient-to-l from-purple-600 via-indigo-700 to-indigo-800 h-2.5 rounded-full"
                style={{ width: progress + "%" }}
              ></div>
            </div>
          </div>
        </div>
      </li>
      {isOpen && <PreviewTask task={memoTasks} handleClick={handleClick} />}
    </>
  );
}
