"use client";
import {
  AlignJustify,
  CalendarCheck,
  Clock,
  FolderOpen,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

function MobileLinks() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkChange = () => {
    setIsOpen(false);
  };

  const pathname = usePathname();

  const splitPathname = pathname?.split("/");

  const activeLink = splitPathname && splitPathname[splitPathname.length - 1];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className={cn("md:hidden")}>
        <AlignJustify />
      </SheetTrigger>
      <SheetContent className={cn("sm:min-w-[30%] w-full ")}>
        <ul className="text-[#204239] mt-10">
          <li
            className={
              "py-3  w-full  rounded-lg  hover:bg-[#bae6a7]  hover:text-black hover:font-semibold duration-300 transition-all ease-in-out" +
              (activeLink === "dashboard" &&
                " bg-[#bae6a7] text-black font-semibold")
            }
          >
            <Link
              onClick={handleLinkChange}
              className="flex items-center space-x-2 px-2"
              href="/dashboard"
            >
              <LayoutDashboard />
              <span>Dashboard</span>
            </Link>
          </li>
          <li
            className={
              "py-3  w-full  rounded-lg  hover:bg-[#bae6a7]  hover:text-black hover:font-semibold duration-300 transition-all ease-in-out" +
              (activeLink === "projects" &&
                " bg-[#bae6a7] text-black font-semibold")
            }
          >
            <Link
              onClick={handleLinkChange}
              className="flex items-center space-x-2 px-2 "
              href="/dashboard/projects"
            >
              <FolderOpen />
              <span>Projects</span>
            </Link>
          </li>
          <li
            className={
              "py-3  w-full  rounded-lg  hover:bg-[#bae6a7]  hover:text-black hover:font-semibold duration-300 transition-all ease-in-out" +
              (activeLink === "events" &&
                " bg-[#bae6a7] text-black font-semibold")
            }
          >
            <Link
              onClick={handleLinkChange}
              className="flex items-center space-x-2 px-2 "
              href="/dashboard/events"
            >
              <CalendarCheck />
              <span>Events</span>
            </Link>
          </li>
          <li
            className={
              "py-3  w-full  rounded-lg  hover:bg-[#bae6a7]  hover:text-black hover:font-semibold duration-300 transition-all ease-in-out" +
              (activeLink === "pomodoro" &&
                " bg-[#bae6a7] text-black font-semibold")
            }
          >
            <Link
              onClick={handleLinkChange}
              className="flex items-center space-x-2 px-2 "
              href="/dashboard/pomodoro"
            >
              <Clock />
              <span>Pomodoro</span>
            </Link>
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  );
}

export default MobileLinks;
