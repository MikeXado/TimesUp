"use client";

import { useState } from "react";
import {
  format,
  startOfToday,
  startOfWeek,
  endOfWeek,
  endOfMonth,
  add,
  parse,
  eachDayOfInterval,
  startOfMonth,
} from "date-fns";
import dynamic from "next/dynamic";

const Day = dynamic(() => import("./Day"));
export default function Calendar({ events }) {
  let today = startOfToday();
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));

  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  let days = eachDayOfInterval({
    start: startOfMonth(firstDayCurrentMonth),
    end: endOfMonth(firstDayCurrentMonth),
  });

  const nextMonth = () => {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });

    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  };
  const prevMonth = () => {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });

    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  };

  return (
    <div className="relative text-gray-700 bg-white w-full">
      <div className="flex flex-grow w-full h-[calc(100vh-90px)] overflow-auto">
        <div className="flex flex-col flex-grow">
          <div className="flex items-center mt-4  border-b-2 pb-5">
            <div className="flex ml-6">
              <button onClick={prevMonth}>
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button onClick={nextMonth}>
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
            <h2 className="ml-2  text-xl font-bold leading-none">
              {format(firstDayCurrentMonth, "MMMM yyyy")}
            </h2>
          </div>
          <div className="grid grid-cols-7 mt-4">
            <div className="pl-1 text-sm">Sun</div>
            <div className="pl-1 text-sm">Mon</div>
            <div className="pl-1 text-sm">Tue</div>
            <div className="pl-1 text-sm">Wed</div>
            <div className="pl-1 text-sm">Thu</div>
            <div className="pl-1 text-sm">Fri</div>
            <div className="pl-1 text-sm">Sat</div>
          </div>
          <div className="grid flex-grow w-full h-auto grid-cols-7 grid-rows-5 gap-px pt-px mt-1 bg-gray-200">
            {days.map((day, dayIdx) => {
              return (
                <Day key={dayIdx} day={day} dayIdx={dayIdx} events={events} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
