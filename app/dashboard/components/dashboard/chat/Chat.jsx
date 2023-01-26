import Search from "./Search";
import { getAllChats, getCurrentUser, getUsersDb } from "../../../../../lib/db";
import { useStore } from "../../../../../utils/store";
export default async function Chat() {
  const currentUser = await getCurrentUser();
  const users = await getUsersDb();

  const filteredUsers = users.filter((user) => {
    return user.uid !== currentUser.uid;
  });
  const chats = await getAllChats(currentUser.uid);

  return (
    <div className="relative flex flex-col min-w-0 w-full break-words bg-white  mb-6 shadow-lg rounded">
      <h1 className="text-2xl font-bold pl-5 pt-5">Chat</h1>
      <Search
        filteredUsers={filteredUsers}
        chats={chats}
        currentUser={currentUser}
      />
    </div>
  );
}
