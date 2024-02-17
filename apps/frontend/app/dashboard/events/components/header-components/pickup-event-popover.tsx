"use client";
import React, { useContext } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { DateStateContext } from "../../context/DateStateProvider";
import { cn } from "@/lib/utils";

function PickupEventsPopover() {
  const { date, setDate } = useContext(DateStateContext);

  return (
    <Popover>
      <PopoverTrigger>
        <ChevronDown />
      </PopoverTrigger>
      <PopoverContent className={cn("w-full")}>
        <Calendar
          classNames={{
            day_selected:
              "bg-green-500 text-white font-bold hover:bg-green-600 hover:text-white",
          }}
          mode="multiple"
          selected={date}
          onSelect={setDate}
        />
      </PopoverContent>
    </Popover>
  );
}

export default PickupEventsPopover;
