"use client";

import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { Spinner } from "flowbite-react";
import { UserContext } from "../../../contexts/UserProvider";
import { ChatData, UserData } from "../../../../../types";

export default function PreferUser({ chat }: { chat: ChatData }) {
  const currentUser = useContext(UserContext);
  const router = useRouter();
  const handleCreateChatDb = () => {
    router.push(`/dashboard/chat/${chat.id}`);
  };

  const currentMember: string =
    chat.members[0] !== currentUser ? chat.members[0] : chat.members[1];

  const fetchSpecificUser = async () => {
    const data = await fetch(
      `/api/v1/${currentUser}/user-profile/${currentMember}`,
      {
        method: "GET",
      }
    );

    const user = await data.json();
    return user;
  };
  const { data, error, isLoading } = useSWR<UserData, Error>(
    `/api/v1/${currentUser}/user-profile/${currentMember}`,
    fetchSpecificUser
  );

  return (
    <>
      {isLoading ? (
        <div className="w-full justify-start py-2 my-2 ml-3">
          <Spinner />
        </div>
      ) : error ? (
        <div>Failed to fetch</div>
      ) : (
        <button
          onClick={handleCreateChatDb}
          className="flex  w-full justify-start text-start text-white hover:text-white hover:bg-[#192555] rounded-md  py-2 my-2"
        >
          <span className="bg-indigo-500 h-2 w-2 m-2 rounded-full"></span>
          <div className="flex-grow font-medium px-2">{data?.displayName}</div>
        </button>
      )}
    </>
  );
}
