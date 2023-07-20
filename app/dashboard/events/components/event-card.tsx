"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EventType } from "@/types";
import { Clock, MapPin } from "lucide-react";
import React from "react";
import dynamic from "next/dynamic";
const EditEventDialog = dynamic(
  () => import("../../components/events/edit-event-dialog")
);
interface EventsTypeWithId extends EventType {
  id: string;
}
function EventCard({ event, uid }: { event: EventsTypeWithId; uid: string }) {
  return (
    <li className="border flex items-center justify-between md:h-[150px]  relative border-gray-300 rounded-xl  py-2 px-5 md:px-10  w-full">
      <div className="sm:flex sm:items-center md:h-full sm:space-x-5 md:space-x-6 lg:space-x-10">
        <div className="md:flex md:items-center md:h-full md:space-x-6 lg:space-x-10">
          <div className="space-y-3 mt-3">
            <div className="flex items-center space-x-3">
              <Clock size={20} />
              <div className="flex items-center space-x-1">
                <span>{`${event.start.hh}:${event.start.mm}`}</span>
                <span>-</span>
                <span>{`${event.end.hh}:${event.end.mm}`}</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin size={20} />
              <span>{event.location}</span>
            </div>
          </div>
        </div>

        <div className="space-y-1 sm:mt-0 mt-5">
          <span className="font-bold text-xl">{event.title}</span>
          <div className="flex items-center space-x-2 text-sm">
            <span className="block h-2 w-2 bg-green-500 rounded-full" />
            <span>{event.type}</span>
          </div>
        </div>
      </div>

      <EditEventDialog
        classNames={{
          triggerButtonClassName:
            "bg-green-100 sm:static absolute right-2 top-2 px-2 text-green-800 font-bold text-lg transition-all hover:bg-green-500 hover:text-white",
          triggerVariant: "secondary",
        }}
        event={event}
        uid={uid}
        trigger={<span>Edit</span>}
      />
    </li>
  );
}

export default EventCard;
