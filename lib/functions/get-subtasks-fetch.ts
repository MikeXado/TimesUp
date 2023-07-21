import { toast } from "@/components/ui/use-toast";

const getSubtasksFetcher = async (
  url: string,

  projectId: string,
  taskId: string
) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ projectId, taskId }),
  });
  if (res.ok) {
    const data = await res.json();
    return data.message;
  } else {
    const data = await res.json();
    toast({
      variant: "destructive",
      title: "Failed",
      description: data.message,
    });
  }
};

export default getSubtasksFetcher;
