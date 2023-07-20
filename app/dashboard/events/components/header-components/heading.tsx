"use client";
import React, { useContext } from "react";
import { DateStateContext } from "../../context/DateStateProvider";
import { format, isSameDay } from "date-fns";
import { Minus } from "lucide-react";
function EventsPageHeading() {
  const { date } = useContext(DateStateContext);
  const firstDateOfSelection = date && date[0];
  const lastDateOfSelection = date && date[date.length - 1];

  if (date?.length === 0) {
    return <h3 className="text-4xl font-bold">No Picked Date</h3>;
  }

  return (
    <>
      {date?.length !== 1 ? (
        <div className="sm:text-4xl min-[340px]:text-2xl text-xl font-bold flex items-center sm:space-x-2 space-x-1">
          <span>{format(firstDateOfSelection!, "dd.MM.yyyy")}</span>
          <span>
            <Minus />
          </span>
          <span>{format(lastDateOfSelection!, "dd.MM.yyyy")}</span>
        </div>
      ) : (
        <h3 className="sm:text-4xl  min-[340px]:text-2xl text-xl font-bold">
          {isSameDay(firstDateOfSelection!, new Date())
            ? "Today"
            : format(firstDateOfSelection!, "dd.MM.yyyy")}
        </h3>
      )}
    </>
  );
}

export default EventsPageHeading;
