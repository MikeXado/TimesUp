import { useState } from "react";
import ChangeEvent from "./ChangeEvent";
import DetailPopup from "./DetailPopup";
export default function Detail({
  isOpen,
  eventId,
  setIsOpen,
  day,
  event,
  uid,
}) {
  const [isChangeOpen, setIsChangeOpen] = useState(false);

  return (
    <>
      {isChangeOpen ? (
        <ChangeEvent
          isOpen={isChangeOpen}
          eventId={eventId}
          setIsOpen={setIsChangeOpen}
          day={day}
          uid={uid}
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
