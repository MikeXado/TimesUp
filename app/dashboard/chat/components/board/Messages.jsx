"use client";

const MessagesFrom = dynamic(() => import("./MessagesForm"));
import { useState, useRef, useEffect, useContext, useCallback } from "react";
import { clientPusher } from "../../../../../pusher";
import dynamic from "next/dynamic";
import NoMessages from "./NoMessages";
import useSWR from "swr";
import { UserContext } from "../../../contexts/UserProvider";
import { Spinner } from "flowbite-react";
const Message = dynamic(() => import("./Message"));
export default function Messages({ id, chatMembers }) {
  const [height, setHeight] = useState(50);
  const currentUserUid = useContext(UserContext);
  const getMessages = useCallback(async () => {
    const res = await fetch("/api/getMessages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, currentUserUid }),
    });
    const m = res.json();
    return m;
  }, [id, currentUserUid]);
  const {
    data: messages,
    isLoading,
    mutate,
  } = useSWR("/api/getMessages", getMessages);

  const messagesBoardRef = useRef();

  useEffect(() => {
    const channel = clientPusher.subscribe("messages");

    channel.bind("new-message", async (data) => {
      if (messages?.find((message) => message.id === data.id)) return;

      if (!messages) {
        mutate(getMessages);
        messagesBoardRef?.current?.scrollIntoView({
          block: "nearest",
        });
      } else {
        mutate(getMessages, {
          optimisticData: [data, ...messages],
          rollbackOnError: true,
        });
        messagesBoardRef?.current?.scrollIntoView({
          block: "nearest",
        });
      }
    });

    return () => {
      clientPusher.unsubscribe("messages");
    };
  }, [getMessages, messages, mutate]);

  useEffect(() => {
    messagesBoardRef?.current?.scrollIntoView({
      block: "nearest",
    });
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mt-1">
      {messages?.length === 0 ? (
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
          {messages?.map((message) => {
            return <Message key={message.id} message={message} />;
          })}
          <span ref={messagesBoardRef}></span>
        </div>
      )}
      <MessagesFrom id={id} setHeight={setHeight} chat={chatMembers} />
    </div>
  );
}
