import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { revalidate } from "../app/dashboard/components/dashboard/SwrConfig";

export const useMutation = (key) => {
  return async function (data, keys) {
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
    const push = (path) => {
      routerRef.current.replace(path);
    };
    return push;
  });
  return routerPush;
};
