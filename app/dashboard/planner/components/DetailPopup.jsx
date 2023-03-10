import { format, parseISO } from "date-fns";

import React, { useContext } from "react";
import { ChangeEventContext } from "./context/ChangeEventProvider";

export default function DetailPopup({ setIsOpen, isOpen, event }) {
  const { setIsOpen: setChangeOpen } = useContext(ChangeEventContext);
  const onOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleChangeOpen = () => {
    setChangeOpen((prev) => !prev);
    setIsOpen(false);
  };
  return (
    <>
      <div
        className={
          "fixed top-0 left-0 right-0 z-50 flex justify-center items-center bg-black bg-opacity-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0  h-full" +
          (isOpen ? " " : " hidden")
        }
      >
        <div className="relative w-full h-full max-w-md md:h-auto">
          <div className="relative bg-[#111c44] rounded-lg shadow ">
            <button
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
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg"
                onClick={handleChangeOpen}
              >
                Change
              </button>
            </div>

            <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8 ">
              <h3 className="text-xl text-center font-medium text-white ">
                Event information
              </h3>
              <div>
                <div className="mb-5">
                  <div className="block mb-2 text-sm font-medium text-white ">
                    Title
                  </div>
                  <div className="text-[#cbcdd7]">{event.title}</div>
                </div>
                <div className="mb-5">
                  <div className="block mb-2 text-sm font-medium text-white ">
                    Description
                  </div>
                  <div className="text-[#cbcdd7]">{event.description}</div>
                </div>
                <div className="mb-5 flex items-center w-full">
                  <div className="">
                    <div className="mb-2 text-sm font-medium text-white ">
                      Start time
                    </div>
                    <div className="text-[#cbcdd7]">{event.startTime}</div>
                  </div>
                  <div className="font-bold text-lg ml-5 mr-5 text-white">
                    -
                  </div>
                  <div className="">
                    <div className=" mb-2 text-sm font-medium text-white ">
                      End time
                    </div>
                    <div className="text-[#cbcdd7]">{event.endTime}</div>
                  </div>
                </div>
                <div className="mb-5">
                  <div className=" mb-2 text-sm font-medium text-white ">
                    Date
                  </div>
                  <div className="text-[#cbcdd7]">
                    {format(parseISO(event.date), "d MMMM yyyy")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
