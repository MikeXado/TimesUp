"use client";

import { Button } from "@/components/ui/button";
import {
  ActivePomoContext,
  ContextActivePomoType,
} from "@/contexts/pomodoro-state-provider";
import { PomoType } from "@/types";
import { count } from "console";
import { isToday, parseISO, secondsInDay } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect, useContext } from "react";

const Timer = () => {
  const { state: pomo, setState: setPomoState } = useContext(ActivePomoContext);
  const [active, setActive] = useState(false);
  const [status, setStatus] = useState("focus");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [countPomo, setCountPomo] = useState(pomo?.done || 0);
  const handleActive = () => {
    if (pomo) {
      setActive((prev) => !prev);
    }
  };

  const handleStatus = () => {
    if (status === "long") {
      setStatus("focus");
    } else if (status === "short") {
      setStatus("long");
    } else if (status === "focus") {
      setStatus("short");
    }
  };

  useEffect(() => {
    if (active) {
      const interval = setInterval(() => {
        setSecondsLeft((left) => left - 1);
      }, 1000);
      if (secondsLeft === 0) {
        clearInterval(interval);
        if (status === "focus") {
          setStatus("short");
          setPomoState((prev) => ({
            ...prev!,
            done: prev?.done! + 1,
          }));
        }
        setActive(false);
      }

      return () => clearInterval(interval);
    }
  }, [active, secondsLeft, status, countPomo, setPomoState]);

  useEffect(() => {
    if (pomo) {
      if (status === "long") {
        setSecondsLeft(pomo.long * 60);
      } else if (status === "short") {
        setSecondsLeft(pomo.short * 60);
      } else {
        setSecondsLeft(pomo.focus * 60);
      }
    } else {
      setSecondsLeft(0);
    }
  }, [status, pomo]);

  const formatTime = (seconds: any) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="mt-5">
      <Button
        variant="link"
        onClick={handleStatus}
        className=" flex items-center justify-center items  w-full text-center font-bold text-xl"
      >
        <span>
          <ChevronLeft />
        </span>
        <span>
          {status === "long"
            ? "Long break"
            : status === "short"
            ? "Short break"
            : "Focus"}
        </span>
        <span>
          <ChevronRight />
        </span>
      </Button>
      <button
        onClick={handleActive}
        className="w-full inline-flex items-center justify-center mt-2 "
      >
        <span className={`text-5xl text-green-500`}>
          {formatTime(secondsLeft)}
        </span>
      </button>
      <div className="text-center mt-5">
        <span className="block text-sm">{pomo && "#" + pomo?.id}</span>
        <span className="block font-bold text-md mt-1">
          {pomo ? pomo?.title : "Choose pomodoro to start"}
        </span>
      </div>
    </div>
  );
};

export default Timer;
