// import { getAllChats } from "../../../lib/db";
import Chat from "./Chat";
// import { cookies } from "next/headers";
import useSWR from "swr";
export default function Chats() {
  // const nextCookies = cookies();

  // const currentUserUid = nextCookies.get("u_i").value;
  // const chats = await getAllChats(currentUserUid);

  const chatFetcher = async () => {
    const res = await fetch("/api/getChats");
    const chats = await res.json();
    return chats;
  };
  const { data, isLoading } = useSWR("/api/getChats", chatFetcher);

  return (
    <ul className="md:flex-col md:min-w-full flex flex-col list-none">
      {data?.chats?.map((chat) => {
        return (
          <Chat
            key={chat.id}
            chat={chat}
            user={
              chat.members[0] !== data.currentUser
                ? chat.members[0]
                : chat.members[1]
            }
          />
        );
      })}
    </ul>
  );
}
