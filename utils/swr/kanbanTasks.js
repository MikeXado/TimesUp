export const tasksFetcher = async (uid, boardId) => {
  const res = await fetch("/api/getTasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uid, boardId }),
  });
  const tasks = await res.json();
  return tasks;
};
