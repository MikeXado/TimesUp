"use client";

import { getTime, startOfToday, parseISO, isSameDay } from "date-fns";
import useSound from "use-sound";
import timesUpSfx from "../../../../../public/sounds/timesUp.mp3";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Controls from "../controls/Controls";
import { UserContext } from "../../../contexts/UserProvider";
import { toast } from "react-toastify";
export default function Timer({ pomodoros }) {
  const currentUserUid = useContext(UserContext);
  const { pomo, long, short, untilLong, sound } = useSelector(
    (state) => state.preferences
  );
  const today = startOfToday();
  const time = getTime(today);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [active, setActive] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const status = searchParams.get("status");

  let volume = sound ? 1 : 0;

  const [timesUp] = useSound(timesUpSfx, {
    volume: volume,
  });

  const formatTimeLeft = (seconds) => {
    return `${Math.floor(seconds / 60)}:${
      seconds % 60 > 9 ? seconds % 60 : "0" + (seconds % 60)
    }`;
  };

  let minutesFormated = Math.floor(secondsLeft / 60);

  let secondsFormated =
    secondsLeft % 60 > 9 ? secondsLeft % 60 : "0" + (secondsLeft % 60);

  useEffect(() => {
    if (status === "short") {
      setSecondsLeft(short * 60);
    } else if (status === "long") {
      setSecondsLeft(long * 60);
    } else {
      setSecondsLeft(pomo * 60);
    }
  }, [short, long, pomo, status]);

  let filteredPomodoros = pomodoros.filter((el) =>
    isSameDay(parseISO(el.date), today)
  );

  const addPomodoro = useCallback(async () => {
    const data = {
      pomo: pomo,
      date: today,
      time: time,
      id: currentUserUid,
    };

    await fetch("/api/addPomodoro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    toast.success("Wow awesome , new pomodoro done. Congrats!!");
  }, [today, time, pomo, currentUserUid]);

  useEffect(() => {
    if (active) {
      let interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
      if (secondsLeft === 0) {
        clearInterval(interval);
        timesUp();
        addPomodoro();
        if (filteredPomodoros.length <= untilLong - 1) {
          router.replace("/dashboard/pomodoro?status=short");
          setActive(true);
        } else if (filteredPomodoros.length >= untilLong - 1) {
          router.replace("/dashboard/pomodoro?status=long");
          setActive(true);
        }
      }

      return () => clearInterval(interval);
    }
  }, [
    active,
    secondsLeft,
    router,
    pomo,
    addPomodoro,
    pomodoros.length,
    untilLong,
    filteredPomodoros.length,
    timesUp,
  ]);

  return (
    <div className="flex w-full justify-center flex-col items-center">
      <div
        className={
          "md:text-[256px] font-bold hidden md:block" +
          (status === "short"
            ? " text-[#14401D]"
            : status === "long"
            ? " text-[#153047]"
            : " text-[#471515]")
        }
      >
        {formatTimeLeft(secondsLeft)}
      </div>
      <div
        className={
          "text-[200px] font-bold md:hidden mb-10 mt-10" +
          (status === "short"
            ? " text-[#14401D]"
            : status === "long"
            ? " text-[#153047]"
            : " text-[#471515]")
        }
      >
        <span className="block leading-none ">{minutesFormated}</span>
        <span className="block leading-none">{secondsFormated}</span>
      </div>
      <Controls setActive={setActive} volume={volume} active={active} />
    </div>
  );
}
