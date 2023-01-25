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
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-blueGray-700">
                  Sessions
                </h3>
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            {/* Projects table */}
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Date
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Class
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Time
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sessions?.map((session) => {
                  return (
                    <tr key={session.id}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left">
                        {format(parseISO(session.date), "yyyy") +
                          "/" +
                          format(parseISO(session.date), "dd") +
                          "/" +
                          format(parseISO(session.date), "MMM")}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap p-4">
                        <div className="font-semibold text-blue-900 text-md">
                          {session.title}
                        </div>
                        <div className="text-gray-500 text-sm">
                          {session.description}
                        </div>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
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
