"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { PomodoroType } from "../../../../../types";
const Controls = dynamic(() => import("../controls/Controls"));
const CircularProgress = dynamic(() => import("./CircularProgress"));
export default function Timer({ pomodoros }: { pomodoros: PomodoroType[] }) {
  const [active, setActive] = useState<boolean>(false);

  return (
    <div className="flex w-full justify-center flex-col items-center">
      <CircularProgress active={active} pomodoros={pomodoros} />
      <Controls setActive={setActive} active={active} />
    </div>
  );
}
