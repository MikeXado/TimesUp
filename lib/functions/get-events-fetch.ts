import { toast } from "@/components/ui/use-toast";

const getEventsFetcher = async () => {
  const res = await fetch("/api/v1/events", {
    method: "GET",
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

export default getEventsFetcher;
