import { Inter } from "@next/font/google";
import { useCallback, useMemo, useState } from "react";
const More = dynamic(() => import("./dropdowns/More"));
const PreviewTask = dynamic(() => import("./PreviewTask"));
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import dynamic from "next/dynamic";
import { KanbanTaskType } from "../../../../../../types";

const Progress = dynamic(() => import("./Progress"));
const inter = Inter({
  display: "swap",
});

export default function Task({ task }: { task?: KanbanTaskType }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick: () => void = useCallback(() => {
    setIsOpen((prev: boolean) => !prev);
  }, []) as () => void;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task?.id || "",
      data: {
        task: task,
      },
    });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

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
            {task?.title}
          </div>
          <div className={"text-md text-[#cbcdd7] " + inter.className}>
            {task?.description}
          </div>
          <Progress task={memoTasks} />
        </div>
      </li>
      {isOpen && <PreviewTask task={memoTasks} handleClick={handleClick} />}
    </>
  );
}
