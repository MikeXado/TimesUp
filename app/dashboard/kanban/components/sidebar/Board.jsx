"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Board({ board }) {
  const pathname = usePathname();
  const slicePath = pathname.substring("/dashboard/kanban/".length);

  return (
    <Link
      className={
        "mb-4 py-2 px-2 rounded-lg hover:bg-indigo-700 hover:text-white " +
        (slicePath === board.id ? " bg-indigo-700 text-white" : " bg-gray-100")
      }
      href={`/dashboard/kanban/${board.id}`}
      key={board.id}
    >
      {board.title}
    </Link>
  );
}
