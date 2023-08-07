import { toast } from "@/components/ui/use-toast";
import { mutate } from "swr";

const deleteTask = async (
  projectId: string,
  taskId: string,
  status: string
) => {
  const res = await fetch(`/api/v1/project/${projectId}/tasks/${taskId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    mutate(`/api/v1/project/${projectId}/tasks?status=${status}`, null, true);
    const data = await res.json();
    toast({
      title: "Success",
      description: data.message,
    });
  } else {
    const data = await res.json();
    toast({
      title: "Failed",
      description: data.message,
    });
  }
};

export default deleteTask;
