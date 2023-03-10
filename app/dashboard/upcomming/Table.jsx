"use client";
import { useState, useTransition } from "react";
import { Spinner, Table } from "flowbite-react";
import ChangeModal from "./ChangeModal";
import PopUp from "./Modal";
import { format, parseISO } from "date-fns";
export default function TableSessions({ sessions }) {
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  const isLoading = isFetching || isPending;

  return (
    <>
      {isLoading ? (
        <div className="flex w-full justify-center items-center h-full">
          <Spinner />
        </div>
      ) : (
        <div className="relative flex flex-col min-w-0 break-words bg-[#111c44] w-full mb-6 shadow-lg rounded">
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
                {sessions?.map((session) => {
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
                        <ChangeModal
                          setIsFetching={setIsFetching}
                          startTransition={startTransition}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <PopUp setIsFetching={setIsFetching} startTransition={startTransition} />
    </>
  );
}
