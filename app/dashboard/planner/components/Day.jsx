import { getDay, format, isSameDay, parseISO } from "date-fns";

import { Spinner } from "flowbite-react";
import { useTransition, useState } from "react";

import Droppable from "./dnd/Droppable";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Event from "./Event";
import AddEvent from "./AddEvent";
export default function Day({ day, dayIdx, events, uid }) {
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

      {isLoading ? (
        <div className="flex items-center justify-center w-full h-full">
          <Spinner />
        </div>
      ) : (
        <SortableContext
          items={events}
          id={dayIdx}
          strategy={verticalListSortingStrategy}
        >
          <Droppable dropableName={day}>
            {events.map((event) => {
              return (
                <Event
                  key={event.id}
                  event={event}
                  startTransition={startTransition}
                  setIsFetching={setIsFetching}
                  day={day}
                  uid={uid}
                />
              );
            })}
          </Droppable>
        </SortableContext>
      )}

      <AddEvent
        day={day}
        startTransition={startTransition}
        setIsFetching={setIsFetching}
        uid={uid}
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
