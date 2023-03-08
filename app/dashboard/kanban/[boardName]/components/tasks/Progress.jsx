"use client";
import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function Progress({ task }) {
  const [progress, setProgress] = useState(0);
  const getSubtasks = async () => {
    const data = await fetch(`/api/getSubtasks/subtasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        boardId: task.boardId,
        uid: task.uid,
        taskId: task.id,
      }),
    });
    const subtasks = await data.json();
    return subtasks;
  };

  const { data: subtasks, isLoading } = useSWR(
    `/api/getSubtasks/subtasks/${task.id}`,
    getSubtasks
  );

  useEffect(() => {
    if (!subtasks) {
      return;
    }
    let doneSubtasks = subtasks?.filter((subtask) => {
      return subtask.done === true;
    });
    let doneSubtasksLength = doneSubtasks?.length;
    let allSubtasksLength = subtasks?.length;
    let newProgress = Math.floor(
      (doneSubtasksLength * 100) / allSubtasksLength
    );
    setProgress(newProgress);
  }, [subtasks]);

  return (
    <>
      {isLoading ? (
        <div className="w-[20px] mx-auto  my-2 ">
          <Spinner size="20px" />
        </div>
      ) : (
        <div>
          <div className="flex w-full justify-end mb-1">
            <span className="text-sm font-medium text-[#6e6ae4] dark:text-white">
              {isNaN(progress) ? 0 : progress}%
            </span>
          </div>
          <div className="w-full  rounded-full h-2.5 bg-[#051139]">
            <div
              className="bg-gradient-to-l from-purple-600 via-indigo-700 to-indigo-800 h-2.5 rounded-full"
              style={{ width: progress + "%" }}
            ></div>
          </div>
        </div>
      )}
    </>
  );
}
