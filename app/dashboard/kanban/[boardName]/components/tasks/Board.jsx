"use client";
import {
  DndContext,
  closestCenter,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  defaultDropAnimation,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Column from "./Columns";
import Task from "./Task";
import useSWR, { mutate } from "swr";
import {
  findBoardSectionContainer,
  initializeBoard,
} from "../../../../../../utils/board";
import AddNewColumn from "./columns/AddNewColumn";
import { Spinner } from "flowbite-react";
import { revalidate } from "../../../../../Providers";
import { useMutation } from "../../../../../../utils/fetcher";
// import { tasksFetcher } from "../../../../../../utils/swr/kanbanTasks";

export default function Board({ uid, tasks, boardId, initColumns }) {
  const editTask = useMutation("/api/editTask");
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

  const hasMounted = useRef(false);
  useEffect(() => {
    hasMounted.current = true;
    mutate();
  }, []);

  const { data, isLoading } = useSWR("/api/getTasks", tasksFetcher, {
    fallbackData: tasks,
    revalidateOnMount: true,
  });

  const { data: columnsData } = useSWR("/api/getColumns", columnsFetcher, {
    fallbackData: initColumns,
    revalidateOnMount: true,
  });

  const [boardSections, setBoardSections] = useState({});

  let newColumns = {};
  columnsData.forEach((el) => {
    newColumns[el.column] = el.column;
  });

  useEffect(() => {
    let newColumns = {};
    columnsData.forEach((el) => {
      newColumns[el.column] = el.column;
    });
    const initialBoardSections = initializeBoard(data, newColumns);
    setBoardSections(initialBoardSections);
  }, [data, columnsData]);

  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 300,
        tolerance: 5,
      },
    }),

    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 300,
        tolerance: 5,
      },
    })
  );
  const handleDragStart = ({ active }) => {
    setActiveId(active.id);
  };

  const handleDragOver = async ({ active, over }) => {
    const { id, data } = active;
    const { id: overId } = over;

    const activeContainer = findBoardSectionContainer(boardSections, id);
    const overContainer = findBoardSectionContainer(boardSections, overId);
    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setBoardSections((boardSection) => {
      const activeItems = boardSection[activeContainer];
      const overItems = boardSection[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.findIndex((item) => item.id === id);
      const overIndex = overItems.findIndex((item) => item.id !== overId);
      const task = data.current?.task;

      return {
        ...boardSection,
        [activeContainer]: [
          ...boardSection[activeContainer].filter((item) => item.id !== id),
        ],
        [overContainer]: [
          ...boardSection[overContainer].slice(0, overIndex),
          boardSections[activeContainer][activeIndex],
          ...boardSection[overContainer].slice(
            overIndex,
            boardSection[overContainer].length
          ),
        ],
      };
    });

    // return await fetch("/api/editTask", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     boardId: task.boardId,
    //     description: task.description,
    //     id: task.id,
    //     status: overId,
    //     title: task.title,
    //     uid: uid,
    //   }),
    // });
    await editTask({
      boardId: task.boardId,
      description: task.description,
      id: task.id,
      status: overId,
      title: task.title,
      uid: uid,
    });
  };

  async function handleDragEnd(event) {
    const { active, over } = event;
    const { id, data } = active;
    const { id: overId } = over;

    const activeContainer = findBoardSectionContainer(boardSections, id);
    const overContainer = findBoardSectionContainer(boardSections, overId);
    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = boardSections[activeContainer].findIndex(
      (task) => task.id === id
    );
    const overIndex = boardSections[overContainer].findIndex(
      (task) => task.id === overId
    );

    if (activeIndex !== overIndex) {
      setBoardSections((boardSection) => ({
        ...boardSection,
        [overContainer]: arrayMove(
          boardSection[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }
  }

  const dropAnimation = {
    ...defaultDropAnimation,
  };

  const task = tasks.find((el) => el.id === activeId);

  if (!data) {
    return (
      <div className="flex w-full justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (!columnsData) {
    return (
      <div className="flex w-full justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <DndContext
      id="kanban"
      collisionDetection={closestCenter}
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className="overflow-y-hidden  overflow-x-scroll">
        <div className="h-screen pl-2 flex-1 flex flex-nowrap lg:w-[2500px] w-[1920px]">
          {Object.keys(boardSections).map((column) => {
            return (
              <Column
                key={column}
                id={uid}
                tasks={boardSections[column]}
                column={column}
                isLoading={isLoading}
                boardId={boardId}
              />
            );
          })}
          <AddNewColumn uid={uid} boardId={boardId} />
        </div>
      </div>
      {/*  */}
      <DragOverlay dropAnimation={dropAnimation}>
        {activeId ? (
          <Task uid={uid} boardId={boardId} taskId={activeId} task={task} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
