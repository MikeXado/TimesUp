import { useEffect, useState } from "react";
import { mutate } from "swr";
export default function Subtask({ subtask, task }) {
  const [done, setDone] = useState(subtask.done);

  const handleChange = async (e) => {
    let done = e.target.checked;
    setDone(done);
    await fetch("/api/changeSubtask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: subtask.id,
        title: subtask.title,
        done: done,
        taskId: task.id,
        boardId: task.boardId,
        uid: task.uid,
      }),
    });
    mutate(`/api/getSubtasks/subtasks/${task.id}`);
  };
  return (
    <>
      <div className="flex items-center mb-4">
        <input
          id="done"
          type="checkbox"
          value=""
          checked={done}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          onChange={handleChange}
        />

        <label
          htmlFor="done"
          className={
            "ml-2 text-sm font-medium text-white " +
            (done ? " line-through" : " ")
          }
        >
          {subtask.title}
        </label>
      </div>
    </>
  );
}
