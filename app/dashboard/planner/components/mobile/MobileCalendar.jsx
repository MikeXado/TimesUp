"use client";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameDay,
  parse,
  parseISO,
  startOfMonth,
  startOfToday,
} from "date-fns";
import { Suspense, useContext, useState } from "react";
import { UserContext } from "../../../contexts/UserProvider";
import useSWR from "swr";
import MobileCalendarDay from "./MobileCalendarDay";
import MobileEvents from "./MobileEvents";
import AddEvent from "../AddEvent";
import { Spinner } from "flowbite-react";
export default function MobileCalendar({ events }) {
  let today = startOfToday();
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const [selectedDay, setSelectedDay] = useState(today);
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
    <div className="grid md:grid-cols-2 gap-4  lg:hidden">
      <div className="text-white bg-[#111c44] rounded-lg w-full h-[400px] max-w-full lg:hidden">
        <div className="flex flex-grow w-full h-full overflow-auto">
          <div className="flex flex-col flex-grow">
            <div className="relative flex items-center mt-4  border-b-[0.5px] border-gray-300 pb-5">
              <div className="flex ml-6">
                <button onClick={prevMonth}>
                  <svg
                    className="w-4 h-4"
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
                    className="w-4 h-4"
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
              <div className="ml-2  text-lg  font-bold leading-none">
                {format(firstDayCurrentMonth, "MMMM yyyy")}
              </div>
            </div>
            <div className="grid grid-cols-7  mt-4 text-center">
              <div className="pl-1 text-sm">S</div>
              <div className="pl-1 text-sm">M</div>
              <div className="pl-1 text-sm">T</div>
              <div className="pl-1 text-sm">W</div>
              <div className="pl-1 text-sm">T</div>
              <div className="pl-1 text-sm">F</div>
              <div className="pl-1 text-sm">S</div>
            </div>

            <div className="grid h-full grid-cols-7 grid-rows-5  mt-2">
              {days.map((day, dayIdx) => {
                return (
                  <MobileCalendarDay
                    key={day}
                    selectedDay={selectedDay}
                    setSelectedDay={setSelectedDay}
                    day={day}
                    dayIdx={dayIdx}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <MobileEvents selectedDay={selectedDay} events={events} />
    </div>
  );
}
