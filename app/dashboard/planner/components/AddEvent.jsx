import { useContext, useState, memo } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "../../../../utils/fetcher";
import { useRouter } from "next/navigation";
import { UserContext } from "../../contexts/UserProvider";
import { toast } from "react-toastify";
export default memo(function AddEvent({ day }) {
  const uid = useContext(UserContext);
  const router = useRouter();
  const createEvent = useMutation("/api/addEvent");
  const [isFetching, setIsFetching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const onOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSendEventToDb = async (data) => {
    setIsFetching(true);
    await createEvent({ ...data, date: day, uid: uid }, ["/api/getEvents"]);
    setIsFetching(false);
    toast.success("Event added!");
    setIsOpen(false);
  };

  const onSubmit = (data) => {
    handleSendEventToDb(data);
  };

  return (
    <>
      <button
        onClick={onOpen}
        className="absolute bottom-0 right-0 flex items-center justify-center  w-6 h-6 mb-2 mr-2 text-white bg-[#051139] rounded group-hover:flex"
      >
        <svg className="w-5 h-5 plus" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>

      <div
        id="drawer-form"
        className={
          "fixed z-40 h-screen p-4 overflow-y-auto bg-[#192555] shadow-lg w-[500px] max-w-full  transition-transform right-0 top-0 translate-x-full" +
          (isOpen ? " translate-x-0" : "")
        }
        tabIndex="-1"
        aria-labelledby="drawer-form-label"
      >
        <h5
          id="drawer-label"
          className="inline-flex items-center mb-6 text-base font-semibold text-white uppercase "
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
          New event
        </h5>
        <button
          onClick={onOpen}
          type="button"
          className="text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
              className="block mb-2 text-sm font-medium text-white"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className="bg-[#111c44] text-white placeholder-gray-300 text-sm rounded-lg focus:ring-blue-900 border-none focus:border-blue-900 block w-full p-2.5"
              placeholder="SCRUM Meeting"
              {...register("title", { required: true })}
              required
            />
          </div>
          <div className="mb-6 flex items-center">
            <div>
              <label
                htmlFor="startTime"
                className="block mb-2 text-sm font-medium text-white"
              >
                Start time
              </label>
              <input
                id="startTime"
                type="time"
                className="bg-[#111c44] text-white border-none rounded-lg"
                {...register("startTime", { required: true })}
              />
              <span className="font-bold text-lg ml-2 mr-2">-</span>
            </div>

            <div>
              <label
                htmlFor="endTime"
                className="block mb-2 text-sm font-medium text-white "
              >
                Start time
              </label>
              <input
                id="endTime"
                type="time"
                className="bg-[#111c44] text-white border-none rounded-lg"
                {...register("endTime", { required: true })}
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-white "
            >
              Description
            </label>
            <textarea
              id="description"
              rows="8"
              className="block p-2.5 w-full text-sm bg-[#111c44] text-white placeholder-gray-300  rounded-lg border-none focus:ring-blue-900  focus:border-blue-900 "
              placeholder="Write event description..."
              {...register("description")}
            ></textarea>
          </div>

          <button
            type="submit"
            className="text-white justify-center flex items-center bg-[#111c44]  w-full focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-3"
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
            {isFetching ? "Creating event..." : "Create event"}
          </button>
        </form>
      </div>
    </>
  );
});
