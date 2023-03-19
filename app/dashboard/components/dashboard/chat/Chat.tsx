import Search from "./Search";
import { cookies } from "next/headers";
import { UserData, ChatData } from "../../../../../types";

const getChats = async (uid) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/v1/${uid}/chats/rooms`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  const rooms = await res.json();
  return rooms;
};

const getUsers = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/v1/users`, {
    method: "GET",
    cache: "no-store",
  });
  const users = await res.json();
  return users;
};

export default async function Chat() {
  const nextCookies = cookies();

  const currentUserUid: string | undefined = nextCookies.get("u_i")?.value;

  const users: UserData[] = await getUsers();

  const filteredUsers: UserData[] = users.filter((user: UserData) => {
    return user.uid !== currentUserUid;
  });
  const rooms: { chats: ChatData[]; currentUser: string } = await getChats(
    currentUserUid
  );

  return (
    <div className="relative flex flex-col min-w-0 w-full break-words bg-[#111c44]  pb-6  mb-6 shadow-lg rounded">
      <h1 className="text-2xl font-bold pl-5 pt-5 text-white">Chat</h1>
      <Search filteredUsers={filteredUsers} rooms={rooms} />
    </div>
  );
}
