import { KanbanTaskType } from "../types";

export const getTaskByStatus = (tasks: KanbanTaskType[], status: string) => {
  return tasks?.filter((task) => task.status === status);
};

const getTasksByBoard = (tasks: KanbanTaskType[], boardId: string) => {
  return tasks?.filter((task) => task.boardId === boardId);
};

export const initializeTasksByBoards = (boards, tasks: KanbanTaskType[]) => {
  let structuredTasks = {};
  Object.keys(boards).forEach((boardId) => {
    structuredTasks[boardId] = getTasksByBoard(tasks, boardId);
  });
  return structuredTasks;
};
