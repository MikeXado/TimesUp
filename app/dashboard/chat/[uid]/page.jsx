import dynamic from "next/dynamic";
import { getChatDb, getMessages } from "../../../../lib/db";

const Message = dynamic(() => import("../components/board/Message"));
const Header = dynamic(() => import("../components/Header"));

const getCurrentUser = async () => {
  const data = await fetch("https://be-better.netlify.app/api/getCurrentUser", {
    cache: "no-store",
  });
  let user = await data.json();
  return user;
};

export default async function PrivateChat({ params: { uid } }) {
  const currentUser = await getCurrentUser();

  const chat = await getChatDb(uid, currentUser.uid);
  const data = await getMessages(uid, currentUser.uid);

  return (
    <div className="md:ml-56 relative overflow-hidden">
      <Header
        chat={chat.user1.uid !== currentUser.uid ? chat.user1 : chat.user2}
      />
      <div className="">
        <Message
          id={uid}
          uid={currentUser.uid}
          chatMembers={chat.members}
          chatData={data}
        />
      </div>
    </div>
  );
}
