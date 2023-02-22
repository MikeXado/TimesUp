import dynamic from "next/dynamic";
import { getChatDb, getMessages } from "../../../../lib/db";
import { cookies } from "next/headers";
const Message = dynamic(() => import("../components/board/Message"));
const Header = dynamic(() => import("../components/Header"));

export default async function PrivateChat({ params: { uid } }) {
  const nextCookies = cookies();

  const currentUserUid = nextCookies.get("u_i").value;

  const chat = await getChatDb(uid, currentUserUid);
  const data = await getMessages(uid, currentUserUid);

  return (
    <div className="mt-24 mx-4 mb-4 overflow-hidden bg-[#111c44] rounded-lg">
      <Header
        chat={
          chat.members[0] !== currentUserUid ? chat.members[0] : chat.members[1]
        }
      />
      <div className="">
        <Message id={uid} chatMembers={chat.members} chatData={data} />
      </div>
    </div>
  );
}
