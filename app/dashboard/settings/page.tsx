import React from "react";
import { cookies } from "next/headers";
import { getSpecificUser } from "../../../lib/db";
import dynamic from "next/dynamic";
import { UserData } from "../../../types";

const Cards = dynamic(() => import("./components/Cards"));
export default async function Settings() {
  const nextCookies = cookies();

  const currentUserUid = nextCookies.get("u_i")?.value;
  const currentUser: UserData = await getSpecificUser(currentUserUid);

  return <Cards currentUser={currentUser} />;
}
