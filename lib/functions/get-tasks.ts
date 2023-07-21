import { toast } from "@/components/ui/use-toast";

export const getTasksFetcher = async (
  id: string,
  startAfter: string | null,
  status: string | null
) => {
  const res = await fetch("/api/v1/project/tasks/get", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, startAfter, status }),
  });

  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    const data = await res.json();
    toast({
      variant: "destructive",
      title: "Failed",
      description: data.message,
    });
  }
};
