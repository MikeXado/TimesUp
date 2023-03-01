import { format, isSameDay, parseISO } from "date-fns";
import { Spinner } from "flowbite-react";
import { useContext } from "react";
import useSWR from "swr";
import { UserContext } from "../../../contexts/UserProvider";
import AddEvent from "../AddEvent";
import MobileEvent from "./MobileEvent";

export default function MobileEvents({ selectedDay }) {
  const uid = useContext(UserContext);
  const eventsFetcher = async () => {
    const res = await fetch("/api/getEvents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uid),
    });

    const events = await res.json();
    return events;
  };

  const { data, isLoading } = useSWR("/api/getEvents", eventsFetcher);

  const filteredEvents = data?.filter((el) => {
    return isSameDay(selectedDay, parseISO(el.date));
  });

  console.log(filteredEvents);
  return (
    <div className="relative bg-[#111c44] px-5 pt-5 text-white rounded-lg h-screen overflow-y-auto w-full">
      <div className="font-bold text-lg">
        Schedule for {format(selectedDay, "MMMM dd,yyyy")}
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-full">
          <Spinner />
        </div>
      ) : filteredEvents?.length === 0 ? (
        <div className="flex justify-center items-center mt-10 pb-10">
          No events yet
        </div>
      ) : (
        filteredEvents?.map((el) => {
          return (
            <>
              <MobileEvent key={el.id} event={el} />
              <hr className="bg-gray-300 mt-10" />
            </>
          );
        })
      )}
      <AddEvent day={selectedDay} />
    </div>
  );
}
