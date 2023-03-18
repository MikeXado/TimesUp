import { cookies } from "next/headers";
import { PomodoroType } from "../../../../types";
import StatisticTable from "../components/statistic/StatisticTable";

const getPomodoros = async (uid) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/v1/${uid}/pomodoros`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  const pomodoros = await res.json();
  return pomodoros;
};

export default async function Statistics() {
  const nextCookies = cookies();
  const currentUserUid = nextCookies.get("u_i")?.value;
  const pomodoros: PomodoroType[] = await getPomodoros(currentUserUid);

  return (
    <div className="mt-24 mx-3">
      <StatisticTable pomodoros={pomodoros} />
    </div>
  );
}
