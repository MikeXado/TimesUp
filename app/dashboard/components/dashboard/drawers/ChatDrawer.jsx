"use client";

import Chat from "../../../chat/Chat";
import useSWR from "swr";
import { useContext } from "react";
import { ChatDrawerContext } from "../../../contexts/ChatDrawerProvider";
import { UserContext } from "../../../contexts/UserProvider";
import { NavbarContext } from "../../../contexts/NavbarContext";
export default function ChatDrawer({ chats }) {
  const uid = useContext(UserContext);
  const { isOpen, setIsOpen } = useContext(ChatDrawerContext);
  const { isOpen: navbarStatus } = useContext(NavbarContext);

  const handleOpenSidebar = () => {
    setIsOpen(false);
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
      <div
        className={
          "fixed top-0 lg:left-[290px] z-40 h-screen p-4 overflow-y-auto  duration-500 ease-in-out  bg-[#111c44] w-72" +
          (isOpen ? " " : " hidden") +
          (navbarStatus ? " md:left-[290px] sm:left-0 left-0" : " ")
        }
      >
        <h5 className="text-base font-semibold text-white uppercase ">Chats</h5>
        <button
          onClick={handleOpenSidebar}
          type="button"
          className="text-[#cbcdd7] bg-transparent hover:bg-[#192555] rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center"
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
        </div>
      </div>
    </>
  );
}
