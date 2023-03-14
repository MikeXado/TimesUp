import React, { memo, useContext, useState } from "react";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { UserContext } from "../../contexts/UserProvider";
import { toast } from "react-toastify";
export default memo(function ChangeSessions({
  setIsFetching,
  startTransition,
  session,
}) {
  const uid = useContext(UserContext);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const [isDeleting, setIsDeleting] = useState(false);

  const onOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleAddMessage = async (data, uid) => {
    setIsFetching(true);
    await fetch("/api/changeUpcomming", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, uid: uid }),
    }).then((res) => res.json());

    setIsFetching(false);
    toast.success("Session updated!");
    startTransition(() => {
      router.refresh();
    });
  };

  const deleteSession = async () => {
    setIsDeleting(true);
    setIsFetching(true);
    const res = await fetch("/api/deleteUpcomming", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: session.id,
        uid: uid,
      }),
    });

    if (!res.ok) {
      toast.error("Something went wrong , try again later!");
    }
    setIsDeleting(false);
    setIsFetching(false);
    toast.success("Session deleted");
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
        data-testid="edit-button"
        onClick={onOpen}
        className=" font-semibold underline text-indigo-600 hover:text-indigo-700"
      >
        Edit
      </button>

      <div
        data-testid="edit-session-modal"
        className={
          "fixed top-0 left-0 right-0 z-50 flex justify-center items-center bg-black bg-opacity-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full " +
          (isOpen ? " " : " hidden")
        }
      >
        <div className="relative w-full h-full max-w-md md:h-auto">
          <div className="relative bg-[#192555] rounded-lg shadow ">
            <button
              data-testid="close-edit-session-button"
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
                Edit Session
              </h3>
            </div>

            <div className="space-y-6 px-6  pb-4 sm:pb-6 lg:px-8 xl:pb-8">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <div className="mb-2 block ">
                    <label
                      htmlFor="title"
                      value="Session name"
                      className="text-white"
                    />
                  </div>
                  <input
                    type="text"
                    id="title"
                    className="bg-[#111c44] text-white placeholder-gray-300 text-sm rounded-lg focus:ring-blue-900 border-none focus:border-blue-900 block w-full p-2.5"
                    placeholder="English class"
                    value={session.title}
                    {...register("title", { required: true })}
                    required
                  />
                </div>
                <div className="mb-4">
                  <div className="mb-2 block">
                    <label
                      htmlFor="description"
                      value="Session description"
                      className="text-white"
                    />
                  </div>
                  <textarea
                    id="description"
                    rows="8"
                    className="block p-2.5 w-full text-sm bg-[#111c44] text-white placeholder-gray-300  rounded-lg border-none focus:ring-blue-900  focus:border-blue-900 "
                    placeholder="Write event description..."
                    value={session.description}
                    {...register("description")}
                  />
                </div>
                <div className="mb-4">
                  <div className=" font-semibold text-sm text-white mb-2">
                    Choose time of session
                  </div>
                  <input
                    type="time"
                    className="bg-[#111c44] text-white border-none rounded-lg"
                    value={session.time}
                    {...register("time", { required: true })}
                  />
                </div>
                <div className="mb-4">
                  <div className=" font-semibold text-sm text-white mb-2">
                    Choose date of session
                  </div>
                  <input
                    className="bg-[#111c44] text-white border-none rounded-lg"
                    type="date"
                    value={session.date}
                    {...register("date", { required: true })}
                  />
                </div>

                <div className="flex w-full justify-between items-center">
                  <button
                    onClick={deleteSession}
                    type="button"
                    className="bg-red-500 w-full hover:bg-red-600 text-white font-medium text-sm rounded-lg py-2.5"
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>

                  <button
                    type="submit"
                    className="text-white  bg-indigo-600 hover:bg-indigo-700  w-full  font-medium rounded-lg text-sm  py-2.5 ml-2"
                  >
                    Confirm
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
