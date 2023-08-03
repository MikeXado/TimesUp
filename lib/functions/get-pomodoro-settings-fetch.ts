import { toast } from "@/components/ui/use-toast";

export const getPomodoroFetcher = async (projectId: string, taskId: string) => {
  const res = await fetch("/api/v1/project/tasks/pomodoro/get", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ projectId, taskId }),
  });
  const messageData = await res.json();
  if (res.ok) {
    return messageData.message;
  } else {
    toast({
      variant: "destructive",
      title: "Failed",
      description: messageData.message,
    });
  }
};
