import Subtask from "./subtasks/Subtask";
import useSWR, { useSWRConfig } from "swr";
import React, { useCallback } from "react";
export default React.memo(function PreviewTask({ task, handleClick }) {
  const { cache } = useSWRConfig();
  const data = cache.get(`/api/getSubtasks/subtasks/${task.id}`)?.data;

  return (
    <div
      className={
        "fixed top-0 left-0 right-0 z-50 flex justify-center items-center bg-black bg-opacity-30  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0  md:h-screen"
      }
    >
      <div className="relative w-full h-full max-w-md md:h-auto">
        <div className="relative bg-[#192555] rounded-lg shadow ">
          <button
            onClick={handleClick}
            className="absolute top-3 right-2.5 text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          >
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
            <span className="sr-only">Close modal</span>
          </button>

          <div className="px-6 py-4 border-b rounded-t ">
            <h3 className="text-base font-semibold text-white lg:text-xl ">
              {task.title}
            </h3>
          </div>

          <div className="p-6 pt-1 text-[#cbcdd7]">
            <div className="mb-1 text-md font-medium text-white ">
              Description
            </div>
            {task.description}
          </div>
          <div className="p-6 pt-1">
            <>
              {data?.map((subtask) => {
                return (
                  <Subtask key={subtask.id} subtask={subtask} task={task} />
                );
              })}
            </>
          </div>
        </div>
      </div>
    </div>
  );
});
