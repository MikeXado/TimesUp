import { getChatDb, getMessages } from "../../../../lib/db";
import { cookies } from "next/headers";
import Messages from "../components/board/Messages";
import Header from "../components/Header";

export default async function PrivateChat({ params: { uid } }) {
  const nextCookies = cookies();

  const currentUserUid = nextCookies.get("u_i").value;

  const chat = await getChatDb(uid, currentUserUid);
  const data = await getMessages(uid, currentUserUid);

  return (
    <div className="mt-2 mx-2 lg:mx-4 mb-4 overflow-hidden bg-[#111c44] rounded-lg">
      <Header
        chat={
          chat.members[0] !== currentUserUid ? chat.members[0] : chat.members[1]
        }
      />
      <div className="">
        <Messages id={uid} chatMembers={chat.members} chatData={data} />
      </div>
    </div>
  );
}
