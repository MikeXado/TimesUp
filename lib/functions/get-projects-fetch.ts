import { toast } from "@/components/ui/use-toast";

const getProjectsFetcher = async (uid: string) => {
  const res = await fetch("/api/v1/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(uid),
  });
  if (res.ok) {
    const data = await res.json();
    return data.message;
  } else {
    const data = await res.json();
    toast({
      title: "Failed",
      description: data.message,
    });
  }
};

export default getProjectsFetcher;
