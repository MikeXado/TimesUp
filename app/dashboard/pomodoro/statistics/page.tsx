import { cookies } from "next/headers";
import { getPomodoros } from "../../../../lib/db";
import { PomodoroType } from "../../../../types";
import StatisticTable from "../components/statistic/StatisticTable";

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
