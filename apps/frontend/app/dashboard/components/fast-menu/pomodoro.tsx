import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";
import React from "react";
import Pomo from "./pomodoro/pomodoros";
import Timer from "./pomodoro/timer";

function Pomodoro() {
  const pomos = [
    {
      id: "pomo1",
      title: "UI/UX Design",
      estPomo: 3,
      focus: 0.1,
      short: 0.3,
      long: 0.5,
      untilLong: 3,
      done: 2,
      _updatedAt: new Date().toLocaleDateString(),
    },
    {
      id: "pomo2",
      title: "Front-end",
      estPomo: 3,
      focus: 0.1,
      short: 0.3,
      long: 0.5,
      untilLong: 3,
      done: 3,
      _updatedAt: new Date().toLocaleDateString(),
    },
  ];
  return (
    <div>
      <Timer />
      <Pomo pomos={pomos} />
    </div>
  );
}

export default Pomodoro;
