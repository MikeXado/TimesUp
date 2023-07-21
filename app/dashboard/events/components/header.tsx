"use client";
import React from "react";
import EventsPageHeading from "./header-components/heading";
import PickupEventsPopover from "./header-components/pickup-event-popover";
import { Plus } from "lucide-react";
import AddEventDialog from "../../components/events/add-event-dialog";

function EventsPageHeader() {
  return (
    <div className="md:flex md:justify-between md:items-center">
      <div className="flex items-center sm:space-x-2 space-x-1">
        <EventsPageHeading />
        <PickupEventsPopover />
      </div>
      <AddEventDialog
        trigger={
          <>
            <Plus /> <span>New Event</span>
          </>
        }
        classNames={{
          triggerButtonClassName:
            "flex items-center md:mt-0 mt-5 space-x-2  rounded-xl px-2 py-2 bg-green-200 text-green-800 text-md font-bold transition-all duration-300 ease-in-out hover:bg-green-300 ",
        }}
      />
    </div>
  );
}

export default EventsPageHeader;
