"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { NavbarContext } from "../../../contexts/NavbarContext";
import KanbanOpenDrawer from "../buttons/KanbanOpenDrawer";
import ChatOpenDrawer from "../buttons/ChatOpenDrawer";
export default function Sidebar() {
  const { isOpen, setIsOpen } = useContext(NavbarContext);

  const handleOpenSidebar = () => {
    setIsOpen(false);
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
                <svg
                  width={30}
                  height={30}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M9.15722 21.3968V18.3301C9.1572 17.55 9.79312 16.9162 10.581 16.911H13.4671C14.2587 16.911 14.9005 17.5463 14.9005 18.3301V18.3301V21.4063C14.9003 22.0686 15.4343 22.6099 16.103 22.6254H18.0271C19.9451 22.6254 21.5 21.0861 21.5 19.1872V19.1872V10.4632C21.4898 9.71622 21.1355 9.01475 20.538 8.55843L13.9577 3.3107C12.8049 2.39696 11.1662 2.39696 10.0134 3.3107L3.46203 8.56795C2.86226 9.02242 2.50739 9.72506 2.5 10.4728V19.1872C2.5 21.0861 4.05488 22.6254 5.97291 22.6254H7.89696C8.58235 22.6254 9.13797 22.0753 9.13797 21.3968V21.3968"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex-1 ml-3 text-left whitespace-nowrap">
                  Dashboard
                </div>
              </Link>
            </li>

            <li>
              <ChatOpenDrawer />
            </li>

            <li className="">
              <Link
                href="/dashboard/planner"
                className="flex items-center w-full p-2 text-base font-normal text-[#cbcdd7] hover:bg-[#192555] transition duration-75 rounded-lg group "
              >
                <svg
                  width={30}
                  height={30}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M1.09265 8.40427H18.9166"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.4421 12.3097H14.4514"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.0046 12.3097H10.0139"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.5579 12.3097H5.56717"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.4421 16.1962H14.4514"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.0046 16.1962H10.0139"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.5579 16.1962H5.56717"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.0437 1V4.29078"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.96552 1V4.29078"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.2383 2.57919H5.77096C2.83427 2.57919 1 4.21513 1 7.22222V16.2719C1 19.3262 2.83427 21 5.77096 21H14.229C17.175 21 19 19.3546 19 16.3475V7.22222C19.0092 4.21513 17.1842 2.57919 14.2383 2.57919Z"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
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
                <svg
                  width={30}
                  height={30}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M21.2498 12.6259C21.2498 17.7349 17.1088 21.8759 11.9998 21.8759C6.89082 21.8759 2.74982 17.7349 2.74982 12.6259C2.74982 7.5169 6.89082 3.3759 11.9998 3.3759C17.1088 3.3759 21.2498 7.5169 21.2498 12.6259Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.4314 15.5683L11.6614 13.3193V8.4723"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex-1 ml-3 text-left whitespace-nowrap">
                  Pomodoro
                </div>
              </Link>
            </li>
            <li>
              <KanbanOpenDrawer />
            </li>

            <li className="">
              <Link
                href="/dashboard/settings"
                className="flex items-center w-full p-2 text-base font-normal text-[#cbcdd7] hover:bg-[#192555] transition duration-75 rounded-lg group "
              >
                <svg
                  width={30}
                  height={30}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.8067 8.24897L20.1842 7.16888C19.6577 6.25495 18.4907 5.93967 17.5755 6.46407V6.46407C17.1399 6.7207 16.6201 6.79351 16.1307 6.66644C15.6413 6.53937 15.2226 6.22287 14.9668 5.78672C14.8023 5.5095 14.7139 5.19375 14.7105 4.87139V4.87139C14.7254 4.35457 14.5304 3.85375 14.17 3.48302C13.8096 3.11229 13.3145 2.90322 12.7975 2.90343H11.5435C11.037 2.90342 10.5513 3.10527 10.194 3.4643C9.83669 3.82333 9.63717 4.30995 9.63961 4.81647V4.81647C9.6246 5.86228 8.77248 6.70216 7.72657 6.70206C7.40421 6.69871 7.08846 6.6103 6.81123 6.44576V6.44576C5.89606 5.92137 4.72911 6.23665 4.20254 7.15057L3.53435 8.24897C3.00841 9.16175 3.3194 10.328 4.23 10.8577V10.8577C4.8219 11.1994 5.18653 11.8309 5.18653 12.5144C5.18653 13.1979 4.8219 13.8294 4.23 14.1712V14.1712C3.32056 14.6973 3.00923 15.8607 3.53435 16.7707V16.7707L4.16593 17.86C4.41265 18.3051 4.8266 18.6336 5.31619 18.7728C5.80578 18.9119 6.33064 18.8502 6.77462 18.6014V18.6014C7.21108 18.3467 7.73119 18.2769 8.21934 18.4075C8.70749 18.5382 9.12324 18.8584 9.37416 19.297C9.5387 19.5742 9.62711 19.89 9.63046 20.2124V20.2124C9.63046 21.2689 10.487 22.1254 11.5435 22.1254H12.7975C13.8505 22.1254 14.7055 21.2745 14.7105 20.2215V20.2215C14.7081 19.7134 14.9089 19.2254 15.2682 18.8661C15.6275 18.5068 16.1155 18.306 16.6236 18.3085C16.9452 18.3171 17.2596 18.4051 17.5389 18.5648V18.5648C18.4517 19.0907 19.6179 18.7797 20.1476 17.8691V17.8691L20.8067 16.7707C21.0618 16.3329 21.1318 15.8114 21.0012 15.3217C20.8706 14.8321 20.5502 14.4147 20.111 14.162V14.162C19.6718 13.9093 19.3514 13.4919 19.2208 13.0023C19.0902 12.5127 19.1603 11.9912 19.4154 11.5533C19.5812 11.2637 19.8214 11.0236 20.111 10.8577V10.8577C21.0161 10.3282 21.3264 9.16885 20.8067 8.25812V8.25812V8.24897Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12.1751"
                    cy="12.5144"
                    r="2.63616"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
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
