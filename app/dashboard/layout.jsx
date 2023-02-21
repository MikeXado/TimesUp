import { cookies } from "next/headers";

import { getBoards, getSpecificUser } from "../../lib/db";

import Navbar from "./components/dashboard/navbar/Navbar";
import Sidebar from "./components/dashboard/sidebar/Sidebar";
import SwrConfig from "./components/dashboard/SwrConfig";
import NavbarProvider from "./contexts/NavbarContext";
import ReduxProvider from "./contexts/ReduxProvider";
import UserProvider from "./contexts/UserProvider";
export default async function layout({ children }) {
  const nextCookies = cookies();

  const currentUserUid = nextCookies.get("u_i").value;

  const currentUser = await getSpecificUser(currentUserUid);

  const boards = await getBoards(currentUserUid);

  return (
    <>
      <UserProvider uid={currentUserUid}>
        <SwrConfig>
          <ReduxProvider>
            <NavbarProvider>
              <Sidebar boards={boards} />
              <div className="relative lg:ml-72 ml-0 overflow-y-auto overflow-x-hidden transform transition duration-500 ease-in-out">
                <Navbar currentUser={currentUser} />
                {/* Header */}
                {/* <HeaderStats /> */}
                <div className="mx-auto w-full lg:pt-0">
                  {children}

                  {/* <FooterAdmin /> */}
                </div>
              </div>
            </NavbarProvider>
          </ReduxProvider>
        </SwrConfig>
      </UserProvider>
    </>
  );
}
