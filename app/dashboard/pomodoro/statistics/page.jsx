import { cookies } from "next/headers";
import { getPomodoros } from "../../../../lib/db";
import StatisticTable from "../components/statistic/StatisticTable";

export default async function Statistics() {
  const nextCookies = cookies();
  const currentUserUid = nextCookies.get("u_i").value;
  const pomodoros = await getPomodoros(currentUserUid);

  return <StatisticTable pomodoros={pomodoros} />;
}
