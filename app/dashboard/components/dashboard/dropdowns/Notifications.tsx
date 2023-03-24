"use client";
import { usePathname } from "next/navigation";
import { SetStateAction, useContext, useState } from "react";
import { NotificationData } from "../../../../../types";
import { NotificationsContext } from "../../../contexts/NotificationsProvider";
import { UserContext } from "../../../contexts/UserProvider";
import Notification from "../notifications/Notification";
export default function Notificatios() {
  const uid = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const { notifications } = useContext(NotificationsContext);
  const params = usePathname();
  const segments = params?.split("/");
  const path = segments && segments[2];

  const [status, setStatus] = useState("chat");

  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const notificationsForCurrentUser = notifications.filter(
    (el: NotificationData) => el.receiver === uid
  );

  const handleStatus = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStatus(e.currentTarget.id);
  };

  return (
    <>
      <button
        className="flex items-center mr-2 text-sm font-medium text-center text-white "
        type="button"
        onClick={handleIsOpen}
      >
        <svg
          className="lg:w-6 md:w-6 sm:w-6 w-[20px]"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
        </svg>
        {notificationsForCurrentUser.length > 0 && (
          <div className="relative inline-flex lg:w-3 lg:h-3 md:w-3 md:h-3 sm:w-3 sm:h-3 w-2 h-2 bg-red-500  border-white rounded-full  -top-2 right-3"></div>
        )}
      </button>
      <div
        id="drawer-form"
        className={
          "fixed z-40 h-full p-4 overflow-y-auto bg-[#192555]   w-[500px] max-w-full  transition-transform right-0 top-0 " +
          (isOpen ? " translate-x-0" : " translate-x-full")
        }
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
          Notifications
        </h5>
        <button
          onClick={handleIsOpen}
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
        <div className="text-sm font-medium text-center text-white border-b border-gray-200 ">
          <ul className="flex flex-wrap -mb-px">
            <li className="mr-2">
              <button
                id="chat"
                onClick={handleStatus}
                className={
                  "inline-block p-4 rounded-t-lg border-b-2 hover:text-gray-600 hover:border-gray-300 " +
                  (status === "chat"
                    ? " text-indigo-600 border-indigo-600"
                    : "  border-transparent")
                }
              >
                Chat
              </button>
            </li>
            <li className="mr-2">
              <button
                id="pomodoro"
                onClick={handleStatus}
                className={
                  "inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300" +
                  (status === "pomodoro"
                    ? " text-indigo-600 border-indigo-600"
                    : "  border-transparent")
                }
              >
                Pomodoro
              </button>
            </li>
          </ul>
        </div>

        {notificationsForCurrentUser.length === 0 ? (
          <div className="font-semibold text-white text-lg text-center mt-10">
            No notifications yet
          </div>
        ) : (
          notificationsForCurrentUser.map((notification: NotificationData) => {
            return (
              <Notification key={notification.id} notification={notification} />
            );
          })
        )}
      </div>
    </>
  );
}
