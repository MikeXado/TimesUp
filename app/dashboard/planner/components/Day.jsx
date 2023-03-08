import { getDay, format, isSameDay, parseISO } from "date-fns";

import Droppable from "./dnd/Droppable";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Event from "./Event";
import AddEvent from "./AddEvent";
export default function Day({ day, dayIdx, events }) {
  return (
    <div
      className={
        "relative flex flex-col bg-[#192555] group " +
        (dayIdx === 0 ? colStartClasses[getDay(day)] : "")
      }
    >
      <span className="mx-2 my-1 text-xs font-bold">
        {format(day, "d MMM")}
      </span>
      <SortableContext items={events} id={dayIdx}>
        <Droppable dropableName={day}>
          {events.map((event) => {
            return <Event key={event.id} event={event} day={day} />;
          })}
        </Droppable>
      </SortableContext>
      <AddEvent day={day} />
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
