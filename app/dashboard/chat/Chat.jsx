"use client";

import { Spinner } from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useSWR from "swr";
export default function Chat({ chat, user }) {
  const router = useRouter();
  const getChatId = () => {
    router.push(`/dashboard/chat/${chat.id}`);
  };

  const fetchSpecificUser = async () => {
    const data = await fetch("/api/getSpecificUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const userInfo = await data.json();
    return userInfo;
  };

  const { data, error, isLoading } = useSWR(
    "/api/getSpecificUser",
    fetchSpecificUser
  );

  return (
    <>
      {isLoading ? (
        <div className="items-center">
          <Spinner />
        </div>
      ) : (
        <li className="items-center">
          <button
            onClick={getChatId}
            className="flex items-center text-base sm:items-center py-1 font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <div className="relative flex items-center space-x-2">
              <div className="relative">
                <span className="absolute text-green-500 right-0 bottom-0">
                  <svg width="20" height="20">
                    <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                  </svg>
                </span>
                <Image
                  src={
                    data.photoUrl
                      ? data.photoUrl
                      : "https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                  }
                  alt=""
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <div className="text-lg mt-1 flex items-center">
                  <span className="text-gray-700 mr-3">{data.displayName}</span>
                </div>
              </div>
            </div>
          </button>
        </li>
      )}
    </>
  );
}
