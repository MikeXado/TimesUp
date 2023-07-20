import { toast } from "@/components/ui/use-toast";
import { SubtaskType } from "@/types";
import { CheckedState } from "@radix-ui/react-checkbox";
import { mutate } from "swr";

interface SubtaskTypeWithId extends SubtaskType {
  id: string;
}

const updateSubtasksFetcher = async (
  checked: CheckedState,
  subtaskId: string,
  taskId: string,
  taskStatus: string,
  projectId: string,
  uid: string
) => {
  const res = await fetch("/api/v1/project/tasks/subtasks/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uid,
      projectId,
      taskId: taskId,
      subtaskId,
      done: checked,
    }),
  });

  const data = await res.json();
  if (res.ok) {
    toast({
      title: "Success",
      description: data.message,
    });
    mutate("/api/v1/project/tasks/subtasks/get");
    mutate(`/api/v1/project/tasks/get?status=${taskStatus}`);
  } else {
    toast({
      title: "Failed",
      description: data.message,
    });
  }
};

export default updateSubtasksFetcher;
