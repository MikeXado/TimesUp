"use client";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState, useTransition } from "react";
import { Spinner } from "flowbite-react";
import { debounce } from "lodash";

const User = dynamic(() => import("./User"));
const PreferUser = dynamic(() => import("./PreferUser"));
export default function Search({ filteredUsers, chats }) {
  const [isTyping, setIsTyping] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const [query, setQuery] = useState("");
  const isLoading = isFetching || isPending;

  let debouncedUsers = filteredUsers;
  if (query !== "") {
    debouncedUsers = filteredUsers.filter((user) => {
      let name = user.displayName;
      return name?.toLowerCase().includes(query.toLowerCase());
    });
  }

  const changeHandler = (e) => {
    setQuery(e.target.value);
  };

  const handleStartTyping = () => {
    setIsTyping(true);
  };

  const debouncedChangeHandler = useMemo(() => {
    return debounce(changeHandler, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, [debouncedChangeHandler]);

  return (
    <>
      <form className="pt-5 pl-2 pr-2">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
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
            className="block w-full p-4 placeholder-white pl-10 text-sm text-white border border-gray-300 rounded-lg bg-[#192555]"
            placeholder="Search users..."
            onChange={debouncedChangeHandler}
            onFocus={handleStartTyping}
          />
        </div>
      </form>

      <div
        className={
          isTyping === false
            ? "hidden"
            : " " + " bg-[#192555] rounded shadow-2xl py-1 ml-3 mr-3 px-2"
        }
      >
        {debouncedUsers.map((user) => {
          return (
            <User
              key={user.id}
              user={user}
              setIsTyping={setIsTyping}
              setIsFetching={setIsFetching}
              startTransition={startTransition}
            />
          );
        })}
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center mt-10 mb-10 w-full">
          {" "}
          <Spinner />
        </div>
      ) : (
        <div className="pl-2 pr-2">
          {chats.map((chat) => {
            return <PreferUser key={chat.id} chat={chat} />;
          })}
        </div>
      )}
    </>
  );
}
