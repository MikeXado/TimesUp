"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import OpenSidebar from "../buttons/OpenSidebar";
import UserDropdown from "../dropdowns/UserDropdown";
import Notifications from "../dropdowns/Notifications";
export default function Navbar({ currentUser }) {
  const params: string | null = usePathname();
  const segments: Array<string> | undefined = params?.split("/");
  const path = segments && segments[2];

  return (
    <nav
      className={
        path === "chat" && segments && segments?.length >= 4
          ? "hidden "
          : "" +
            "absolute top-0 left-0 w-full pl-1 z-5 bg-transparent lg:flex-row lg:flex-nowrap lg:justify-start items-center "
      }
    >
      <div className="w-full  mx-auto items-center flex justify-between  lg:flex-nowrap flex-wrap lg:px-5 px-4 py-4">
        {/* Brand */}
        <h1 className="text-white text-sm uppercase hidden lg:inline-block font-semibold">
          Dashboard
        </h1>
        {/* Form */}
        {/* <form className="lg:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
          <div className="relative flex w-full flex-wrap items-stretch">
            <span className="z-10 h-full leading-snug font-normal  text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
              <i className="fas fa-search"></i>
            </span>
            <input
              type="text"
              placeholder="Search here..."
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
            />
          </div>
        </form> */}
        {/* User */}

        <div className="flex w-full justify-end items-center">
          <Notifications />
          <Link href="/dashboard/chat">
            <svg
              width="27"
              height="27"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.9026 9.47655L13.4593 13.0896C12.6198 13.7556 11.4387 13.7556 10.5992 13.0896L6.11841 9.47655"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.9089 21.6254C19.9502 21.6338 22 19.1349 22 16.0638V9.19541C22 6.12422 19.9502 3.6254 16.9089 3.6254H7.09114C4.04979 3.6254 2 6.12422 2 9.19541V16.0638C2 19.1349 4.04979 21.6338 7.09114 21.6254H16.9089Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          <OpenSidebar />

          {/* <UserDropdown /> */}
          <UserDropdown currentUser={currentUser} />
        </div>
      </div>
    </nav>
  );
}
