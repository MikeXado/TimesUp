export default function MobileEvent({ event }) {
  return (
    <div className="ml-5 mt-5">
      <div className="font-semibold text-md">{event.title}</div>
      <div className="mt-5">
        <span className="bg-[#192555] px-5 rounded-lg py-2">
          {event.startTime}
        </span>{" "}
        -{" "}
        <span className="bg-[#192555] px-5 rounded-lg py-2">
          {event.endTime}
        </span>
      </div>
    </div>
  );
}
