import React from "react";
import Status from "./components/status/Status";
import Timer from "./components/timer/Timer";
import { cookies } from "next/headers";
import { getPomodoros } from "../../../lib/db";
import { PomodoroType } from "../../../types";
export default async function Pomodoro({ searchParams: { status } }) {
  const nextCookies = cookies();
  const currentUserUid = nextCookies.get("u_i")?.value;
  const pomodoros: PomodoroType[] = await getPomodoros(currentUserUid);

  return (
    <div className="mx-4 mb-4 mt-20">
      <div
        className={
          "md:h-screen h-full py-20 rounded-lg flex flex-col justify-center items-center w-full"
          // (status === "short"
          //   ? " bg-[#F2FFF5]"
          //   : status === "long"
          //   ? " bg-[#F2F9FF]"
          //   : " bg-[#FFF2F2]")
        }
      >
        <Status />
        <Timer pomodoros={pomodoros} />
      </div>
    </div>
  );
}
