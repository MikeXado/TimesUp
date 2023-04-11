"use client";
import {
  DndContext,
  closestCenter,
  DragOverlay,
  useSensor,
  useSensors,
  defaultDropAnimation,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import { snapCenterToCursor } from "@dnd-kit/modifiers";
import { arrayMove } from "@dnd-kit/sortable";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
const Column = dynamic(() => import("./Columns"));
const Task = dynamic(() => import("./Task"));
import useSWR from "swr";
import {
  findBoardSectionContainer,
  initializeBoard,
} from "../../../../../../utils/board";
const AddNewColumn = dynamic(() => import("./columns/AddNewColumn"));
import { Spinner } from "flowbite-react";
import { useMutation } from "../../../../../../utils/fetcher";
import { UserContext } from "../../../../contexts/UserProvider";
import dynamic from "next/dynamic";
import { KanbanColumnsType, KanbanTaskType } from "../../../../../../types";

interface KanbanBoardType {
  tasks: KanbanTaskType[];
  boardId: string;
  initColumns: KanbanColumnsType[];
}

export default function Board({
  tasks,
  boardId,
  initColumns,
}: KanbanBoardType) {
  const uid = useContext(UserContext);
  const scrollDiv = useRef<HTMLDivElement>(null);
  const tasksFetcher = async (): Promise<KanbanTaskType[]> => {
    const res = await fetch(`/api/v1/${uid}/kanban/${boardId}/tasks`, {
      method: "GET",
    });
    const tasks = await res.json();
    return tasks;
  };

  const columnsFetcher = async (): Promise<KanbanColumnsType[]> => {
    const res = await fetch(`/api/v1/${uid}/kanban/${boardId}/columns`, {
      method: "GET",
    });

    const columns = await res.json();
    return columns;
  };

  const { data, isLoading: tasksLoading } = useSWR<KanbanTaskType[], boolean>(
    `/api/v1/${uid}/kanban/${boardId}/tasks`,
    tasksFetcher,
    {
      fallbackData: tasks,
      revalidateOnMount: true,
    }
  );

  const { data: columnsData, isLoading: columnsLoading } = useSWR<
    KanbanColumnsType[],
    boolean
  >(`/api/v1/${uid}/kanban/${boardId}/columns`, columnsFetcher, {
    fallbackData: initColumns,
    revalidateOnMount: true,
  });

  const [boardSections, setBoardSections] = useState({});

  let newColumns = useMemo(() => {
    let newColumns = {};
    columnsData.forEach((el) => {
      newColumns[el.column] = el.column;
    });
    return newColumns;
  }, [columnsData]);

  useEffect(() => {
    const initialBoardSections = initializeBoard(data, newColumns);
    setBoardSections(initialBoardSections);
  }, [data, newColumns]);

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

    const task = data.current?.task;
    await fetch(`/api/v1/${uid}/kanban/${boardId}/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        boardId: task.boardId,
        description: task.description,
        id: task.id,
        status: overId,
        title: task.title,
        uid: uid,
      }),
    });
  };

  async function handleDragEnd(event: { active: any; over: any }) {
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
      (task: KanbanTaskType) => task.id === id
    );
    const overIndex = boardSections[overContainer].findIndex(
      (task: KanbanTaskType) => task.id === overId
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

  if (tasksLoading) {
    return (
      <div className="flex w-full justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (columnsLoading) {
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
      modifiers={[snapCenterToCursor]}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className="overflow-y-hidden overflow-x-auto mb-2">
        <div
          className={`pl-2 mb-2 flex-1 flex xl:h-[800px] lg:h-[730px] h-screen`}
          style={{
            width: window && window.innerWidth < 768 ? `${300 + columnsData?.length * 300}px` : `${400 + columnsData?.length * 400}px`,
            
          }}
        >
          {Object.keys(boardSections).map((column) => {
            return (
              <Column
                key={column}
                tasks={boardSections[column]}
                column={column}
                boardId={boardId}
              />
            );
          })}

          <AddNewColumn boardId={boardId} columnsData={columnsData} />

          <span ref={scrollDiv}></span>
        </div>
      </div>
      {/*  */}
      <DragOverlay>{activeId ? <Task task={task} /> : null}</DragOverlay>
    </DndContext>
  );
}
