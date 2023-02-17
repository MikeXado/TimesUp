"use client";

import React from "react";

export const UserContext = React.createContext();

export default function UserProvider({ children, uid }) {
  return <UserContext.Provider value={uid}>{children}</UserContext.Provider>;
}
