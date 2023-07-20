import { toast } from "@/components/ui/use-toast";

const projectIconFetch = async (file: File | null, url: string) => {
  if (file) {
    const newForm = new FormData();
    newForm.append("file", file);
    const res = await fetch(url, {
      method: "POST",
      body: newForm,
    });
    const data = await res.json();
    if (res.ok) {
      return data.filename;
    } else {
      toast({
        variant: "destructive",
        title: "Failed",
        description: data.message,
      });
    }
  }
};

export default projectIconFetch;
