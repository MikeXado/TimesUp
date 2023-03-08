"use client";

import React, { useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserContext } from "../../../contexts/UserProvider";

export default function UserDropdown({ currentUser }) {
  const uid = useContext(UserContext);
  const router = useRouter();
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const wrapperRef = React.useRef(null);
  const onSubmit = async () => {
    await fetch("/api/logOut");
    router.push("/signIn");
  };
  const openDropdownPopover = () => {
    setDropdownPopoverShow((prev) => !prev);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setDropdownPopoverShow(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div className="relative mx-5">
      <button
        className="flex items-center  text-lg"
        type="button"
        onClick={openDropdownPopover}
      >
        <span className="sr-only">Open user menu</span>

        <Image
          src={
            currentUser.photoUrl
              ? currentUser.photoUrl
              : "https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
          }
          alt=""
          width={50}
          height={50}
          className=" lg:w-[50px] md:w-[50px] sm:w-[50px] w-[40px] bg-gray-800 rounded-full lg:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        />
      </button>

      <div
        ref={wrapperRef}
        className={
          "z-10 absolute  top-[60px] lg:left-[-95px]  shadow-lg  bg-[#111c44] border-none divide-y divide-gray-500 rounded-lg  w-44 " +
          (dropdownPopoverShow ? " " : " hidden")
        }
      >
        <div className="px-4 py-3 text-sm text-white ">
          <div>{currentUser.displayName}</div>
          <div className="font-medium truncate text-gray-300">
            {currentUser.email}
          </div>
        </div>
        <ul
          className="py-2 text-sm text-white "
          aria-labelledby="dropdownUserAvatarButton"
        >
          <li>
            <Link
              href="/dashboard"
              className="block px-4 py-2 hover:bg-[#192555]"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/settings"
              className="block px-4 py-2 hover:bg-[#192555]"
            >
              Settings
            </Link>
          </li>
          <li>
            <Link
              href={`/dashboard/${uid}`}
              className="block px-4 py-2 hover:bg-[#192555]"
            >
              Profile
            </Link>
          </li>
        </ul>
        <div className="py-2 px-4">
          <button
            onClick={onSubmit}
            className=" w-full block px-4 py-2 text-sm text-white hover:bg-red-500 hover:text-white dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
