"use client";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SelectSingleEventHandler } from "react-day-picker";
function CalendarPopover() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dateSearch = searchParams?.get("date");
  const [date, setDate] = useState<Date | undefined>(
    dateSearch ? new Date(dateSearch) : new Date()
  );

  const handleDateSearch = (currentDate: Date | undefined) => {
    if (currentDate) {
      setDate(currentDate);
      const newSearchParams = new URLSearchParams(searchParams?.toString());
      newSearchParams.set("date", currentDate.toISOString());
      router.push(`${pathname}?${newSearchParams.toString()}`);
    }
  };

  useEffect(() => {
    if (dateSearch) {
      setDate(new Date(dateSearch));
    }
  }, [dateSearch]);

  return (
    <Popover>
      <PopoverTrigger>
        <CalendarCheck />
      </PopoverTrigger>
      <PopoverContent className={cn("w-full")}>
        <div className="flex items-center justify-center">
          <Calendar
            mode="single"
            classNames={{
              day_selected:
                "bg-green-500 text-white hover:bg-green-600 hover:text-white",
            }}
            selected={date}
            onSelect={handleDateSearch}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default CalendarPopover;
