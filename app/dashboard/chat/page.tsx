import React from "react";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
const AddNewChat = dynamic(() => import("./AddNewChat"));

const getUsers = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/v1/users`, {
    method: "GET",
    cache: "no-store",
  });
  const users = await res.json();
  return users;
};

export default async function Messanger() {
  const nextCookies = cookies();

  const currentUserUid = nextCookies.get("u_i")?.value;

  const users = await getUsers();

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
