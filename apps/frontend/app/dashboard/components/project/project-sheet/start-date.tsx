import { Label } from "@/components/ui/label";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Control, Controller } from "react-hook-form";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

function StartDate({
  control,
  date,
}: {
  control: Control<{
    title: string;
    description: string;
    type: string;
    start?: Date;
    end?: Date;
    status: string;
  }>;
  date?: Date;
}) {
  return (
    <div className="w-1/2">
      <Label htmlFor="date" className="font-semibold">
        Start Date
      </Label>
      <Popover>
        <PopoverTrigger className={cn("w-full")}>
          <div className="border border-input  flex px-3 py-2 items-center justify-between rounded-xl ">
            <span className="text-gray-500 text-sm">
              {date ? format(date, "dd/MM/yyyy") : "Pick date"}
            </span>
            <CalendarIcon />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[350px]">
          <Controller
            name="start"
            control={control}
            render={({ field }) => (
              <Calendar
                mode="single"
                id="date"
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

export default StartDate;
