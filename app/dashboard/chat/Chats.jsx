import { getAllChats } from "../../../lib/db";
import Chat from "./Chat";

export const getCurrentUser = async () => {
  const data = await fetch("https://be-better.netlify.app/api/getCurrentUser", {
    cache: "no-store",
  });
  const currentUser = await data.json();
  return currentUser;
};

export default async function Chats() {
  const currentUser = await getCurrentUser();
  const chats = await getAllChats(currentUser.uid);

  return (
    <ul className="md:flex-col md:min-w-full flex flex-col list-none">
      {chats.map((chat) => {
        return (
          <Chat
            key={chat.id}
            chat={chat}
            user={chat.user1.uid !== currentUser.uid ? chat.user1 : chat.user2}
          />
        );
      })}
    </ul>
  );
}
