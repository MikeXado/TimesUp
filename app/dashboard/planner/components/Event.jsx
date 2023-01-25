import dynamic from "next/dynamic";
import { useState } from "react";

const Detail = dynamic(() => import("./Detail"));
export default function Event({ event, setIsFetching, startTransition, day }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      <button
        onClick={handleIsOpen}
        className="flex items-center flex-shrink-0 h-8 px-1 pb-2 text-xs hover:bg-gray-200"
      >
        <span className="flex-shrink-0 w-2 h-2 bg-green-400 rounded-full"></span>
        <span className="ml-2 font-light leading-none">{event.startTime}</span>
        <span className="ml-2 font-medium leading-none truncate">
          {event.title}
        </span>
      </button>
      <Detail
        isOpen={isOpen}
        eventId={event.id}
        setIsFetching={setIsFetching}
        startTransition={startTransition}
        setIsOpen={setIsOpen}
        day={day}
        event={event}
      />
    </>
  );
}
