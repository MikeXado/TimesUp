"use client";
import { Calendar } from "@/components/ui/calendar";
import React, { useState } from "react";

function TodayDate() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <Calendar
      classNames={{ day: "w-16 h-[50px]", head_cell: "w-16" }}
      mode="single"
      selected={date}
      onSelect={setDate}
    />
  );
}

export default TodayDate;
