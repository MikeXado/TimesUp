"use client";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Control, Controller } from "react-hook-form";

function AddDate({
  control,
  date,
}: {
  control: Control<{
    title: string;
    description: string;
    priority: string;
    _createdAt?: Date;
    status: string;
  }>;
  date?: Date;
}) {
  return (
    <div className="w-1/2">
      <Label htmlFor="date" className="font-semibold">
        Date
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
            name="_createdAt"
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

export default AddDate;
