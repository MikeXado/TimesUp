import { getSessions } from "../../lib/db";
import { useStore } from "../../utils/store";
import Chat from "./components/dashboard/chat/Chat";
import Upcomming from "./components/dashboard/upcomming/Upcomming";

export const getCurrentUser = async () => {
  const data = await fetch("https://be-better.netlify.app/api/getCurrentUser", {
    cache: "no-store",
  });
  const currentUser = await data.json();
  return currentUser;
};

export default async function Dashboard() {
  const currentUser = await getCurrentUser();
  useStore.setState({
    displayName: currentUser.displayName,
    email: currentUser.email,
    uid: currentUser.uid,
  });

  console.log(currentUser);

  const sessions = await getSessions(currentUser.uid);

  return (
    <div className="flex flex-wrap mt-4">
      <div className="w-full xl:w-[60%] mb-12 xl:mb-0 px-4">
        <Upcomming sessions={sessions} />
      </div>
      <div className="w-full xl:w-[40%] lg:w-full mb-12 xl:mb-0 px-4">
        <Chat />
      </div>
    </div>
  );
}
