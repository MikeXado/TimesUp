"use client";

import { useContext, useEffect, useRef, useState } from "react";
import autosize from "autosize";
import { UserContext } from "../../../contexts/UserProvider";
import { mutate } from "swr";
import { MessageType } from "../../../../../types";
import EmojiePicker from "./EmojiePicker";
export default function MessagesFrom({
  id,
  setHeight,
  chat,
  messages,
}: {
  id: string;
  setHeight: (height: number) => void;
  chat: string[];
  messages: MessageType[];
}) {
  const currentUser = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isOpenEmojiePicker, setIsOpenEmojiePicker] = useState(false);
  autosize(textareaRef.current);

  const addMessage = async () => {
    let messageObj = {
      id: id,
      message: message,
      members: chat,
      currentUser: currentUser,
    };
    if (!message) return;
    setIsFetching(true);
    const res = await fetch(`/api/v1/${currentUser}/chats/${id}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageObj),
    });
    const data = await res.json();
    mutate(`/api/v1/${currentUser}/chats/${id}/messages`, [data, ...messages]);
    setIsFetching(false);
    setMessage("");
    setIsOpenEmojiePicker(false);
  };

  const handleInput = (e) => {
    setMessage(e.target.value);
    setHeight(e.target.scrollHeight);
  };

  const handleOpen = () => {
    setIsOpenEmojiePicker((prev) => !prev);
  };

  return (
    <div className="bg-[#051139] px-0 pt-2 flex items-center justify-center w-full  sm:mb-0">
      <div className="relative flex w-full">
        <span className="absolute items-center inset-y-0 flex ">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full h-8 w-8 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              className="h-6 w-6 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              ></path>
            </svg>
          </button>
        </span>
        <textarea
          onChange={handleInput}
          value={message}
          ref={textareaRef}
          placeholder="Message"
          className="w-full bg-[#111c44] border-none m-[2px] focus:rind-[#6e6ae4] focus:border-[#6e6ae4] resize-none lg:pr-32 h-12 max-h-[200px]  text-white placeholder-white pl-10 lg:pl-12  rounded-l-md"
        />
        <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
          <div className="relative">
            <button
              onClick={handleOpen}
              type="button"
              className={
                "inline-flex items-center mr-4 justify-center rounded-full h-8 w-8 transition duration-500 ease-in-out text-gray-500 hover:bg-indigo-600 focus:outline-none" +
                (isOpenEmojiePicker ? " bg-indigo-600" : " ")
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                className="h-6 w-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </button>
            {isOpenEmojiePicker && <EmojiePicker setMessage={setMessage} />}
          </div>
        </div>
      </div>
      <button
        onClick={addMessage}
        type="button"
        className="inline-flex items-center  justify-center rounded-r-lg px-4 mr-4 py-3 transition duration-500 ease-in-out text-white bg-[#6e6ae4] hover:bg-indigo-700 focus:outline-none"
      >
        <span className="font-bold hidden lg:inline">
          {isFetching ? "..." : "Send"}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-6 w-6 ml-0 lg:ml-2 transform rotate-90"
        >
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
        </svg>
      </button>
    </div>
  );
}
