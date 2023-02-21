"use client";

import React, { useContext, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "../../Icon";
import { NavbarContext } from "../../../contexts/NavbarContext";
import KanbanDropdown from "../dropdowns/KanbanDropdown";
// import NotificationDropdown from "components/Dropdowns/NotificationDropdown.js";
// import UserDropdown from "components/Dropdowns/UserDropdown.js";

export default function Sidebar({ boards }) {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const params = usePathname();
  let newParam = params.substring("/dashboard/".length);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isOpen, setIsOpen } = useContext(NavbarContext);
  console.log(isOpen);
  const handleOpenSidebar = () => {
    setIsOpen(false);
  };

  const handleOpenDropDown = (id) => {
    if (id === "e-commerce") {
      setDropdownOpen((prev) => !prev);
    }
  };

  return (
    <>
      <div
        className={
          "fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform lg:translate-x-0 duration-500 ease-in-out  bg-[#111c44] w-72" +
          (isOpen ? " translate-x-0" : " -translate-x-full")
        }
      >
        <h5 className="text-base font-semibold text-white ppercase ">
          Control
        </h5>
        <button
          onClick={handleOpenSidebar}
          type="button"
          className="text-[#cbcdd7] bg-transparent hover:bg-[#192555] rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center  lg:hidden"
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
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2">
            <li className="">
              <Link
                href="/dashboard"
                className="flex items-center w-full p-2 text-base font-normal text-[#cbcdd7] hover:bg-[#192555] transition duration-75 rounded-lg group "
              >
                <div className="flex-1 ml-3 text-left whitespace-nowrap">
                  Dashboard
                </div>
              </Link>
            </li>

            <li className="">
              <Link
                href="/dashboard/planner"
                className="flex items-center w-full p-2 text-base font-normal text-[#cbcdd7] hover:bg-[#192555] transition duration-75 rounded-lg group "
              >
                <div className="flex-1 ml-3 text-left whitespace-nowrap">
                  Planner
                </div>
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard/pomodoro"
                className="flex items-center w-full p-2 text-base font-normal text-[#cbcdd7] hover:bg-[#192555] transition duration-75 rounded-lg group "
              >
                <div className="flex-1 ml-3 text-left whitespace-nowrap">
                  Pomodoro
                </div>
              </Link>
            </li>
            <li>
              <KanbanDropdown boards={boards} />
            </li>
            <li className="">
              <Link
                href="/dashboard/settings"
                className="flex items-center w-full p-2 text-base font-normal text-[#cbcdd7] hover:bg-[#192555] transition duration-75 rounded-lg group "
              >
                <div className="flex-1 ml-3 text-left whitespace-nowrap">
                  Settings
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
