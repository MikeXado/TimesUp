export const getTaskByStatus = (tasks, status) => {
  return tasks?.filter((task) => task.status === status);
};
