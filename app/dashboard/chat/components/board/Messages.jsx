"use client";

const MessagesFrom = dynamic(() => import("./MessagesForm"));
import { useState, useRef, useEffect } from "react";
import { clientPusher } from "../../../../../pusher";
import dynamic from "next/dynamic";
import NoMessages from "./NoMessages";
const Message = dynamic(() => import("./Message"));

export default function Messages({ id, chatMembers, chatData }) {
  const [height, setHeight] = useState(50);

  const [messages, setMessages] = useState(chatData);
  const messagesBoardRef = useRef();

  useEffect(() => {
    const channel = clientPusher.subscribe("messages");
    channel.unbind("new-message");
    channel.bind("new-message", (data) => {
      setMessages((prev) => [...prev, data]);
      console.log("New message from", data.displayName);
    });

    return () => {
      clientPusher.unsubscribe("messages");
    };
  }, []);

  useEffect(() => {
    messagesBoardRef?.current?.scrollIntoView({
      block: "nearest",
    });
  }, [messages]);

  return (
    <div className="mt-1">
      {messages?.length === 0 || chatData?.length === 0 ? (
        <NoMessages height={height} />
      ) : (
        <div
          className={`flex flex-col p-3 overflow-y-auto bg-[#051139] mt-1`}
          style={{
            height: `calc(100vh - ${
              height < 50 ? 50 : height > 200 ? 200 : height
            }px - 118px)`,
          }}
        >
          {(messages || chatData).map((message) => {
            return <Message key={message.id} message={message} />;
          })}
          <span ref={messagesBoardRef}></span>
        </div>
      )}
      <MessagesFrom id={id} setHeight={setHeight} chat={chatMembers} />
    </div>
  );
}
