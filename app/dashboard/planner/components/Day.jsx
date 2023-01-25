import { getDay, format, isSameDay, parseISO } from "date-fns";

import { Spinner } from "flowbite-react";
import { useTransition, useState } from "react";
import dynamic from "next/dynamic";

const AddEvent = dynamic(() => import("./AddEvent"));
const Event = dynamic(() => import("./Event"));
export default function Day({ day, dayIdx, events }) {
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  const isLoading = isFetching || isPending;
  return (
    <div
      className={
        "relative flex flex-col bg-white group " +
        (dayIdx === 0 ? colStartClasses[getDay(day)] : "")
      }
    >
      <span className="mx-2 my-1 text-xs font-bold">
        {format(day, "d MMM")}
      </span>
      <div className="flex flex-col px-1 py-1 overflow-auto max-h-28 ">
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-full">
            <Spinner />
          </div>
        ) : (
          events
            .filter((event) => isSameDay(parseISO(event.date), day))
            .map((event) => {
              return (
                <Event
                  key={event.id}
                  event={event}
                  startTransition={startTransition}
                  setIsFetching={setIsFetching}
                  day={day}
                />
              );
            })
        )}
      </div>
      <AddEvent
        day={day}
        startTransition={startTransition}
        setIsFetching={setIsFetching}
      />
    </div>
  );
}

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
