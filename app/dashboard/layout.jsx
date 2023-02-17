import { cookies } from "next/headers";

import { getSpecificUser } from "../../lib/db";

import Navbar from "./components/dashboard/navbar/Navbar";
import Sidebar from "./components/dashboard/sidebar/Sidebar";
import SwrConfig from "./components/dashboard/SwrConfig";
import ReduxProvider from "./contexts/ReduxProvider";
import UserProvider from "./contexts/UserProvider";
export default async function layout({ children }) {
  const nextCookies = cookies();

  const currentUserUid = nextCookies.get("u_i").value;

  const currentUser = await getSpecificUser(currentUserUid);

  return (
    <>
      <Sidebar />
      <div className="relative lg:ml-28 lg:h-screen overflow-hidden">
        <Navbar currentUser={currentUser} />
        {/* Header */}
        {/* <HeaderStats /> */}
        <div className="mx-auto w-full lg:pt-0">
          <ReduxProvider>
            <UserProvider uid={currentUserUid}>
              <SwrConfig>{children}</SwrConfig>
            </UserProvider>
          </ReduxProvider>
          {/* <FooterAdmin /> */}
        </div>
      </div>
    </>
  );
}
