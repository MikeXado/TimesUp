import dynamic from "next/dynamic";
import { useState } from "react";

const ChangeEvent = dynamic(() => import("./ChangeEvent"));
const DetailPopup = dynamic(() => import("./DetailPopup"));
export default function Detail({
  isOpen,
  setIsFetching,
  startTransition,
  eventId,
  setIsOpen,
  day,
  event,
}) {
  const [isChangeOpen, setIsChangeOpen] = useState(false);

  return (
    <>
      {isChangeOpen ? (
        <ChangeEvent
          isOpen={isChangeOpen}
          eventId={eventId}
          setIsFetching={setIsFetching}
          startTransition={startTransition}
          setIsOpen={setIsChangeOpen}
          day={day}
        />
      ) : (
        <DetailPopup
          setIsOpen={setIsOpen}
          setChangeOpen={setIsChangeOpen}
          isOpen={isOpen}
          event={event}
        />
      )}
    </>
  );
}
