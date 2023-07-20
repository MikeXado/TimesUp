import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
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

function TimeSelect({ control }: { control: Control<FormType> }) {
  const renderHourOptions = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i); // Generate an array of hours (0-23)

    return hours.map((hour) => (
      <SelectItem
        className={cn(" flex items-center justify-center w-full py-2 px-0")}
        key={hour}
        value={hour.toString().padStart(2, "0")}
      >
        {hour.toString().padStart(2, "0")}
      </SelectItem>
    ));
  };

  const renderMinuteOptions = () => {
    const minutes = Array.from({ length: 60 }, (_, i) => i); // Generate an array of minutes (0-59)

    return minutes.map((minute) => (
      <SelectItem
        className={cn(" flex items-center justify-center w-full py-2 px-0")}
        key={minute}
        value={minute.toString().padStart(2, "0")}
      >
        {minute.toString().padStart(2, "0")}
      </SelectItem>
    ));
  };

  return (
    <div className="flex items-center space-x-5 w-full mt-5">
      <div>
        <Label htmlFor="start">Start Time</Label>
        <div className="flex items-center space-x-2 ">
          <Controller
            name={`start.hh`}
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                required={true}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-full text-center">
                  <SelectValue placeholder="HH" />
                </SelectTrigger>
                <SelectContent
                  className={cn("overflow-y-auto h-[200px] w-full")}
                >
                  {renderHourOptions()}
                </SelectContent>
              </Select>
            )}
          />

          <span>:</span>

          <Controller
            name={`start.mm`}
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent
                  className={cn("overflow-y-auto h-[200px] w-full")}
                >
                  {renderMinuteOptions()}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="end">End Time</Label>
        <div className="flex items-center space-x-2 ">
          <Controller
            name={`end.hh`}
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-[70px] text-center">
                  <SelectValue placeholder="HH" />
                </SelectTrigger>
                <SelectContent
                  className={cn("overflow-y-auto h-[200px] w-full")}
                >
                  {renderHourOptions()}
                </SelectContent>
              </Select>
            )}
          />

          <span>:</span>
          <Controller
            name={`end.mm`}
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-[70px]">
                  <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent
                  className={cn("overflow-y-auto h-[200px] w-full")}
                >
                  {renderMinuteOptions()}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default TimeSelect;
