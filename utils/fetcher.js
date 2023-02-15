import { revalidate } from "../app/dashboard/components/dashboard/SwrConfig";

export const useMutation = (key) => {
  return async function (data) {
    console.log(data, key);
    await fetch(key, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    await revalidate();
  };
};
