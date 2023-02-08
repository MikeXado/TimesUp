import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ChangeEvent({
  isOpen,
  setIsFetching,
  startTransition,
  eventId,
  setIsOpen,
  day,
  uid,
}) {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const onOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSendEventToDb = async (data) => {
    setIsFetching(true);
    await fetch("/api/changeEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, id: eventId, uid: uid, date: day }),
    });

    setIsFetching(false);

    setIsOpen(false);

    startTransition(() => {
      router.refresh();
    });
  };

  const onSubmit = (data) => {
    handleSendEventToDb(data);
  };
  return (
    <div
      id="drawer-form"
      className={
        "fixed z-40 h-screen p-4 overflow-y-auto bg-white border-l-4 w-[500px] max-w-full  transition-transform right-0 top-0 translate-x-full" +
        (isOpen ? " translate-x-0" : "")
      }
      tabIndex="-1"
      aria-labelledby="drawer-form-label"
    >
      <h5
        id="drawer-label"
        className="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
      >
        <svg
          className="w-5 h-5 mr-2"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          ></path>
        </svg>
        Change Event
      </h5>
      <button
        onClick={onOpen}
        type="button"
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
        <span className="sr-only">Close menu</span>
      </button>
      <form className="mb-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
            placeholder="SCRUM Meeting"
            {...register("title", { required: true })}
            required
          />
        </div>
        <div className="mb-6 flex items-center">
          <div>
            <label
              htmlFor="startTime"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Start time
            </label>
            <input
              id="startTime"
              type="time"
              {...register("startTime", { required: true })}
            />
            <span className="font-bold text-lg ml-2 mr-2">-</span>
          </div>

          <div>
            <label
              htmlFor="endTime"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Start time
            </label>
            <input
              id="endTime"
              type="time"
              {...register("endTime", { required: true })}
            />
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Description
          </label>
          <textarea
            id="description"
            rows="8"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-600 focus:border-indigo-600 "
            placeholder="Write event description..."
            {...register("description")}
          ></textarea>
        </div>

        <button
          type="submit"
          className="text-white justify-center flex items-center bg-indigo-600 hover:bg-indigo-700 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
        >
          <svg
            className="w-5 h-5 mr-2"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            ></path>
          </svg>{" "}
          Change event
        </button>
      </form>
    </div>
  );
}
