"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
export default function AddNewTask({ boardId, id, status, mutate }) {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [subtask, setSubtask] = useState("");
  const [subtasks, setSubtasks] = useState([]);
  const [showSubtaskInput, setShowSubtaskInput] = useState(false);

  const handleShowSubtaskInput = () => {
    setShowSubtaskInput((prev) => !prev);
  };

  const handleSubtaskInputChange = (e) => {
    setSubtask(e.target.value);
  };
  const handleAddSubtask = () => {
    setSubtasks((prev) => [...prev, subtask]);
    setSubtask("");
    setShowSubtaskInput(false);
  };

  const deleteSubtask = (subtask) => {
    const newSubtasks = subtasks.filter((el) => {
      return el !== subtask;
    });

    setSubtasks(newSubtasks);
  };

  const handleOpenModal = () => {
    setIsOpen((prev) => !prev);
  };

  const onSubmit = async (data) => {
    const addNewTask = async () => {
      await fetch("/api/addNewTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          boardId: boardId,
          id: id,
          status: status,
        }),
      });
    };

    reset();
    setIsOpen(false);
    mutate(addNewTask);
  };
  return (
    <>
      <button
        onClick={handleOpenModal}
        className="flex justify-center items-center  text-md text-white mt-3 font-semibold  w-[30px] h-[30px] bg-indigo-600 hover:bg-indigo-700 rounded-full"
      >
        <svg
          fill="#fff"
          width="25px"
          height="25px"
          viewBox="0 0 22 22"
          xmlns="http://www.w3.org/2000/svg"
          id="memory-plus"
        >
          <path d="M12 17H10V12H5V10H10V5H12V10H17V12H12Z" />
        </svg>
      </button>

      <div
        className={
          "fixed top-0 left-0 right-0 z-50 flex justify-center items-center bg-black bg-opacity-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0  md:h-screen" +
          (isOpen ? " " : " hidden")
        }
      >
        <div className="relative w-full h-full max-w-md md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              onClick={handleOpenModal}
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

            <div className="px-6 py-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
                Add New Board
              </h3>
            </div>

            <div className="p-6 pt-1">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="my-4 space-y-3"
              >
                <div className="mb-6">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Dashboard making"
                    {...register("title", { required: true })}
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    id="description"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="A small tasks during dashboard developing"
                    {...register("description")}
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="subtasks"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Add subtasks
                  </label>
                  <ul className="max-h-[300px] overflow-y-auto">
                    {subtasks.map((subtask, index) => {
                      return (
                        <div key={index} className="relative px-5">
                          <li className="list-none border w-full border-gray-200 rounded-md py-3 pl-3 mb-3">
                            {subtask}
                          </li>

                          <button
                            type="button"
                            className="bg-gray-200 p-2 rounded-lg absolute right-[26px] top-[7px]"
                            onClick={() => {
                              deleteSubtask(subtask);
                            }}
                          >
                            {" "}
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
                          </button>
                        </div>
                      );
                    })}
                  </ul>

                  <div
                    className={"relative" + (showSubtaskInput ? "" : " hidden")}
                  >
                    <input
                      id="subtasks"
                      onChange={handleSubtaskInputChange}
                      className={
                        "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      }
                      value={subtask}
                    />
                    <div className="absolute right-2 top-[6px] z-10">
                      <button
                        type="button"
                        className="bg-gray-200 py-1 px-3  rounded-lg"
                        onClick={handleAddSubtask}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    className={
                      "w-full bg-gray-200 py-2 mt-3 px-10 rounded-lg" +
                      (showSubtaskInput ? " hidden" : " ")
                    }
                    onClick={handleShowSubtaskInput}
                  >
                    Add new Subtask
                  </button>
                </div>
                <div className="w-full flex justify-end items-center mt-5">
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold py-2 px-10 rounded-lg"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
