"use client";

import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

export default function StatisticTable({ pomodoros }) {
  const formatTimeLeft = (seconds) => {
    return `${Math.floor(seconds / 60)}:${
      seconds % 60 > 9 ? seconds % 60 : "0" + (seconds % 60)
    }`;
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words  bg-[#111c44] w-full mb-6 shadow-lg rounded">
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 className="font-semibold text-base text-white">Statistics</h3>
          </div>
        </div>
      </div>
      <div className="block w-full overflow-x-auto">
        {/* Projects table */}
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <th className="px-6 bg-[#192555] text-white align-middle  py-3 text-xs uppercase   whitespace-nowrap font-semibold text-left">
                Date
              </th>
              <th className="px-6 bg-[#192555] text-white align-middle  py-3 text-xs uppercase  whitespace-nowrap font-semibold text-left">
                Pomo time
              </th>
              <th className="px-6 bg-[#192555] text-white align-middle  py-3 text-xs uppercase  whitespace-nowrap font-semibold text-left">
                Complete Time
              </th>
            </tr>
          </thead>
          <tbody>
            {pomodoros.map((pomo) => {
              return (
                <tr key={pomo.id}>
                  <th className="border-t-0 px-6 align-middle  text-white text-sm whitespace-nowrap p-4 text-left">
                    {format(parseISO(pomo.date), "yyyy") +
                      "/" +
                      format(parseISO(pomo.date), "dd") +
                      "/" +
                      format(parseISO(pomo.date), "MMM")}
                  </th>
                  <td className="border-t-0 px-6 align-middle   whitespace-nowrap p-4">
                    <div className="font-semibold text-indigo-700 text-md">
                      {formatTimeLeft(pomo.pomo * 60) + " minutes"}
                    </div>
                  </td>
                  <td className="border-t-0 px-6 align-middle text-gray-200 text-xs whitespace-nowrap p-4">
                    {format(pomo.time, "hh:mm:ss")}
                  </td>
                  {/* <td>
                <ChangeModal
                  setIsFetching={setIsFetching}
                  startTransition={startTransition}
                />
              </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
