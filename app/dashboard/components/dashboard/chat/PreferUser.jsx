"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { Spinner } from "flowbite-react";
export default function PreferUser({ chat, currentUser }) {
  const router = useRouter();
  const [user, setUser] = useState({});
  const handleCreateChatDb = () => {
    router.push(`/dashboard/chat/${chat.id}`);
  };

  const currentMember =
    chat.members[0] !== currentUser ? chat.members[0] : chat.members[1];

  const fetchSpecificUser = async () => {
    const data = await fetch("/api/getSpecificUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentMember),
    });

    const user = await data.json();
    return user;
  };

  const { data, error, isLoading } = useSWR(
    "/api/getSpecificUser",
    fetchSpecificUser
  );

  return (
    <>
      {isLoading ? (
        <div className="w-full justify-start py-2 my-2 ml-3">
          <Spinner />
        </div>
      ) : (
        <button
          onClick={handleCreateChatDb}
          className="flex  w-full justify-start text-start text-gray-700 hover:text-indigo-500 hover:bg-indigo-100 rounded-md  py-2 my-2"
        >
          <span className="bg-indigo-500 h-2 w-2 m-2 rounded-full"></span>
          <div className="flex-grow font-medium px-2">{data?.displayName}</div>
        </button>
      )}
    </>
  );
}
