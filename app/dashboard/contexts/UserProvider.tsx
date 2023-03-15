"use client";

import React, { ReactNode } from "react";

type UserContextType = string | null;

export const UserContext = React.createContext<UserContextType>(null);

export default function UserProvider({
  children,
  uid = null,
}: {
  children: ReactNode;
  uid?: UserContextType;
}) {
  return <UserContext.Provider value={uid}>{children}</UserContext.Provider>;
}
