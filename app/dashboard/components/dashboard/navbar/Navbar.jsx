"use client";

import { usePathname } from "next/navigation";
import { useStore } from "../../../../../utils/store";

export default function Navbar() {
  const path = usePathname();

  const onSubmit = async () => {
    await fetch("/api/logOut");
    router.push("/signIn");
  };

  const newPath = path.slice(0, -57);

  return (
    <nav className="absolute top-0 left-0 w-full pl-1 z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center">
      <div className="w-full bg-white mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4 py-4">
        {/* Brand */}
        <a
          className="text-blue-900 text-sm uppercase hidden lg:inline-block font-semibold"
          href="#pablo"
        >
          {path === "/dashboard"
            ? path.substring("/".length)
            : newPath
            ? newPath.substring("/dashboard/".length)
            : path.substring("/dashboard/".length)}
        </a>
        {/* Form */}
        <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
          <div className="relative flex w-full flex-wrap items-stretch">
            <span className="z-10 h-full leading-snug font-normal  text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
              <i className="fas fa-search"></i>
            </span>
            <input
              type="text"
              placeholder="Search here..."
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
            />
          </div>
        </form>
        {/* User */}
        <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
          {/* <UserDropdown /> */}
        </ul>
      </div>
    </nav>
  );
}
