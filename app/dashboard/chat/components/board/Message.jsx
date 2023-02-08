"use client";

import MessagesFrom from "./MessagesForm";
import { useState, useRef, useEffect } from "react";
import { clientPusher } from "../../../../../pusher";

export default function Message({ id, uid, chatMembers, chatData }) {
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
    <div className=" bg-white mt-1 pb-1">
      {messages?.length === 0 || chatData?.length === 0 ? (
        <div
          className="justify-center overflow-y-auto items-center w-full flex flex-col p-3 "
          style={{
            height: `calc(100vh - ${
              height < 50 ? 50 : height > 200 ? 200 : height
            }px - 200px)`,
          }}
        >
          No messages yet
        </div>
      ) : (
        <>
          <div
            className={`flex flex-col p-3 overflow-y-auto bg-white mt-1`}
            style={{
              height: `calc(100vh - ${
                height < 50 ? 50 : height > 200 ? 200 : height
              }px - 200px)`,
            }}
          >
            {(messages || chatData).map((message, index) => {
              return (
                <div key={message.id} className="chat-message mb-5">
                  <div
                    className={
                      "flex items-end" +
                      (uid === message.uid ? " justify-end" : " justify-start")
                    }
                  >
                    <div
                      className={
                        "flex flex-col space-y-2 text-sm max-w-xs mx-2 order-2" +
                        (uid === message.uid ? " items-end" : " items-start")
                      }
                    >
                      <div>
                        <span
                          className={
                            "px-4 py-2 inline-block bg-indigo-500 break-all text-white" +
                            (uid === message.uid
                              ? " rounded-l-lg rounded-tr-lg"
                              : " rounded-r-lg rounded-tl-lg")
                          }
                        >
                          {message.message}
                        </span>
                      </div>
                      {/* <div>
                        <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-blue-400 text-white">
                          I have no issue with any other packages installed with
                          root permission globally.
                        </span>
                      </div> */}
                    </div>
                    {/* <img
                      src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                      alt="My profile"
                      className="w-6 h-6 rounded-full order-1"
                    /> */}
                  </div>
                </div>
              );
            })}
            <span ref={messagesBoardRef}></span>
          </div>
        </>
      )}
      <MessagesFrom
        id={id}
        currentUser={uid}
        setHeight={setHeight}
        chat={chatMembers}
      />
    </div>
  );
}
