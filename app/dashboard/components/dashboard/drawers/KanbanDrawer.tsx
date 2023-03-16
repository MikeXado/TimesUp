"use client";

import useSWR from "swr";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserProvider";
import { NavbarContext } from "../../../contexts/NavbarContext";
import Board from "../../../kanban/components/sidebar/Board";
import { KanbanDrawerContext } from "../../../contexts/KanbanDrawerProvider";
import AddNewBoard from "../../../kanban/components/boards/addNewBoard";
import { Spinner } from "flowbite-react";
import { KanbanBoards } from "../../../../../types";
export default function KanbanDrawer({ boards }) {
  const uid = useContext(UserContext);
  const { isOpen, setIsOpen } = useContext(KanbanDrawerContext);
  const { isOpen: navbarStatus } = useContext(NavbarContext);

  const handleOpenSidebar = () => {
    setIsOpen(false);
  };

  const boardsFetcher = async () => {
    const data = await fetch("/api/getBoards/boards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uid),
    });
    const boards = await data.json();
    return boards;
  };

  const { data, isLoading } = useSWR("/api/getBoards/boards", boardsFetcher);
  return (
    <div
      className={
        "fixed top-0 lg:left-[290px] z-40 h-screen p-4 overflow-y-auto duration-500 ease-in-out transition-all bg-[#111c44] w-72" +
        (isOpen ? " " : " hidden") +
        (navbarStatus ? " md:left-[290px] sm:left-0 left-0" : " ")
      }
    >
      <h5 className="text-base font-semibold text-white uppercase ">Boards</h5>
      <button
        onClick={handleOpenSidebar}
        type="button"
        className="text-[#cbcdd7] bg-transparent hover:bg-[#192555] rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center"
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Close menu</span>
      </button>
      <div className="py-4 overflow-y-auto">
        <ul className={"py-2 space-y-2" + (isOpen ? " " : " hidden")}>
          {isLoading ? (
            <div className="flex justify-center mt-5">
              <Spinner />
            </div>
          ) : (
            (data || boards).map((board: KanbanBoards) => {
              return <Board key={board.id} board={board} />;
            })
          )}
        </ul>
      </div>
      <div className="flex justify-center w-full">
        <AddNewBoard />
      </div>
    </div>
  );
}
