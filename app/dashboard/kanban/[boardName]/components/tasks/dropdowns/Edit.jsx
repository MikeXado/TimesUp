"use client";
import { useSWRConfig } from "swr";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "../../../../../../../utils/fetcher";

import EditSubtask from "../subtasks/EditSubtask";
import { toast } from "react-toastify";

export default React.memo(function EditTask({ task }) {
  const { cache } = useSWRConfig();
  const dbSubtasks = cache.get(`/api/getSubtasks/subtasks/${task.id}`)?.data;
  const editTask = useMutation("/api/editTask");
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit } = useForm();

  const [subtask, setSubtask] = useState("");
  const [isFetchingEdit, setIsFetchingEdit] = useState(false);
  const [newSubtasks, setNewSubtasks] = useState([]);
  const [subtasks, setSubtasks] = useState(dbSubtasks ? dbSubtasks : []);
  const [showSubtaskInput, setShowSubtaskInput] = useState(false);

  useEffect(() => {
    setSubtasks(dbSubtasks);
  }, [dbSubtasks]);

  const handleShowSubtaskInput = () => {
    setShowSubtaskInput((prev) => !prev);
  };
  const handleSubtaskInputChange = (e) => {
    setSubtask(e.target.value);
  };
  const handleAddSubtask = () => {
    setSubtasks((prev) => [...prev, { title: subtask, done: false }]);
    setNewSubtasks((prev) => [...prev, { title: subtask, done: false }]);
    setSubtask("");
    setShowSubtaskInput(false);
  };

  const handleOpenModal = () => {
    setIsOpen((prev) => !prev);
  };

  const onSubmit = async (data) => {
    setIsFetchingEdit(true);
    await editTask({
      ...data,
      boardId: task.boardId,
      uid: task.uid,
      id: task.id,
      status: task.status,
      subtasks: newSubtasks,
      progress: task.progress,
    });
    setIsFetchingEdit(false);
    toast.success("Task edited successfully!");
    setIsOpen(false);
    setNewSubtasks([]);
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        type="button"
        className="bg-[#192555] text-white mb-3 py-2 px-10 flex justify-center w-full rounded-lg"
      >
        Edit
      </button>{" "}
      <div
        className={
          "fixed top-0 left-0 right-0 z-50 flex justify-center items-center bg-black bg-opacity-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0  md:h-screen" +
          (isOpen ? " " : " hidden")
        }
      >
        <div className="relative w-full h-full max-w-md md:h-auto">
          <div className="relative bg-[#111c44] rounded-lg shadow dark:bg-gray-700">
            <button
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
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
              <h3 className="text-base font-semibold text-white lg:text-xl">
                Edit Task
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
                    className="block mb-2 text-md font-medium text-white "
                  >
                    Title
                  </label>
                  <input
                    defaultValue={task.title}
                    type="text"
                    id="title"
                    className="bg-[#192555]  text-white text-sm rounded-lg focus:ring-[#6e6ae4] border-none placeholder-white focus:border-[#6e6ae4] block w-full p-2.5 "
                    placeholder="Dashboard making"
                    {...register("title", { required: true })}
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-md font-medium text-white "
                  >
                    Description
                  </label>
                  <input
                    defaultValue={task.description}
                    type="text"
                    id="description"
                    className="bg-[#192555]  text-white text-sm rounded-lg focus:ring-[#6e6ae4] border-none placeholder-white focus:border-[#6e6ae4] block w-full p-2.5 "
                    placeholder="A small tasks during dashboard developing"
                    {...register("description")}
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="subtasks"
                    className="block mb-2 text-md font-medium text-white "
                  >
                    Add subtasks
                  </label>
                  <ul className="max-h-[300px] overflow-y-auto">
                    {subtasks?.map((subtask, index) => {
                      return (
                        <EditSubtask
                          key={index}
                          subtask={subtask}
                          setSubtasks={setSubtasks}
                          uid={task.uid}
                          boardId={task.boardId}
                          taskId={task.id}
                          subtasks={subtasks}
                          setNewSubtasks={setNewSubtasks}
                          newSubtasks={newSubtasks}
                        />
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
                        "bg-[#192555]  border-none text-white text-sm rounded-lg focus:ring-[#6e6ae4] focus:border-[#6e6ae4] block w-full p-2.5 "
                      }
                      value={subtask}
                    />
                    <div className="absolute right-2 top-[6px] z-10">
                      <button
                        type="button"
                        className="bg-[#6e6ae4] text-white py-1 px-3  rounded-lg"
                        onClick={handleAddSubtask}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    className={
                      "w-full bg-[#6e6ae4] text-white py-2 mt-3 px-10 rounded-lg" +
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
                    {isFetchingEdit ? "Editing..." : "Edit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
