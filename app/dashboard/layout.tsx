import dynamic from "next/dynamic";
import { cookies } from "next/headers";

import { getBoards, getSpecificUser } from "../../lib/db";
import { KanbanBoards } from "../../types";

import Navbar from "./components/dashboard/navbar/Navbar";
import Sidebar from "./components/dashboard/sidebar/Sidebar";
import SwrConfig from "./contexts/SwrConfig";
import ChatDrawerProvider from "./contexts/ChatDrawerProvider";
import KanbanDrawerProvider from "./contexts/KanbanDrawerProvider";
import NavbarProvider from "./contexts/NavbarContext";
import NotificationsProvider from "./contexts/NotificationsProvider";
import ReduxProvider from "./contexts/ReduxProvider";
import UserProvider from "./contexts/UserProvider";

const ChatDrawer = dynamic(
  () => import("./components/dashboard/drawers/ChatDrawer")
);
const KanbanDrawer = dynamic(
  () => import("./components/dashboard/drawers/KanbanDrawer")
);

export default async function Layout({ children }) {
  const nextCookies = cookies();

  const uid = nextCookies.get("u_i")?.value;

  const currentUser: Object = await getSpecificUser(uid);

  const boards: KanbanBoards[] = await getBoards(uid);
  4;
  return (
    <>
      <UserProvider uid={uid}>
        <SwrConfig>
          <ReduxProvider>
            <NavbarProvider>
              <ChatDrawerProvider>
                <KanbanDrawerProvider>
                  <NotificationsProvider>
                    <Sidebar />
                    <ChatDrawer />
                    <KanbanDrawer boards={boards} />
                    <div className="relative lg:ml-72 ml-0 overflow-y-auto overflow-x-hidden transform transition duration-500 ease-in-out">
                      <Navbar currentUser={currentUser} />
                      {/* Header */}
                      {/* <HeaderStats /> */}
                      <div className="mx-auto w-full lg:pt-0">
                        {children}

                        {/* <FooterAdmin /> */}
                      </div>
                    </div>
                  </NotificationsProvider>
                </KanbanDrawerProvider>
              </ChatDrawerProvider>
            </NavbarProvider>
          </ReduxProvider>
        </SwrConfig>
      </UserProvider>
    </>
  );
}
