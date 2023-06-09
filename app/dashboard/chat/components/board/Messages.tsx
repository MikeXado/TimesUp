"use client";

const MessagesFrom = dynamic(() => import("./MessagesForm"));
import { useState, useEffect, useContext, useCallback } from "react";
import { clientPusher } from "../../../../../pusher";
import dynamic from "next/dynamic";
import NoMessages from "./NoMessages";
import useSWR from "swr";
import { UserContext } from "../../../contexts/UserProvider";
import { Spinner } from "flowbite-react";
import { NotificationsContext } from "../../../contexts/NotificationsProvider";
import { MessageType } from "../../../../../types";


const Message = dynamic(() => import("./Message"));

interface MessagesPropsTypes {
  id: string;
  chatMembers: string[];
  chatData: MessageType[];
}

export default function Messages({
  id,
  chatMembers,
  chatData,
}: MessagesPropsTypes) {
  const uid = useContext(UserContext);
  const { addNotification } = useContext(NotificationsContext);
  const [height, setHeight] = useState(50);

  const getMessages = useCallback(async () => {
    const res = await fetch(`/api/v1/${uid}/chats/${id}/messages`, {
      method: "GET",
      
    });
    const m = await res.json();
    return m;
  }, [id, uid]);
  const {
    data: messages,
    isLoading,
    mutate,
  } = useSWR<MessageType[]>(
    `/api/v1/${uid}/chats/${id}/messages`,
    getMessages,
    {
      fallbackData: chatData,
      dedupingInterval: 1000,
      revalidateOnMount: true,
    }
  );

  const handleNewMessage = useCallback(
    (data) => {
      if (messages?.find((message) => message.id === data.id)) return;
      console.log(data);
      mutate([data, ...messages]);

      addNotification({
        ...data,
        receiver: chatMembers.find((el) => el !== data.uid),
      });
    },
    [addNotification, messages, mutate, chatMembers]
  );

  useEffect(() => {
    const channel = clientPusher.subscribe("messages");
    channel.bind("new-message", handleNewMessage);

    return () => {
      clientPusher.unsubscribe("messages");
    };
  }, [handleNewMessage]);

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
          className={`flex flex-col-reverse p-3 overflow-y-auto bg-[#051139] mt-1`}
          style={{
            height: `calc(100vh - ${
              height < 50 ? 50 : height > 200 ? 200 : height
            }px - 118px)`,
          }}
        >
          {messages?.map((data) => {
            return <Message key={data.id} data={data} />;
          })}
        </div>
      )}
      <MessagesFrom id={id} setHeight={setHeight} chat={chatMembers} />
    </div>
  );
}
