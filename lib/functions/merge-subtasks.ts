import { SubtaskType } from "@/types";

interface SubtaskTypeWithId extends SubtaskType {
  id?: string;
}

const mergeSubtasks = (
  data: SubtaskTypeWithId[],
  subtasks: SubtaskTypeWithId[]
) => {
  const updatedSubtasks = [...subtasks!];

  // Merge localSubtasks and fetched subtasks based on unique identifiers (e.g., subtaskId)
  data.forEach((fetchedSubtask) => {
    const existingIndex = updatedSubtasks.findIndex(
      (localSubtask) => localSubtask.id === fetchedSubtask.id
    );

    if (existingIndex !== -1) {
      // If the fetched subtask exists in localSubtasks, update it
      updatedSubtasks[existingIndex] = fetchedSubtask;
    } else {
      // If the fetched subtask doesn't exist in localSubtasks, add it
      updatedSubtasks.push(fetchedSubtask);
    }
  });

  return updatedSubtasks;
};

export default mergeSubtasks;
