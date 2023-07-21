"use client";
import {
  AlignJustify,
  CalendarCheck,
  Clock,
  FolderOpen,
  Gitlab,
  LayoutDashboard,
  X,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Search from "./search";
import { UserNav } from "./user-nav";
import { ProjectType, UserType } from "@/types";
import MobileLinks from "./mobile-links";
import { usePathname } from "next/navigation";
interface ProjectWithIdType extends ProjectType {
  id: string;
}

function Navbar({
  user,
  projects,
}: {
  user: UserType;
  projects: ProjectWithIdType[];
}) {
  const pathname = usePathname();

  const splitPathname = pathname?.split("/");

  const activeLink = splitPathname && splitPathname[splitPathname.length - 1];

  return (
    <nav className="flex items-center justify-between">
      <div className="flex items-center lg:space-x-8 space-x-2 ">
        <div className="flex items-center space-x-1 font-bold text-2xl">
          <Gitlab fill="#ff8402" size={40} />
          <h2>TimesUp</h2>
        </div>

        <ul className="md:flex hidden items-center text-[#204239] lg:space-x-0 space-x-2">
          <li
            className={
              " max-w-full  px-2 h-[40px] rounded-lg flex items-center justify-center lg:min-w-[140px] lg:px-0  hover:bg-[#bae6a7]  hover:text-black hover:font-semibold  duration-300 transition-all ease-in-out " +
              (activeLink === "dashboard" &&
                " bg-[#bae6a7] text-black font-semibold")
            }
          >
            <Link className="flex items-center space-x-2" href="/dashboard">
              <LayoutDashboard />
              <span>Dashboard</span>
            </Link>
          </li>
          <li
            className={
              " max-w-full  px-2 h-[40px] rounded-lg flex items-center justify-center lg:min-w-[140px] lg:px-0  hover:bg-[#bae6a7]  hover:text-black hover:font-semibold  duration-300 transition-all ease-in-out " +
              (activeLink === "projects" &&
                " bg-[#bae6a7] text-black font-semibold")
            }
          >
            <Link
              className="flex items-center space-x-2  "
              href="/dashboard/projects"
            >
              <FolderOpen />
              <span>Projects</span>
            </Link>
          </li>
          <li
            className={
              " max-w-full  px-2 h-[40px] rounded-lg flex items-center justify-center lg:min-w-[140px] lg:px-0  hover:bg-[#bae6a7]  hover:text-black hover:font-semibold  duration-300 transition-all ease-in-out " +
              (activeLink === "events" &&
                " bg-[#bae6a7] text-black font-semibold")
            }
          >
            <Link
              className="flex items-center space-x-2  "
              href="/dashboard/events"
            >
              <CalendarCheck />
              <span>Events</span>
            </Link>
          </li>
          <li
            className={
              " max-w-full  px-2 h-[40px] rounded-lg flex items-center justify-center lg:min-w-[140px] lg:px-0  hover:bg-[#bae6a7]  hover:text-black hover:font-semibold  duration-300 transition-all ease-in-out " +
              (activeLink === "pomodoro" &&
                " bg-[#bae6a7] text-black font-semibold")
            }
          >
            <Link
              className="flex items-center space-x-2  "
              href="/dashboard/pomodoro"
            >
              <Clock />
              <span>Pomodoro</span>
            </Link>
          </li>
        </ul>
        <MobileLinks />
      </div>
      <div className="flex items-center xl:space-x-5 space-x-2  ">
        <Search projects={projects} />
        <UserNav user={user} />
      </div>
    </nav>
  );
}

export default Navbar;
