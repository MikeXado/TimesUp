import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { revalidate } from "../app/dashboard/contexts/SwrConfig";

export const useMutation = (key: string) => {
  return async function (data: any, keys: string[]): Promise<void> {
    await fetch(key, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    await revalidate(keys);
  };
};

export const usePush = () => {
  const router = useRouter();
  const routerRef = useRef(router);
  routerRef.current = router;
  const [routerPush] = useState(() => {
    const push = (path: string) => {
      routerRef.current.replace(path);
    };
    return push;
  });
  return routerPush;
};
