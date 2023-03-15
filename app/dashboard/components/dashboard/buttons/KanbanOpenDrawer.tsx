"use client";

import React, { useContext } from "react";
import { KanbanDrawerContext } from "../../../contexts/KanbanDrawerProvider";

export default function KanbanDropdown() {
  const { setIsOpen } = useContext(KanbanDrawerContext);
  const handleOpenDropDown = () => {
    setIsOpen((prev: boolean) => !prev);
  };

  return (
    <button
      onClick={handleOpenDropDown}
      type="button"
      className="flex items-center w-full p-2 text-base font-normal text-[#cbcdd7] hover:bg-[#192555] transition duration-75 rounded-lg group "
    >
      <svg
        width={30}
        viewBox="0 0 24 25"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <path
          d="M15.7162 16.8488H8.49622"
          stroke="#cbcdd7"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.7162 12.6623H8.49622"
          stroke="#cbcdd7"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.2513 8.4855H8.49634"
          stroke="#cbcdd7"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.9086 3.3752C15.9086 3.3752 8.23161 3.3792 8.21961 3.3792C5.45961 3.3962 3.75061 5.2122 3.75061 7.9822V17.1782C3.75061 19.9622 5.47261 21.7852 8.25661 21.7852C8.25661 21.7852 15.9326 21.7822 15.9456 21.7822C18.7056 21.7652 20.4156 19.9482 20.4156 17.1782V7.9822C20.4156 5.1982 18.6926 3.3752 15.9086 3.3752Z"
          stroke="#cbcdd7"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <span className="flex-1 ml-3 text-left whitespace-nowrap">Kanban</span>
      <svg
        className="w-6 h-6 -rotate-90 group-hover:-translate-x-1/2 group-hover:transition-all transition-all"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        ></path>
      </svg>
    </button>
  );
}
