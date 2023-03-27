"use client";

import { useContext, useEffect, useRef, useState } from "react";
import autosize from "autosize";
import { UserContext } from "../../../contexts/UserProvider";
import { mutate } from "swr";
import { MessageType } from "../../../../../types";
import EmojiePicker from "./EmojiePicker";
import VoiceMessage from "./VoiceMessage";
import VoicePlayer from "./VoicePlayer";
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
  const [message, setMessage] = useState<{ value: string; type: string }>();
  const [isFetching, setIsFetching] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [recording, setRecording] = useState(false);
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
    setMessage({
      value: "",
      type: "",
    });
    setIsOpenEmojiePicker(false);
  };

  const handleInput = (e) => {
    setMessage({ value: e.target.value, type: "text" });
    setHeight(e.target.scrollHeight);
  };

  const handleOpen = () => {
    setIsOpenEmojiePicker((prev) => !prev);
  };

  console.log(message);

  return (
    <div className="bg-[#051139] px-0 pt-2 flex items-center justify-center w-full  sm:mb-0">
      <div className="relative flex w-full">
        <div className="absolute left-2 items-center inset-y-0 hidden sm:flex">
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
        <textarea
          onChange={handleInput}
          value={message?.type === "text" ? message?.value : ""}
          ref={textareaRef}
          disabled={recording}
          placeholder={recording ? "" : "Message"}
          className={
            "w-full bg-[#111c44] border-none m-[2px] focus:rind-[#6e6ae4] focus:border-[#6e6ae4] resize-none lg:pr-32 h-12 max-h-[200px]  text-white placeholder-white pl-10 lg:pl-12  rounded-l-md" +
            (recording && " placeholder-opacity-50")
          }
        />
        {message?.type === "audio" && (
          <div className={"absolute items-center inset-y-0 right-[200px]"}>
            <VoicePlayer audioUrl={message?.value} />
          </div>
        )}

        <VoiceMessage
          setMessage={setMessage}
          recording={recording}
          setRecording={setRecording}
        />
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
