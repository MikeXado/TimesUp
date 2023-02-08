import { getCurrentUser, getSessions } from "../../lib/db";
import Chat from "./components/dashboard/chat/Chat";
import Upcomming from "./components/dashboard/upcomming/Upcomming";
import { cookies } from "next/headers";
// export const getCurrentUser = async () => {
//   const data = await fetch("http://localhost:3000/api/getCurrentUser");
//   const currentUser = await data.json();
//   return currentUser;
// };

export default async function Dashboard() {
  const nextCookies = cookies();

  const currentUser = nextCookies.get("u_i").value;

  const sessions = await getSessions(currentUser);

  return (
    <div className="flex flex-wrap lg:mt-25 mt-24">
      <div className="w-full xl:w-[60%] mb-12 xl:mb-0 px-4">
        <Upcomming sessions={sessions} />
      </div>
      <div className="w-full xl:w-[40%] lg:w-full mb-12 xl:mb-0 px-4">
        <Chat />
      </div>
    </div>
  );
}
