"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// import NotificationDropdown from "components/Dropdowns/NotificationDropdown.js";
// import UserDropdown from "components/Dropdowns/UserDropdown.js";

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const params = usePathname();
  let newParam = params.substring("/dashboard/".length);

  return (
    <>
      <nav className="lg:left-0 lg:block lg:fixed lg:top-0  lg:bottom-0 overflow-y-auto lg:flex-row lg:flex-nowrap  shadow-xl bg-[#1E0059] flex  items-center justify-between relative lg:w-28 z-10 py-4 px-6">
        <div className="lg:flex-col lg:items-stretch lg:min-h-full lg:flex-nowrap px-0 flex  items-center justify-between w-full mx-auto ">
          <Link
            href="/"
            className=" lg:pb-2 text-white mr-0 w-full flex items-center lg:justify-center  text-lg uppercase font-bold lg:pt-4 "
          >
            Control
          </Link>
          <button
            className=" cursor-pointer lg:hidden py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white py-3 px-6")}
          >
            <svg
              width="35px"
              height="35px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12H18"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M5 17H11"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M5 7H15"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <ul className="lg:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              {/* <NotificationDropdown /> */}
            </li>
            <li className="inline-block relative">{/* <UserDropdown /> */}</li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "lg:flex lg:flex-col lg:items-stretch  lg:opacity-100 lg:relative lg:mt-4 lg:shadow-none h-screen overflow-y-auto bg-[#1E0059] shadow fixed top-0 left-0 right-0 z-50  m-0 w-full items-center flex-1 " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="lg:min-w-full lg:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200 ">
              <div className="flex w-full items-center">
                <div className="">
                  <Link
                    href="/"
                    className="text-center lg:pb-2 text-white mr-0 flex justify-center w-full  text-lg uppercase font-bold p-4 px-0"
                  >
                    Control
                  </Link>
                </div>
                <div className="w-full flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer lg:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <svg
                      width="35px"
                      height="35px"
                      viewBox="0 0 1024 1024"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="#fff"
                        d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            {/* <form className="mt-6 mb-4 lg:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className=" px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form> */}

            {/* Navigation */}
            <ul className="lg:flex-col lg:min-w-full flex flex-col list-none lg:items-center">
              <li className=" mb-10">
                <Link
                  href="/dashboard"
                  className={
                    "text-xs flex items-center uppercase  font-bold  py-2 px-3 rounded-lg hover:bg-[#754BE5]" +
                    (!newParam ? " bg-[#754BE5]" : " ")
                  }
                >
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.15722 21.3968V18.3301C9.1572 17.55 9.79312 16.9162 10.581 16.911H13.4671C14.2587 16.911 14.9005 17.5463 14.9005 18.3301V18.3301V21.4063C14.9003 22.0686 15.4343 22.6099 16.103 22.6254H18.0271C19.9451 22.6254 21.5 21.0861 21.5 19.1872V19.1872V10.4632C21.4898 9.71622 21.1355 9.01475 20.538 8.55843L13.9577 3.3107C12.8049 2.39696 11.1662 2.39696 10.0134 3.3107L3.46203 8.56795C2.86226 9.02242 2.50739 9.72506 2.5 10.4728V19.1872C2.5 21.0861 4.05488 22.6254 5.97291 22.6254H7.89696C8.58235 22.6254 9.13797 22.0753 9.13797 21.3968V21.3968"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="lg:hidden ml-3 text-white text-lg">
                    Dashboard
                  </div>
                </Link>
              </li>

              <li className="items-center mb-10">
                <Link
                  href="/dashboard/planner"
                  className={
                    "text-xs uppercase flex items-center  font-bold  py-2 px-3  rounded-lg hover:bg-[#754BE5]" +
                    (newParam === "planner" ? " bg-[#754BE5]" : " ")
                  }
                >
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 20 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
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
                  <div className="lg:hidden ml-3 text-white text-lg">
                    Planner
                  </div>
                </Link>
              </li>

              <li className="items-center mb-10">
                <Link
                  href="/dashboard/pomodoro"
                  className={
                    "text-xs uppercase flex items-center  font-bold  py-2 px-3  rounded-lg hover:bg-[#754BE5]" +
                    (newParam === "pomodoro" ? " bg-[#754BE5]" : " ")
                  }
                >
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
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
                  <div className="lg:hidden ml-3 text-white text-lg">
                    Pomodoro
                  </div>
                </Link>
              </li>
              <li className="items-center mb-10">
                <Link
                  href="/dashboard/kanban"
                  className={
                    "text-xs uppercase flex items-center font-bold py-2 px-3  rounded-lg hover:bg-[#754BE5]" +
                    (newParam === "kanban" ? " bg-[#754BE5]" : " ")
                  }
                >
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.7162 16.8488H8.49622"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.7162 12.6623H8.49622"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.2513 8.4855H8.49634"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.9086 3.3752C15.9086 3.3752 8.23161 3.3792 8.21961 3.3792C5.45961 3.3962 3.75061 5.2122 3.75061 7.9822V17.1782C3.75061 19.9622 5.47261 21.7852 8.25661 21.7852C8.25661 21.7852 15.9326 21.7822 15.9456 21.7822C18.7056 21.7652 20.4156 19.9482 20.4156 17.1782V7.9822C20.4156 5.1982 18.6926 3.3752 15.9086 3.3752Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="lg:hidden ml-3 text-white text-lg">
                    Kanban
                  </div>
                </Link>
              </li>
              <li className="items-center mb-10">
                <Link
                  href="/dashboard/settings"
                  className={
                    "text-xs uppercase flex items-center font-bold   py-2 px-3  rounded-lg hover:bg-[#754BE5]" +
                    (newParam === "settings" ? " bg-[#754BE5]" : " ")
                  }
                >
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
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
                  <div className="lg:hidden ml-3 text-white text-lg">
                    Settings
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
