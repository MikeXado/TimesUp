import Search from "./Search";
import { cookies } from "next/headers";
import { UserData, ChatData } from "../../../../../types";

import { getAllChats, getUsersDb } from "../../../../../lib/db";

export default async function Chat() {
  const nextCookies = cookies();

  const currentUserUid: string | undefined = nextCookies.get("u_i")?.value;

  const users: UserData[] = await getUsersDb();

  const filteredUsers: UserData[] = users.filter((user: UserData) => {
    return user.uid !== currentUserUid;
  });
  const rooms: ChatData[] = await getAllChats(currentUserUid);
  const newRooms: { chats: ChatData[]; currentUser: string | undefined } = {
    chats: rooms,
    currentUser: currentUserUid,
  };

  return (
    <div className="flex flex-col min-w-0 w-full h-full break-words bg-[#111c44]  pb-6  mb-6 shadow-lg rounded">
      <h1 className="text-2xl font-bold pl-5 pt-5 text-white">Chat</h1>
      <Search filteredUsers={filteredUsers} rooms={newRooms} />
    </div>
  );
}
