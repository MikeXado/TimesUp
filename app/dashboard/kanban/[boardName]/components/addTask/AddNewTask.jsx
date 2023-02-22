"use client";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation } from "../../../../../../utils/fetcher";
import { UserContext } from "../../../../contexts/UserProvider";
export default function AddNewTask({ boardId, status }) {
  const uid = useContext(UserContext);
  const createTask = useMutation("/api/addNewTask");
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [subtask, setSubtask] = useState("");
  const [subtasks, setSubtasks] = useState([]);
  const [showSubtaskInput, setShowSubtaskInput] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

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
    reset();

    setIsFetching(true);
    await createTask({
      ...data,
      boardId: boardId,
      uid: uid,
      status: status,
      subtasks: subtasks,
      progress: 0,
    });
    setIsFetching(false);
    toast.success("Task was created!");
    setIsOpen(false);
    setSubtasks([]);
  };
  return (
    <>
      <button
        onClick={handleOpenModal}
        className="flex justify-center items-center  text-md text-white mt-3 font-semibold  w-[30px] h-[30px] bg-[#6e6ae4] hover:bg-indigo-700 rounded-full"
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
          <div className="relative bg-[#111c44] rounded-lg shadow ">
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

            <div className="px-6 py-4  rounded-t">
              <h3 className="text-base font-semibold text-white lg:text-xl ">
                Add New Task
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
                    type="text"
                    id="title"
                    className="bg-[#192555] w-full border-none text-white placeholder-white text-sm rounded-lg focus:ring-[#6e6ae4] focus:border-[#6e6ae4]"
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
                    type="text"
                    id="description"
                    className="bg-[#192555] border-none w-full text-white placeholder-white text-sm rounded-lg focus:ring-[#6e6ae4] focus:border-[#6e6ae4]"
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
                    {subtasks.map((subtask, index) => {
                      return (
                        <div key={index} className="relative px-5">
                          <li className="list-none w-full text-white  rounded-md py-3 pl-3 mb-3">
                            {subtask}
                          </li>

                          <button
                            type="button"
                            className="bg-transparent border border-[#6e6ae4] p-2 rounded-lg absolute right-[26px] top-[5.5px]"
                            onClick={() => {
                              deleteSubtask(subtask);
                            }}
                          >
                            {" "}
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
                    {isFetching ? "Adding..." : "Add"}
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
