import { Spinner } from "flowbite-react";
import React, { useState } from "react";
import { EditSubtasksProps, SubtasksType } from "../../../../../../../types";
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
}: EditSubtasksProps) {
  const [isFetching, setIsFetching] = useState(false);
  const removeSubtask = useMutation("/api/deleteSubtask");
  const deleteSubtask = async (subtask: SubtasksType) => {
    if (subtask.id) {
      setIsFetching(true);

      await removeSubtask(
        {
          id: subtask.id,
          uid: uid,
          boardId: boardId,
          taskId: taskId,
        },
        [`/api/getSubtasks/subtasks/${taskId}`]
      );
      setIsFetching(false);
    }
    const newSubs = subtasks.filter((el) => {
      return el.title !== subtask.title;
    });

    setSubtasks(newSubs);
    const sendingSubtasks = newSubtasks.filter((el) => {
      return el.title !== subtask.title;
    });
    setNewSubtasks(sendingSubtasks);
  };

  return (
    <li className="relative px-5 list-none">
      <h6 className="list-none w-full text-white  rounded-md py-3 pl-3 mb-3">
        {subtask.title}
      </h6>

      <button
        type="button"
        className="bg-transparent border border-[#6e6ae4] p-2 rounded-lg absolute right-[26px] top-[5.5px]"
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
              fill="#fff"
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
