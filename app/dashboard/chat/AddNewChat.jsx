"use client";

import React, { memo, useEffect, useMemo, useState } from "react";
import { Modal } from "flowbite-react";
import User from "./User";
import { debounce } from "lodash";
export default function AddNewChat({ users }) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => {
    setIsOpen((prev) => !prev);
  };

  let filteredUsers = users;
  if (search !== "") {
    filteredUsers = users.filter((user) => {
      let name = user.displayName;
      return name?.toLowerCase().includes(search.toLowerCase());
    });
  }
  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const debouncedChangeHandler = useMemo(() => {
    return debounce(handleInput, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, [debouncedChangeHandler]);

  return (
    <React.Fragment>
      <button
        onClick={onOpen}
        className="bg-[#6e6ae4] mt-5  text-white py-3 px-10 rounded-lg"
      >
        Send Message
      </button>

      <Modal show={isOpen} size="lg" popup={true} onClose={onOpen}>
        <Modal.Header className="bg-[#111c44]" />
        <Modal.Body className="bg-[#111c44]">
          <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl text-center font-medium text-white ">
              Add new message
            </h3>
            <div>
              <form className="pt-5">
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-white sr-only"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-white "
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    id="default-search"
                    className="block w-full p-4 pl-10 text-sm bg-[#192555] placeholder-white text-white border-none  rounded-lg  focus:ring-[#6e6ae4] focus:border-[#6e6ae4] "
                    placeholder="Search users..."
                    onChange={debouncedChangeHandler}
                  />
                </div>
              </form>
            </div>
            <ul className="mt-5">
              {filteredUsers.map((user) => {
                return <User key={user.id} user={user} />;
              })}
            </ul>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}
