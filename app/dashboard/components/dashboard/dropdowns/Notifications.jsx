"use client";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { clientPusher } from "../../../../../pusher";
import { NotificationsContext } from "../../../contexts/NotificationsProvider";
import { UserContext } from "../../../contexts/UserProvider";
import Notification from "../notifications/Notification";
export default function Notificatios() {
  const uid = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const { notifications } = useContext(NotificationsContext);
  const params = usePathname();
  const segments = params.split("/");
  const path = segments[2];
  console.log(notifications);

  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <button
        className="flex w-full items-center text-sm font-medium text-center text-white "
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

        <div className="relative inline-flex lg:w-3 lg:h-3 md:w-3 md:h-3 sm:w-3 sm:h-3 w-2 h-2 bg-red-500  border-white rounded-full  -top-2 right-3"></div>
      </button>
      <div
        className={
          (path === "chat" && " -left-[150px] ") +
          "z-50 absolute  top-[50px] lg:-left-[200px] md:-left-[200px] sm:-left-[160px] -left-[100px] shadow-lg  bg-[#111c44] border-none divide-y divide-gray-500 rounded-lg lg:w-[300px] md:w-[300px] w-[250px] " +
          (isOpen ? " " : " hidden")
        }
      >
        <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
          Notifications
        </div>
        {notifications
          .filter((el) => el.receiver === uid)
          .map((notification) => {
            return (
              <Notification key={notification.id} notification={notification} />
            );
          })}
      </div>
    </div>
  );
}
