import AddNewBoard from "./components/boards/addNewBoard";
import { cookies } from "next/headers";
export default function Kanban() {
  const nextCookies = cookies();
  const uid = nextCookies.get("u_i").value;
  return (
    <div className="lg:h-[calc(100vh-50px)] md:h-[calc(100vh-50px)] h-[calc(100vh-100px)] flex flex-col w-full justify-center  items-center">
      <div className="lg:text-[50px] md:text-[40px] text-[30px] font-bold">
        Choose an board
      </div>
    </div>
  );
}
