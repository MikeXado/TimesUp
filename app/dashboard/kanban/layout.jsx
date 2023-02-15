import AddNewBoard from "./components/boards/addNewBoard";

import KanbanBoards from "./components/sidebar/KanbanBoards";
import { cookies } from "next/headers";
import Sidebar from "./components/sidebar/sidebar";

export default function KanbanLayout({ children }) {
  const nextCookie = cookies();
  const id = nextCookie.get("u_i").value;

  return (
    <>
      <nav className=" lg:block lg:absolute lg:h-screen lg:overflow-y-auto lg:flex-row lg:flex-nowrap lg:overflow-hidden mt-24 lg:mt-0 shadow-lg bg-white flex flex-wrap  items-center justify-between relative lg:w-64 z-2 min-h-[60px] max-w-screen py-6 px-6">
        <Sidebar>
          <KanbanBoards />
          <hr className="my-4" />
          <AddNewBoard id={id} />
        </Sidebar>
      </nav>
      <div className="lg:mt-24 mt-3 lg:pl-10 ">{children}</div>
    </>
  );
}
