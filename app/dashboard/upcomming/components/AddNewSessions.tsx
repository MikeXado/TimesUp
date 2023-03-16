import React, { memo, useContext, useState } from "react";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { UserContext } from "../../contexts/UserProvider";
import { toast } from "react-toastify";

interface PropsTypes {
  setIsFetching: (isFetching: boolean) => void;
  startTransition: (callback: () => void) => void;
}

export default memo(function AddNewSessions({
  setIsFetching,
  startTransition,
}: PropsTypes) {
  const uid = useContext(UserContext);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit } = useForm();

  const onOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleAddMessage = async (data, uid) => {
    setIsFetching(true);
    const res = await fetch("/api/addUpcomming", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, uid: uid }),
    });

    if (!res.ok) {
      toast.error("Something went wrong, try again later!");
    }

    setIsFetching(false);
    toast.success("New session added!");
    startTransition(() => {
      router.refresh();
    });
  };

  const onSubmit = (data) => {
    handleAddMessage(data, uid);
    onOpen();
  };

  return (
    <>
      <button
        type="button"
        role="button"
        onClick={onOpen}
        className="mt-5 mb-10 w-full rounded-lg py-3 text-white font-semibold bg-indigo-600 hover:bg-indigo-700"
      >
        Add Session
      </button>

      <div
        data-testid="add-new-session-modal"
        className={
          "fixed top-0 left-0 right-0 z-50 flex justify-center items-center bg-black bg-opacity-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full " +
          (isOpen ? " " : " hidden")
        }
      >
        <div className="relative w-full h-full max-w-md md:h-auto">
          <div className="relative bg-[#192555] rounded-lg shadow ">
            <button
              data-testid="close-add-new-session"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              onClick={onOpen}
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
                Add New Session
              </h3>
            </div>

            <div className="space-y-6 px-6  pb-4 sm:pb-6 lg:px-8 xl:pb-8">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <div className="mb-2 block ">
                    <label htmlFor="title" className="text-white">
                      Session name
                    </label>
                  </div>
                  <input
                    type="text"
                    id="title"
                    className="bg-[#111c44] text-white placeholder-gray-300 text-sm rounded-lg focus:ring-blue-900 border-none focus:border-blue-900 block w-full p-2.5"
                    placeholder="English class"
                    {...register("title", { required: true })}
                    required
                  />
                </div>
                <div className="mb-4">
                  <div className="mb-2 block">
                    <label htmlFor="description" className="text-white">
                      Session Description
                    </label>
                  </div>
                  <textarea
                    id="description"
                    rows={8}
                    className="block p-2.5 w-full text-sm bg-[#111c44] text-white placeholder-gray-300  rounded-lg border-none focus:ring-blue-900  focus:border-blue-900 "
                    placeholder="Write event description..."
                    {...register("description")}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="time" className="text-white mb-2 block">
                    Choose the time when session start
                  </label>
                  <input
                    type="time"
                    id="time"
                    className="bg-[#111c44] text-white border-none rounded-lg"
                    {...register("time", { required: true })}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="date" className="text-white block mb-2">
                    Date
                  </label>
                  <input
                    className="bg-[#111c44] text-white border-none rounded-lg"
                    type="date"
                    id="date"
                    {...register("date", { required: true })}
                  />
                </div>

                <button
                  type="submit"
                  className="text-white justify-center flex items-center bg-indigo-700  w-full focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-3"
                >
                  Confirm
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
