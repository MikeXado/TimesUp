import Search from "./Search";
import { getAllChats, getUsersDb } from "../../../../../lib/db";
import { cookies } from "next/headers";
import { UserData, ChatData } from "../../../../../types";
export default async function Chat() {
  const nextCookies = cookies();

  const currentUserUid: string | undefined = nextCookies.get("u_i")?.value;

  const users: UserData[] = await getUsersDb();

  const filteredUsers: UserData[] = users.filter((user: UserData) => {
    return user.uid !== currentUserUid;
  });
  const chats: ChatData[] = await getAllChats(currentUserUid);
  return (
    <div className="relative flex flex-col min-w-0 w-full break-words bg-[#111c44]  pb-6  mb-6 shadow-lg rounded">
      <h1 className="text-2xl font-bold pl-5 pt-5 text-white">Chat</h1>
      <Search filteredUsers={filteredUsers} chats={chats} />
    </div>
  );
}
