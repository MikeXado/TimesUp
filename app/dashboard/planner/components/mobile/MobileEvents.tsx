import { format, isSameDay, parseISO } from "date-fns";
import { Spinner } from "flowbite-react";
import { useContext } from "react";
import useSWR from "swr";
import { EventsType } from "../../../../../types";

import { UserContext } from "../../../contexts/UserProvider";
import AddEvent from "../AddEvent";
import MobileEvent from "./MobileEvent";

export default function MobileEvents({
  selectedDay,
  events,
}: {
  selectedDay: Date;
  events: EventsType[];
}) {
  const uid = useContext(UserContext);
  const eventsFetcher = async (): Promise<EventsType[]> => {
    const res = await fetch(`/api/v1/${uid}/planner/events`, {
      method: "GET",
    });

    const events = await res.json();
    return events;
  };

  const { data, isLoading } = useSWR<EventsType[], boolean>(
    `/api/v1/${uid}/planner/events`,
    eventsFetcher,
    {
      fallbackData: events,
      revalidateOnMount: true,
    }
  );

  const filteredEvents = data?.filter((el) => {
    return isSameDay(selectedDay, parseISO(el.date));
  });

  return (
    <div className="bg-[#111c44] px-5 pt-5 text-white rounded-lg h-screen overflow-y-auto w-full">
      <div className="font-bold text-lg">
        Schedule for {format(selectedDay, "MMMM dd,yyyy")}
      </div>
      <div className="relative mt-2">
        <AddEvent day={selectedDay} />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-full w-full">
          <Spinner />
        </div>
      ) : (
        handlingNoEvents(filteredEvents, selectedDay)
      )}
    </div>
  );
}

function handlingNoEvents(filteredEvents: EventsType[], selectedDay: Date) {
  return (
    <>
      {filteredEvents?.length === 0 ? (
        <div className="flex justify-center items-center mt-10 pb-10">
          No events yet
        </div>
      ) : (
        filteredEvents?.map((el) => {
          return (
            <>
              <MobileEvent key={el.id} event={el} day={selectedDay} />
              <hr className="bg-gray-300 mt-10" />
            </>
          );
        })
      )}
    </>
  );
}
