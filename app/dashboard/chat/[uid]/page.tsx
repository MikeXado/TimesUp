import React from "react";
import { cookies } from "next/headers";
import Messages from "../components/board/Messages";
import Header from "../components/Header";
import { ChatData, MessageType } from "../../../../types";

const getChatDb = async (id, uid) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/v1/${uid}/chats/${id}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  const chatData = await res.json();
  return chatData;
};

const getMessages = async (uid, currentUserUid) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/v1/${currentUserUid}/chats/${uid}/messages`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  const messages = await res.json();
  return messages;
};

export default async function PrivateChat({ params: { uid } }) {
  const nextCookies = cookies();

  const currentUserUid = nextCookies.get("u_i")?.value;

  const chat = await getChatDb(uid, currentUserUid);

  const data: MessageType[] = await getMessages(uid, currentUserUid);

  return (
    <div className="mt-2 mx-2 lg:mx-4 mb-4 overflow-hidden bg-[#111c44] rounded-lg">
      {/* @ts-expect-error Async Server Component */}
      <Header
        chat={
          chat?.members[0] !== currentUserUid
            ? chat?.members[0]
            : chat?.members[1]
        }
      />
      <div className="">
        <Messages id={uid} chatMembers={chat?.members} chatData={data} />
      </div>
    </div>
  );
}
