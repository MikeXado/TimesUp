import { Spinner } from "flowbite-react";
import React, { useState } from "react";
import { useMutation } from "../../../../../../../utils/fetcher";

export default function EditSubtask({
  subtask,
  uid,
  boardId,
  taskId,
  setSubtasks,
  subtasks,
  setNewSubtasks,
  newSubtasks,
}) {
  const [isFetching, setIsFetching] = useState(false);
  const removeSubtasks = useMutation("/api/deleteSubtask");

  const deleteSubtask = async (subtask) => {
    if (subtask.id) {
      setIsFetching(true);
      await removeSubtasks({
        id: subtask.id,
        uid: uid,
        boardId: boardId,
        taskId: taskId,
      });
      setIsFetching(false);
    } else {
      const newSubs = subtasks.filter((el) => {
        return el.title !== subtask.title;
      });

      const sendingSubtasks = newSubtasks.filter((el) => {
        return el.title !== subtask.title;
      });
      setSubtasks(newSubs);
      setNewSubtasks(sendingSubtasks);
    }
  };

  return (
    <li className="relative px-5 list-none">
      <h6 className="list-none border w-full border-gray-200 rounded-md py-3 pl-3 mb-3">
        {subtask.title}
      </h6>

      <button
        type="button"
        className="bg-gray-200 p-2 rounded-lg absolute right-[26px] top-[5.5px]"
        onClick={() => {
          deleteSubtask(subtask);
        }}
      >
        {isFetching ? (
          <div className="w-5 h-5">
            <Spinner className="w-5 h-5" />
          </div>
        ) : (
          <>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">delete task</span>{" "}
          </>
        )}
      </button>
    </li>
  );
}
