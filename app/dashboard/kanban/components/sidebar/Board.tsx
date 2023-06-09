"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Board({
  board,
  setIsOpen,
  navbarOpen
}: {
  board: { title: string; description: string; id: string };
  setIsOpen: (prev: boolean) => void; 
  navbarOpen: (prev: boolean) => void; 
 }) {
  const pathname = usePathname();
  const slicePath = pathname?.substring("/dashboard/kanban/".length);

  return (
    <li className="flex items-center w-full p-2 text-base font-normal text-[#cbcdd7] transition duration-75 rounded-lg ">
      <Link
        onClick={() => {setIsOpen(false); if(window && window.innerWidth < 1024) {
          navbarOpen(false)
        }}}
        className={
          "w-full py-2 pl-2 rounded-lg hover:bg-[#192555] hover:text-white " +
          (slicePath === board.id ? " bg-[#192555]  text-[#cbcdd7]" : " ")
        }
        href={`/dashboard/kanban/${board.id}`}
        key={board.id}
      >
        {board.title}
      </Link>
    </li>
  );
}
