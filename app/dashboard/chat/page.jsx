import dynamic from "next/dynamic";
import { getUsersDb } from "../../../lib/db";
import { cookies } from "next/headers";
const AddNewChat = dynamic(() => import("./AddNewChat"));

export default async function Messanger() {
  const nextCookies = cookies();

  const currentUserUid = nextCookies.get("u_i").value;

  const users = await getUsersDb();

  const filteredUsers = users.filter((user) => {
    return user.uid !== currentUserUid;
  });

  return (
    <div className="h-[calc(100vh-50px)] flex flex-col  max-w-full justify-center  items-center">
      <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
        Your messages
      </h1>
      <AddNewChat users={filteredUsers} />
    </div>
  );
}
