"use client";

import Link from "next/link";
import Chats from "./Chats";
import { useState } from "react";
export default function Layout({ children }) {
  const [collapseShow, setCollapseShow] = useState("hidden");

  return (
    <>
      <nav className=" lg:block lg:absolute lg:h-screen lg:overflow-y-auto lg:flex-row lg:flex-nowrap lg:overflow-hidden mt-24 lg:mt-0 shadow-lg bg-white flex  items-center justify-between relative  lg:w-64 z-5 py-4 px-6">
        <div className="lg:flex-col lg:items-stretch  lg:min-h-full lg:flex-nowrap px-0 flex justify-between w-full ">
          {/* Toggler */}

          {/* Brand */}
          <div className="flex items-center justify-between w-full">
            <Link
              href="/dashboard/chat"
              className="lg:block text-left lg:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            >
              Messanger
            </Link>
            <button
              className="lg:hidden flex cursor-pointer px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
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
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M5 17H11"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M5 7H15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <ul className="lg:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              {/* <NotificationDropdown /> */}
            </li>
            <li className="inline-block relative">{/* <UserDropdown /> */}</li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "lg:flex lg:flex-col lg:items-stretch lg:opacity-100 lg:relative lg:mt-4 lg:shadow-none shadow absolute top-0 left-0 right-0 z-10 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="lg:min-w-full lg:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    href="/dashboard/chat"
                    className="lg:block text-left lg:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                  >
                    Messanger
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className=" lg:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <svg
                      width="35px"
                      height="35px"
                      viewBox="0 0 1024 1024"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="#000"
                        d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Heading */}
            <h6 className="lg:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Users
            </h6>
            {/* Navigation */}

            <Chats />
            {/* Divider */}
            <hr className="my-4 lg:min-w-full" />
            {/* Heading */}
          </div>
        </div>
      </nav>
      <div className="pr-0 lg:mt-24 mt-3 lg:pl-10  w-full">{children}</div>
    </>
  );
}
