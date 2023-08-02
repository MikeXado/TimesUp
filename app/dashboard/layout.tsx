import React from "react";
import { cookies } from "next/headers";
import { getUser } from "@/viewmodels/firebase/auth";
import Navbar from "@/app/dashboard/components/navbar";
import Sidebar from "@/app/dashboard/components/sidebar";
import Header from "./components/header";
import getProjects from "@/viewmodels/firebase/db/get-projects";
import FastMenu from "./components/fast-menu";
import ActivePomoProvider from "@/contexts/pomodoro-state-provider";
async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookiesStore = cookies();
  const tkn = cookiesStore.get("session-token")?.value;
  const data = await getUser(tkn!);
  const projects = await getProjects(data.uid);

  return (
    <main className="text-[#0a0041] max-w-[1920px] mx-auto">
      <ActivePomoProvider>
        <header className="bg-[#e6f5dd] pt-5 pb-8 px-4">
          <Navbar user={data} projects={projects} />
        </header>
        <div className="bg-white w-full rounded-t-2xl -mt-3 sm:flex min-h-screen max-h-full ">
          <Sidebar />

          <div className="p-5 sm:flex-1 ">
            <div className="">
              <Header />
            </div>
            {children}
          </div>
        </div>
        <FastMenu />
      </ActivePomoProvider>
    </main>
  );
}

export default DashboardLayout;
