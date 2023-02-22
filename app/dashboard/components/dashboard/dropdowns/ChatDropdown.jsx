"use client";

import React, { useContext } from "react";
import { UserContext } from "../../../contexts/UserProvider";
import { Icon } from "../../Icon";
import useSWR from "swr";
import Chat from "../../../chat/Chat";
export default function ChatDropdown({ chats }) {
  const uid = useContext(UserContext);

  const [isOpen, setIsOpen] = React.useState(false);
  const handleOpenDropDown = () => {
    setIsOpen((prev) => !prev);
  };

  const boardsFetcher = async () => {
    const data = await fetch("/api/getChats", {
      method: "GET",
    });
    const chats = await data.json();
    return chats;
  };

  const { data } = useSWR("/api/getChats", boardsFetcher, {
    fallbackData: { chats, currentUser: uid },
    revalidateOnMount: true,
  });

  return (
    <>
      <button
        onClick={handleOpenDropDown}
        type="button"
        className="flex items-center w-full p-2 text-base font-normal text-[#cbcdd7] hover:bg-[#192555] transition duration-75 rounded-lg group "
      >
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

        <span className="flex-1 ml-3 text-left whitespace-nowrap">Chats</span>
        <svg
          className="w-6 h-6"
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
      <ul className={"py-2 space-y-2" + (isOpen ? " " : " hidden")}>
        {data?.chats?.map((chat) => {
          return (
            <Chat
              key={chat.id}
              chat={chat}
              user={
                chat.members[0] !== data.currentUser
                  ? chat.members[0]
                  : chat.members[1]
              }
            />
          );
        })}
      </ul>
    </>
  );
}
