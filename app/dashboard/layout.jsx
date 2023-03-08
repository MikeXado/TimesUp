import { cookies } from "next/headers";

import { getAllChats, getBoards, getSpecificUser } from "../../lib/db";
import ChatDrawer from "./components/dashboard/drawers/ChatDrawer";
import KanbanDrawer from "./components/dashboard/drawers/KanbanDrawer";

import Navbar from "./components/dashboard/navbar/Navbar";
import Sidebar from "./components/dashboard/sidebar/Sidebar";
import SwrConfig from "./components/dashboard/SwrConfig";
import ChatDrawerProvider from "./contexts/ChatDrawerProvider";
import KanbanDrawerProvider from "./contexts/KanbanDrawerProvider";
import NavbarProvider from "./contexts/NavbarContext";
import ReduxProvider from "./contexts/ReduxProvider";
import UserProvider from "./contexts/UserProvider";

export default async function Layout({ children }) {
  const nextCookies = cookies();

  const currentUserUid = nextCookies.get("u_i").value;

  const currentUser = await getSpecificUser(currentUserUid);

  const boards = await getBoards(currentUserUid);

  const chats = await getAllChats(currentUserUid);
  return (
    <>
      <UserProvider uid={currentUserUid}>
        <SwrConfig>
          <ReduxProvider>
            <NavbarProvider>
              <ChatDrawerProvider>
                <KanbanDrawerProvider>
                  <Sidebar />
                  <ChatDrawer chats={chats} />
                  <KanbanDrawer board={boards} />
                  <div className="relative lg:ml-72 ml-0 overflow-y-auto overflow-x-hidden transform transition duration-500 ease-in-out">
                    <Navbar currentUser={currentUser} />
                    {/* Header */}
                    {/* <HeaderStats /> */}
                    <div className="mx-auto w-full lg:pt-0">
                      {children}

                      {/* <FooterAdmin /> */}
                    </div>
                  </div>
                </KanbanDrawerProvider>
              </ChatDrawerProvider>
            </NavbarProvider>
          </ReduxProvider>
        </SwrConfig>
      </UserProvider>
    </>
  );
}
