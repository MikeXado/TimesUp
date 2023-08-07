import { toast } from "@/components/ui/use-toast";

const fetcher = async (url: string) => {
  const res = await fetch(url, {
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

export default fetcher;
