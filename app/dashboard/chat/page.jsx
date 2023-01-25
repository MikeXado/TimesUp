import dynamic from "next/dynamic";
import { getUsersDb } from "../../../lib/db";

const AddNewChat = dynamic(() => import("./AddNewChat"));
export const getCurrentUser = async () => {
  const data = await fetch(
    "https://productivity-dashboard-mikexado.vercel.app/api/getCurrentUser",
    {
      cache: "no-store",
    }
  );
  const currentUser = await data.json();
  return currentUser;
};

export default async function Messanger() {
  const currentUser = await getCurrentUser();

  const users = await getUsersDb();

  const filteredUsers = users.filter((user) => {
    return user.uid !== currentUser.uid;
  });

  return (
    <div className="relative h-[calc(100vh-50px)] flex flex-col w-full justify-center  items-center">
      <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
        Your messages
      </h1>
      <AddNewChat users={filteredUsers} />
    </div>
  );
}
