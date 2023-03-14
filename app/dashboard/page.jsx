import { getSessions } from "../../lib/db";
const Chat = dynamic(() => import("./components/dashboard/chat/Chat"));
const Upcomming = dynamic(() =>
  import("./components/dashboard/upcomming/Upcomming")
);
import { cookies } from "next/headers";
import dynamic from "next/dynamic";

export default async function Dashboard() {
  const nextCookies = cookies();

  const currentUser = nextCookies.get("u_i").value;

  const sessions = await getSessions(currentUser);

  return (
    <div className="flex flex-wrap lg:mt-25 mt-24">
      <div className="w-full xl:w-[60%] mb-12 xl:mb-0 px-4">
        {sessions && <Upcomming sessions={sessions} />}
      </div>
      <div className="w-full xl:w-[40%] lg:w-full mb-12 xl:mb-0 px-4">
        <Chat />
      </div>
    </div>
  );
}
