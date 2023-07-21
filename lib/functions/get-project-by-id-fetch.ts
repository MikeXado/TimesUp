import { toast } from "@/components/ui/use-toast";

const getProject = async (url: string, id: string) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    const data = await res.json();
    toast({
      title: "Failed",
      description: data.message,
    });
  }
};

export default getProject;
