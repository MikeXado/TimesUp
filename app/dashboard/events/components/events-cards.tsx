"use client";
import getEventsFetcher from "@/lib/functions/get-events-fetch";
import { EventType } from "@/types";
import React, { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { format, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";
import EventCard from "./event-card";
import { DateStateContext } from "../context/DateStateProvider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface EventsTypeWithId extends EventType {
  id: string;
}

function EventsCards({
  events,
  uid,
}: {
  events: EventsTypeWithId[];
  uid: string;
}) {
  const { date: selectedDates } = useContext(DateStateContext);

  const { data } = useSWR<EventsTypeWithId[]>("/api/v1/events", () =>
    getEventsFetcher(uid)
  );
  const [selectedEvents, setSelectedEvents] = useState(data);

  useEffect(() => {
    const splitedDates = selectedDates?.map((el) => el.toDateString());
    const filteredEvents = data?.filter((event) =>
      splitedDates?.includes(new Date(event.date).toDateString())
    );
    setSelectedEvents(filteredEvents);
  }, [selectedDates, data]);

  const groupedByDateEvents:
    | { [date: string]: EventsTypeWithId[] }
    | undefined = selectedEvents?.reduce((result, event) => {
    const { date } = event;
    const splitDate = new Date(date).toDateString();
    if (!result[splitDate]) {
      result[splitDate] = [];
    }

    result[splitDate].push(event);

    return result;
  }, {} as { [date: string]: EventsTypeWithId[] });

  return (
    <div className="space-y-20 mt-20 max-w-[1400px] mx-auto">
      {selectedEvents?.length === 0 ? (
        <div className="flex items-center text-xl justify-center w-full h-full">
          No events yet
        </div>
      ) : (
        groupedByDateEvents &&
        Object.keys(groupedByDateEvents).map((date) => {
          return (
            <Collapsible key={date}>
              <div className="grid relative justify-center gap-6 lg:grid-cols-12  grid-cols-1 items-start w-full">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="lg:col-span-1 col-span-12 lg:shadow-none lg:py-0 py-5 shadow-lg lg:justify-start flex justify-center w-full bg-white sticky z-10 top-0">
                        <CollapsibleTrigger
                          className={cn(
                            "text-3xl " +
                              (isSameDay(new Date(date), new Date()) &&
                                " text-green-500")
                          )}
                        >
                          <span className="block font-bold">
                            {format(new Date(date), "dd")}
                          </span>
                          <span className="block">
                            {format(new Date(date), "EE")}
                          </span>
                        </CollapsibleTrigger>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Click to expand events</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <div className="col-span-11 space-y-5">
                  <ul className="space-y-5">
                    {groupedByDateEvents &&
                      groupedByDateEvents[date].slice(0, 3).map((el) => {
                        return <EventCard uid={uid} key={el.id} event={el} />;
                      })}
                  </ul>
                  <CollapsibleContent>
                    <ul className="space-y-5">
                      {groupedByDateEvents &&
                        groupedByDateEvents[date].slice(3).map((el) => {
                          return <EventCard uid={uid} key={el.id} event={el} />;
                        })}
                    </ul>
                  </CollapsibleContent>
                </div>
              </div>
            </Collapsible>
          );
        })
      )}
    </div>
  );
}

export default EventsCards;
