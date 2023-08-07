"use client";

import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import CalendarOverviewEvent from "./calendar-overview-event/event";
import { isSameDay, parseISO } from "date-fns";
import { EventType } from "@/types";
import CalendarPopover from "./calendar-overview-event/calendar-popover";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import AddEventDialog from "./events/add-event-dialog";
import fetcher from "@/lib/functions/fetcher";

interface EventTypeWithId extends EventType {
  id: string;
}

function QuickEvents() {
  const searchParams = useSearchParams();
  const { data: calendarData } = useSWR<EventTypeWithId[]>(
    "/api/v1/events",
    fetcher
  );

  const date = searchParams?.get("date");

  const [filteredEvents, setFilteredEvents] = useState(calendarData);

  useEffect(() => {
    const selectedDate = date ? new Date(date) : new Date();
    const filteredByDate = calendarData?.filter((event) => {
      return isSameDay(parseISO(event.date), selectedDate);
    });

    setFilteredEvents(filteredByDate);
  }, [date, calendarData]);

  return (
    <div className="border border-gray-300 rounded-xl p-3 w-full">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-2xl">Quick Events</h3>
        <div className="flex items-center space-x-2">
          <CalendarPopover />

          <AddEventDialog
            trigger={<Plus />}
            classNames={{
              triggerVariant: "secondary",
              triggerButtonClassName: "text-gray-500",
            }}
          />
        </div>
      </div>

      <div className=" mt-5">
        <ul className="w-full space-y-3">
          {filteredEvents && filteredEvents.length <= 0 ? (
            <div className="flex items-center justify-center h-full">
              No events
            </div>
          ) : (
            filteredEvents?.slice(0, 4).map((event) => {
              return <CalendarOverviewEvent key={event.id} event={event} />;
            })
          )}
        </ul>
      </div>
    </div>
  );
}

export default QuickEvents;
