import { useContext } from "react";
import { EventsType } from "../../../../../types";
import ChangeEvent from "../ChangeEvent";
import { ChangeEventContext } from "../context/ChangeEventProvider";

export default function MobileEvent({
  event,
  day,
}: {
  event: EventsType;
  day: Date;
}) {
  const { setIsOpen } = useContext(ChangeEventContext);
  const handleIsOpen = () => {
    setIsOpen(true);
  };
  return (
    <>
      <button className="ml-5 mt-5" onClick={handleIsOpen}>
        <div className="font-semibold  text-md">{event.title}</div>
        <div className="mt-5">
          <span className="bg-[#192555] px-5 rounded-lg py-2">
            {event.startTime}
          </span>{" "}
          -{" "}
          <span className="bg-[#192555] px-5 rounded-lg py-2">
            {event.endTime}
          </span>
        </div>
      </button>
      <ChangeEvent eventId={event.id} day={day} />
    </>
  );
}
