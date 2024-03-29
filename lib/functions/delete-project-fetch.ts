import { toast } from "@/components/ui/use-toast";
import { mutate } from "swr";

const deleteProjectFetch = async (id: string) => {
  const res = await fetch(`/api/v1/project/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    mutate("/api/v1/projects");
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

export default deleteProjectFetch;
