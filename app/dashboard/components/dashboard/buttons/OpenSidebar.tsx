"use client";

import { useContext } from "react";
import { NavbarContext } from "../../../contexts/NavbarContext";

export default function OpenSidebar() {
  const { isOpen, setIsOpen } = useContext(NavbarContext);

  const handleOpenSidebar = () => {
    setIsOpen((prev: boolean) => !prev);
  };
  return (
    <button
      onClick={handleOpenSidebar}
      className="text-gray-500 w-5 h-[20px] relative focus:outline-none lg:hidden"
    >
      <span className="sr-only">Open main menu</span>
      <div>
        <span
          className={
            "top-[3px] bg-white w-5 h-[2px] absolute transform transition duration-500 ease-in-out" +
            (isOpen ? " w-3" : " ")
          }
        ></span>
        <span className=" bg-white w-5 h-[2px] absolute transform transition duration-500 ease-in-out"></span>
        <span
          className={
            "bottom-[1px] bg-white w-5 h-[2px] absolute transform transition duration-500 ease-in-out" +
            (isOpen ? " w-3" : " ")
          }
        ></span>
      </div>
    </button>
  );
}
