import React from "react";
import { useRouter } from "next/navigation";
import { useStore } from "../../../../../utils/store";
export default function PreferUser({ chat }) {
  const router = useRouter();
  const currentUser = useStore.getState();
  const handleCreateChatDb = () => {
    router.push(`/dashboard/chat/${chat.id}`);
  };

  return (
    <button
      onClick={handleCreateChatDb}
      className="flex  w-full justify-start text-start text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md  py-2 my-2"
    >
      <span className="bg-gray-400 h-2 w-2 m-2 rounded-full"></span>
      <div className="flex-grow font-medium px-2">
        {chat.user1.uid !== currentUser.uid
          ? chat.user1.displayName
          : chat.user2.displayName}
      </div>
    </button>
  );
}
