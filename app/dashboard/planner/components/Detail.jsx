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
  return (
    <>
      <ChangeEvent eventId={eventId} day={day} />

      <DetailPopup setIsOpen={setIsOpen} isOpen={isOpen} event={event} />
    </>
  );
});
