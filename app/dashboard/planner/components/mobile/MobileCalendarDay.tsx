import { format, getDay, isEqual, isToday } from "date-fns";

interface MobileCalendarDayType {
  day: Date;
  dayIdx: number;
  selectedDay: Date;
  setSelectedDay: (selectedDay: Date) => void;
}

export default function MobileCalendarDay({
  day,
  dayIdx,
  selectedDay,
  setSelectedDay,
}: MobileCalendarDayType) {
  return (
    <div className={dayIdx === 0 ? colStartClasses[getDay(day)] : ""}>
      <button
        onClick={() => setSelectedDay(day)}
        className={
          "flex  mx-auto justify-center items-center rounded-full w-10 h-10 " +
          (isEqual(day, selectedDay) && isToday(day)
            ? "bg-red-500"
            : isEqual(day, selectedDay) && !isToday(day)
            ? " bg-blue-500"
            : "") +
          (isEqual(day, selectedDay)
            ? " text-white"
            : isToday(day)
            ? " text-red-500"
            : "")
        }
      >
        {format(day, "d")}
      </button>
    </div>
  );
}

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
