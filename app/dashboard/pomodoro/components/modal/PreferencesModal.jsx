import { memo, useState } from "react";
import { getPreferences } from "../../../../../utils/store/appSlices";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
export default memo(function PreferencesModal() {
  const dispath = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, getValues, watch } = useForm({
    defaultValues: {
      pomo: 10,
      untilLong: 2,
      short: 5,
      long: 15,
      sound: false,
    },
  });

  const handleOpenModal = () => {
    setIsOpen((prev) => !prev);
  };

  const onSubmit = (data) => {
    dispath(getPreferences(data));
    handleOpenModal();
  };
  return (
    <>
      <button
        className="text-white bg-[#192555] w-full mx-1   font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center "
        onClick={handleOpenModal}
      >
        <svg
          className="mr-3"
          width="25px"
          height="25px"
          viewBox="0 0 24 24"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          fill="#fff"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />

          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <g id="SVGRepo_iconCarrier">
            {" "}
            <title>Settings</title>{" "}
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              {" "}
              <g id="Settings">
                {" "}
                <rect
                  id="Rectangle"
                  fillRule="nonzero"
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                >
                  {" "}
                </rect>{" "}
                <circle
                  id="Oval"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  cx="12"
                  cy="12"
                  r="3"
                >
                  {" "}
                </circle>{" "}
                <path
                  d="M10.069,3.36281 C10.7151,1.54573 13.2849,1.54573 13.931,3.3628 C14.338,4.5071 15.6451,5.04852 16.742,4.52713 C18.4837,3.69918 20.3008,5.51625 19.4729,7.25803 C18.9515,8.35491 19.4929,9.66203 20.6372,10.069 C22.4543,10.7151 22.4543,13.2849 20.6372,13.931 C19.4929,14.338 18.9515,15.6451 19.4729,16.742 C20.3008,18.4837 18.4837,20.3008 16.742,19.4729 C15.6451,18.9515 14.338,19.4929 13.931,20.6372 C13.2849,22.4543 10.7151,22.4543 10.069,20.6372 C9.66203,19.4929 8.35491,18.9515 7.25803,19.4729 C5.51625,20.3008 3.69918,18.4837 4.52713,16.742 C5.04852,15.6451 4.5071,14.338 3.3628,13.931 C1.54573,13.2849 1.54573,10.7151 3.36281,10.069 C4.5071,9.66203 5.04852,8.35491 4.52713,7.25803 C3.69918,5.51625 5.51625,3.69918 7.25803,4.52713 C8.35491,5.04852 9.66203,4.5071 10.069,3.36281 Z"
                  id="Path"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  {" "}
                </path>{" "}
              </g>{" "}
            </g>{" "}
          </g>
        </svg>
        Preferences
      </button>

      <div
        className={
          "fixed top-0 left-0 right-0 z-50 flex justify-center items-center bg-black bg-opacity-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full " +
          (isOpen ? " " : " hidden")
        }
      >
        <div className="relative w-full h-full max-w-md md:h-auto">
          <div className="relative bg-[#111c44]  rounded-lg shadow ">
            <button
              className="absolute top-3 right-2.5 text-white bg-transparent hover:bg-gray-200  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
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

            <div className="px-6 py-4  rounded-t ">
              <h3 className="text-base font-semibold text-white lg:text-xl ">
                Preferences
              </h3>
            </div>

            <div className="p-6 pt-1">
              <form onSubmit={handleSubmit(onSubmit)}>
                <ul className="my-4 space-y-3">
                  <li>
                    <div className="flex justify-between w-full items-center">
                      <label
                        htmlFor="focus-range"
                        className="block mb-2 text-sm font-medium text-white "
                      >
                        Focus Length
                      </label>
                      <div>{watch("pomo")}</div>
                    </div>
                    <input
                      id="focus-range"
                      type="range"
                      min="10"
                      max="120"
                      step="5"
                      className=" w-full h-2  rounded-lg   bg-[#192555] appearance-none cursor-pointer "
                      {...register("pomo")}
                    />
                  </li>
                  <li>
                    <div className="flex justify-between w-full items-center">
                      <label
                        htmlFor="focus-range"
                        className="block mb-2 text-sm font-medium text-white"
                      >
                        Pomodoros until long break
                      </label>
                      <div>{watch("untilLong")}</div>
                    </div>
                    <input
                      id="focus-range"
                      type="range"
                      min="2"
                      step="1"
                      className=" w-full h-2  rounded-lg   bg-[#192555] appearance-none cursor-pointer "
                      {...register("untilLong")}
                    />
                  </li>
                  <li>
                    <div className="flex justify-between w-full items-center">
                      <label
                        htmlFor="focus-range"
                        className="block mb-2 text-sm font-medium text-white"
                      >
                        Short Length
                      </label>
                      <div>{watch("short")}</div>
                    </div>
                    <input
                      id="focus-range"
                      type="range"
                      min="5"
                      max="15"
                      step="1"
                      className=" w-full h-2  rounded-lg   bg-[#192555] appearance-none cursor-pointer "
                      {...register("short")}
                    />
                  </li>
                  <li>
                    <div className="flex justify-between w-full items-center">
                      <label
                        htmlFor="focus-range"
                        className="block mb-2 text-sm font-medium text-white "
                      >
                        Long Length
                      </label>
                      <div>{watch("long")}</div>
                    </div>
                    <input
                      id="focus-range"
                      type="range"
                      min="15"
                      step="5"
                      className=" w-full h-2  rounded-lg   bg-[#192555] appearance-none cursor-pointer "
                      {...register("long")}
                    />
                  </li>
                  <li className="pt-5 flex w-full justify-between items-center">
                    <div className="text-sm font-medium text-white ">Sound</div>

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        {...register("sound")}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </li>
                </ul>
                <div className="w-full flex justify-end items-center mt-5">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white text-lg font-semibold py-2 px-10 rounded-lg"
                  >
                    Save
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
