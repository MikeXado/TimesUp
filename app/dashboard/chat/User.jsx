"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { revalidate } from "../components/dashboard/SwrConfig";
import { UserContext } from "../contexts/UserProvider";

export default function User({ user }) {
  const currentUser = useContext(UserContext);
  const router = useRouter();
  const handleCreateChatDb = async () => {
    const combinedUid = await fetch("/api/createChatDb", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...user, currentUser: currentUser }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });

    await revalidate();

    return router.push(`/dashboard/chat/${combinedUid}`);
  };

  return (
    <li className="pb-2">
      <button
        onClick={handleCreateChatDb}
        className="flex items-center text-base sm:items-center py-1 font-normal text-gray-900 rounded-lg"
      >
        <div className="relative flex items-center space-x-2">
          <div className="relative">
            <span className="absolute text-green-500 right-0 bottom-0">
              <svg width="20" height="20">
                <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
              </svg>
            </span>
            <Image
              src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
              alt=""
              width={50}
              height={50}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <div className="text-lg mt-1 flex items-center">
              <span className="text-gray-700 mr-3">{user.displayName}</span>
            </div>
          </div>
        </div>
      </button>
    </li>
  );
}
