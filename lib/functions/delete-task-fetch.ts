import { toast } from "@/components/ui/use-toast";
import { mutate } from "swr";

const deleteTask = async (
  projectId: string,
  taskId: string,
  status: string
) => {
  const res = await fetch("/api/v1/project/tasks/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ projectId, taskId }),
  });
  if (res.ok) {
    mutate(`/api/v1/project/tasks/get?status=${status}`);
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
