import { useState } from "react";

export default function Subtask({ task, taskId, boardId, uid }) {
  const [done, setDone] = useState(task.done);
  const handleChange = async (e) => {
    let done = e.target.checked;
    setDone(done);
    return await fetch("/api/changeSubtask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: task.id,
        title: task.title,
        done: done,
        taskId,
        boardId,
        uid,
      }),
    });
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
            "ml-2 text-sm font-medium text-gray-900 dark:text-gray-300" +
            (done ? " line-through" : " ")
          }
        >
          {task.title}
        </label>
      </div>
    </>
  );
}
