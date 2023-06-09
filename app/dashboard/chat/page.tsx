import React from "react";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { getUsersDb } from "../../../lib/db";
const AddNewChat = dynamic(() => import("./AddNewChat"));

export default async function Messanger() {
  const nextCookies = cookies();

  const currentUserUid = nextCookies.get("u_i")?.value;

  const users = await getUsersDb();

  const filteredUsers = users.filter((user) => {
    return user.uid !== currentUserUid;
  });

  return (
    <div className="h-[calc(100vh-50px)] flex flex-col  max-w-full justify-center  items-center">
      <h1 className="mb-4 md:text-[50px] text-[40px]  font-extrabold leading-none tracking-tight  text-white ">
        Send message
      </h1>
      <AddNewChat users={filteredUsers} />
    </div>
  );
}
