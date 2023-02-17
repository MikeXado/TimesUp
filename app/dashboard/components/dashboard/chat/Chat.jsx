import Search from "./Search";
import { getAllChats, getUsersDb } from "../../../../../lib/db";
import { cookies } from "next/headers";
export default async function Chat() {
  const nextCookies = cookies();

  const currentUserUid = nextCookies.get("u_i").value;

  const users = await getUsersDb();

  const filteredUsers = users.filter((user) => {
    return user.uid !== currentUserUid;
  });
  const chats = await getAllChats(currentUserUid);

  return (
    <div className="relative flex flex-col min-w-0 w-full break-words bg-white pb-6  mb-6 shadow-lg rounded">
      <h1 className="text-2xl font-bold pl-5 pt-5">Chat</h1>
      <Search filteredUsers={filteredUsers} chats={chats} />
    </div>
  );
}
