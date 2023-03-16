import { KanbanTaskType } from "../types";

export const getTaskByStatus = (tasks: KanbanTaskType[], status: string) => {
  return tasks?.filter((task) => task.status === status);
};
