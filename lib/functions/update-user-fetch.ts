import { toast } from "@/components/ui/use-toast";

type RequestBodyType = {
  displayName: string;
  photoUrl: string;
};

const updateUserFetch = async (requestBody: RequestBodyType) => {
  const res = await fetch("/api/v1/auth/updateUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
  const messageData = await res.json();
  if (res.ok) {
    toast({
      title: messageData.message,
    });
  } else {
    toast({
      title: messageData.message,
    });
  }
};

export default updateUserFetch;
