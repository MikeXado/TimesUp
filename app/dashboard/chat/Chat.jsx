"use client";

import { Spinner } from "flowbite-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import useSWR from "swr";
export default function Chat({ chat, user }) {
  const router = useRouter();
  const pathname = usePathname();

  const slicePath = pathname.substring("/dashboard/chat/".length);

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
        <li className="flex items-center w-full p-2 text-base font-normal text-[#cbcdd7] transition duration-75 rounded-lg pl-0">
          <button
            onClick={getChatId}
            className={
              "flex items-center w-full pl-2 py-2 text-base sm:items-center font-normal hover:bg-[#192555] text-white rounded-lg " +
              (slicePath === chat.id ? " bg-[#192555]  text-[#cbcdd7]" : " ")
            }
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
                  alt="avatar"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <div className="text-lg mt-1 flex items-center">
                  <span className="text-white mr-3">{data.displayName}</span>
                </div>
              </div>
            </div>
          </button>
        </li>
      )}
    </>
  );
}
