"use client";

import Link from "next/link";
import { format, parseISO } from "date-fns";
import { Session } from "../../../../../types";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserProvider";
import useSWR from "swr";

export default function Upcoming({ sessions }): JSX.Element {
  const uid = useContext(UserContext);
  const getSessions = async () => {
    const res = await fetch(`/api/v1/${uid}/sessions/upcoming`, {
      method: "GET",
    });
    const sessions = await res.json();
    return sessions;
  };

  const { data, isLoading } = useSWR<Session[], boolean>(
    `/api/v1/${uid}/sessions/upcoming`,
    getSessions,
    {
      fallbackData: sessions,
      revalidateOnMount: true,
    }
  );

  return (
    <div className="flex flex-col min-w-0 h-full break-words bg-[#111c44] w-full mb-6 shadow-lg rounded">
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 className="font-semibold text-base text-white">Sessions</h3>
          </div>
          <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
            <Link
              className="bg-[#192555] text-white active:bg-[#192555] text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              href="/dashboard/upcomming"
            >
              See all
            </Link>
          </div>
        </div>
      </div>
      {data?.length === 0 ? (
        <div className="flex justify-center items-center text-white w-full h-full">
          No sessions yet
        </div>
      ) : (
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 bg-[#192555] text-white align-middle  py-3 text-xs uppercase  whitespace-nowrap font-semibold text-left">
                  Date
                </th>
                <th className="px-6 bg-[#192555] text-white align-middle  py-3 text-xs uppercase  whitespace-nowrap font-semibold text-left">
                  Class
                </th>
                <th className="px-6 bg-[#192555] text-white align-middle  py-3 text-xs uppercase whitespace-nowrap font-semibold text-left">
                  Time
                </th>
              </tr>
            </thead>
            <tbody>
              {sessions?.slice(-5).map((session: Session) => {
                return (
                  <tr key={session.id}>
                    <th className="border-t-0 px-6 align-middle text-[#cbcdd7] border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left">
                      {format(parseISO(session.date), "yyyy") +
                        "/" +
                        format(parseISO(session.date), "dd") +
                        "/" +
                        format(parseISO(session.date), "MMM")}
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap p-4">
                      <div className="font-semibold text-white text-md">
                        {session.title}
                      </div>
                      <div className="text-[#cbcdd7] text-sm">
                        {session.description}
                      </div>
                    </td>
                    <td className="border-t-0 px-6 align-middle text-[#cbcdd7] border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {session.time}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
