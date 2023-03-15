import { getTime, startOfToday, parseISO, isSameDay } from "date-fns";
import { useSearchParams } from "next/navigation";
import "react-circular-progressbar/dist/styles.css";
import { useContext, useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useSelector } from "react-redux";
import useSound from "use-sound";

import { usePush } from "../../../../../utils/fetcher";
import { UserContext } from "../../../contexts/UserProvider";
import timesUpSfx from "../../../../../public/sounds/timesUp.mp3";
import { toast } from "react-toastify";
import { PomodoroPreferencesType, PomodoroType } from "../../../../../types";
export default function CircularProgress({
  active,
  pomodoros,
}: {
  active: boolean;
  pomodoros: PomodoroType[];
}) {
  const { pomo, long, short, untilLong, sound } = useSelector(
    (state: { preferences: PomodoroPreferencesType }) => state.preferences
  );
  const today = startOfToday();
  const time = getTime(today);
  const currentUserUid = useContext(UserContext);
  const searchParams = useSearchParams();
  const status = searchParams?.get("status");
  const push = usePush();
  const [secondsLeft, setSecondsLeft] = useState(0);
  let volume = sound ? 1 : 0;

  const [timesUp] = useSound(timesUpSfx, {
    volume: volume,
  });

  const formatTimeLeft = (seconds) => {
    return `${Math.floor(seconds / 60)}:${
      seconds % 60 > 9 ? seconds % 60 : "0" + (seconds % 60)
    }`;
  };

  useEffect(() => {
    if (status === "short") {
      setSecondsLeft(short * 60);
    } else if (status === "long") {
      setSecondsLeft(long * 60);
    } else {
      setSecondsLeft(pomo * 60);
    }
  }, [short, long, pomo, status]);

  let filteredPomodoros: PomodoroType[] = pomodoros.filter((el) =>
    isSameDay(parseISO(el.date), today)
  );

  const progress = Math.floor(
    (secondsLeft * 100) /
      ((status === "short" ? short : status === "long" ? long : pomo) * 60)
  );

  useEffect(() => {
    if (active) {
      let interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
      if (secondsLeft === 0) {
        clearInterval(interval);
        timesUp();
        const addPomodoro = async (): Promise<void> => {
          await fetch("/api/addPomodoro", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              pomo: pomo,
              date: today,
              time: time,
              id: currentUserUid,
            }),
          });

          toast.success("Wow awesome , new pomodoro done. Congrats!!");
        };
        if (!status) {
          addPomodoro();
        }

        if (filteredPomodoros.length <= untilLong - 1) {
          push("/dashboard/pomodoro?status=short");
        } else if (filteredPomodoros.length >= untilLong - 1) {
          push("/dashboard/pomodoro?status=long");
        }
      }
      return () => clearInterval(interval);
    }
  }, [
    push,
    active,
    secondsLeft,
    pomo,
    status,
    currentUserUid,
    time,
    today,
    pomodoros.length,
    untilLong,
    filteredPomodoros.length,
    timesUp,
  ]);
  return (
    <div className="w-[500px] max-w-full my-20">
      <CircularProgressbar
        value={progress}
        text={formatTimeLeft(secondsLeft)}
        styles={buildStyles({
          // Rotation of path and trail, in number of turns (0-1)
          rotation: 0.25,

          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
          strokeLinecap: "butt",

          // Text size
          textSize: "30px",

          // How long animation takes to go from one percentage to another, in seconds
          pathTransitionDuration: 0.5,

          //Colors
          pathColor:
            status === "short"
              ? "#4DDA6E"
              : status === "long"
              ? "#4CACFF"
              : "#FF4C4C",
          textColor:
            status === "short"
              ? "rgb(132 225 188 / 1)"
              : status === "long"
              ? "rgb(164 202 254 / 1)"
              : " rgb(248 180 180 / 1)",
          trailColor: "#051139",
        })}
      />
    </div>
  );
}
