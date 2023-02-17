import { memo, useState } from "react";
import ChangeEvent from "./ChangeEvent";
import DetailPopup from "./DetailPopup";
export default memo(function Detail({
  isOpen,
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
});
