import { toast } from "@/components/ui/use-toast";
import { CheckedState } from "@radix-ui/react-checkbox";
import { mutate } from "swr";

const updateSubtasksFetcher = async (
  checked: CheckedState,
  subtaskId: string,
  taskId: string,
  taskStatus: string,
  projectId: string
) => {
  const res = await fetch(
    `/api/v1/project/${projectId}/tasks/${taskId}/subtasks/${subtaskId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        done: checked,
      }),
    }
  );

  const data = await res.json();
  if (res.ok) {
    toast({
      title: "Success",
      description: data.message,
    });
    mutate(`/api/v1/project/${projectId}/tasks/${taskId}/subtasks`);
    mutate(`/api/v1/project/${projectId}/tasks?status=${taskStatus}`);
  } else {
    toast({
      title: "Failed",
      description: data.message,
    });
  }
};

export default updateSubtasksFetcher;
