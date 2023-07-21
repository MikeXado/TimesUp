import { toast } from "@/components/ui/use-toast";

const userIconFetch = async (file: File | null) => {
  if (file) {
    const newForm = new FormData();
    newForm.append("file", file);

    const res = await fetch("/api/v1/auth/photo-url", {
      method: "POST",
      body: newForm,
    });

    const data = await res.json();
    if (res.ok) {
      return data.message;
    } else {
      toast({
        variant: "destructive",
        title: "Failed",
        description: data.message,
      });
    }
  }
};

export default userIconFetch;
