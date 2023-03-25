"use client";
import { useContext } from "react";
import { Spinner } from "flowbite-react";
import ChangeSessions from "./ChangeSessions";
import AddNewSessions from "./AddNewSessions";
import { format, parseISO } from "date-fns";
import { Session } from "../../../../types";
import { UserContext } from "../../contexts/UserProvider";
import useSWR from "swr";
export default function TableSessions({ sessions }: { sessions: Session[] }) {
  const uid = useContext(UserContext);
  const getSessions = async () => {
    const res = await fetch(`/api/v1/${uid}/sessions/upcoming`, {
      method: "GET",
    });
    const sessions = await res.json();
    return sessions;
  };

  const { data, isLoading } = useSWR(
    `/api/v1/${uid}/sessions/upcoming`,
    getSessions,
    {
      fallbackData: sessions,
      revalidateOnMount: true,
    }
  );

  return (
    <>
      {isLoading ? (
        <div className="flex w-full justify-center items-center h-full">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col min-w-0 break-words bg-[#111c44] w-full mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-white">Sessions</h3>
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
                  <th className="px-6 bg-[#192555] text-white align-middle  py-3 text-xs uppercase   whitespace-nowrap font-semibold text-left">
                    Class
                  </th>
                  <th className="px-6 bg-[#192555] text-white align-middle  py-3 text-xs uppercase   whitespace-nowrap font-semibold text-left">
                    Time
                  </th>
                  <th className="px-6 bg-[#192555] text-white align-middle  py-3 text-xs uppercase   whitespace-nowrap font-semibold text-left">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((session: Session) => {
                  return (
                    <tr key={session.id}>
                      <th className="text-white px-6 align-middle  text-sm whitespace-nowrap p-4 text-left">
                        {format(parseISO(session.date), "yyyy") +
                          "/" +
                          format(parseISO(session.date), "dd") +
                          "/" +
                          format(parseISO(session.date), "MMM")}
                      </th>
                      <td className=" px-6 align-middle   whitespace-nowrap p-4">
                        <div className="font-semibold text-indigo-700 text-md">
                          {session.title}
                        </div>
                        <div className="text-gray-200 text-sm">
                          {session.description}
                        </div>
                      </td>
                      <td className="px-6 align-middle  text-gray-200 text-xs whitespace-nowrap p-4">
                        {session.time}
                      </td>
                      <td>
                        <ChangeSessions session={session} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <AddNewSessions />
    </>
  );
}
