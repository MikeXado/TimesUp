import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { Control, Controller } from "react-hook-form";

interface FormType {
  title: string;
  type?: string;
  date?: Date | undefined;
  start: {
    hh: string;
    mm: string;
  };
  end: {
    hh: string;
    mm: string;
  };
  location: string;
}

function DatePopover({
  date,
  control,
}: {
  date: Date | undefined;
  control: Control<FormType>;
}) {
  return (
    <div className="mt-5">
      <Label htmlFor="start-date" className="block text-md">
        Date
      </Label>
      <Popover>
        <PopoverTrigger className={cn("w-full")}>
          <div className="border border-input w-full flex px-3 py-2 items-center justify-between rounded-xl mt-1">
            <span className="text-gray-500 text-sm">
              {date ? format(date, "dd/MM/yyyy") : "pick date"}
            </span>
            <CalendarIcon />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[350px]">
          <Controller
            name="date"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Calendar
                required={true}
                mode="single"
                id="start-date"
                className="flex justify-center items-center"
                selected={field.value}
                onSelect={field.onChange}
              />
            )}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DatePopover;
