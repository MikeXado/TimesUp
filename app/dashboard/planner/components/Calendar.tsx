"use client";

import { useEffect, useContext, useRef, useState } from "react";
import {
  format,
  startOfToday,
  endOfMonth,
  add,
  parse,
  eachDayOfInterval,
  startOfMonth,
  isSameDay,
} from "date-fns";
import { snapCenterToCursor } from "@dnd-kit/modifiers";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Event from "./Event";
import Day from "./Day";
import {
  findEventsSectionContainer,
  initializeEventsSections,
} from "../../../../utils/board";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import useSWR, { mutate } from "swr";
import { Spinner } from "flowbite-react";
import { UserContext } from "../../contexts/UserProvider";
import { EventsType } from "../../../../types";

export default function Calendar({ events }: { events: EventsType[] }) {
  const uid = useContext(UserContext);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const eventsFetcher = async () => {
    const res = await fetch(`/api/v1/${uid}/planner/events`, {
      method: "GET",
    });

    const events = await res.json();
    return events;
  };

  const { data, isLoading } = useSWR<EventsType[], Boolean>(
    `/api/v1/${uid}/planner/events`,
    eventsFetcher,
    {
      fallbackData: events,
      revalidateOnMount: true,
    }
  );

  let today = startOfToday();
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const [activeId, setActiveId] = useState(null);
  const [hoverDay, setHoverDay] = useState(undefined);

  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  let days = eachDayOfInterval({
    start: startOfMonth(firstDayCurrentMonth),
    end: endOfMonth(firstDayCurrentMonth),
  });
  const newDays = useRef(days);

  const initialEventsSesions = initializeEventsSections(
    events,
    newDays.current
  );
  const [eventsSections, setEventsSections] = useState(initialEventsSesions);

  useEffect(() => {
    if (!data) {
      mutate(`/api/v1/${uid}/planner/events`);
    }
    setEventsSections(() => {
      return initializeEventsSections(data, newDays.current);
    });
  }, [data, uid]);

  const nextMonth = () => {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
    let newFirstDayCurrentMonth = parse(
      format(firstDayNextMonth, "MMM-yyyy"),
      "MMM-yyyy",
      new Date()
    );
    let newMonthDaysInterval = eachDayOfInterval({
      start: startOfMonth(newFirstDayCurrentMonth),
      end: endOfMonth(newFirstDayCurrentMonth),
    });
    const newMonthEventsSections = initializeEventsSections(
      data,
      newMonthDaysInterval
    );
    setEventsSections(newMonthEventsSections);
  };
  const prevMonth = () => {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
    let newFirstDayCurrentMonth = parse(
      format(firstDayNextMonth, "MMM-yyyy"),
      "MMM-yyyy",
      new Date()
    );
    let prevMonthDaysInterval = eachDayOfInterval({
      start: startOfMonth(newFirstDayCurrentMonth),
      end: endOfMonth(newFirstDayCurrentMonth),
    });
    const prevMonthEventsSections = initializeEventsSections(
      data,
      prevMonthDaysInterval
    );
    setEventsSections(prevMonthEventsSections);
  };

  const handleDragStart = ({ active }) => {
    const { id, data } = active;
    setActiveId(id);
    setHoverDay(data.current.date);
  };

  const handleDragOver = async ({ active, over }) => {
    const { id, data } = active;
    const { id: overId } = over;

    if (overId) {
      const activeContainer = findEventsSectionContainer(eventsSections, id);
      const overContainer = findEventsSectionContainer(eventsSections, overId);

      if (
        !activeContainer ||
        !overContainer ||
        isSameDay(new Date(activeContainer), new Date(overContainer))
        // isSameDay(new Date(activeContainer), new Date(overContainer))
      ) {
        return;
      }

      setEventsSections((eventSection) => {
        const activeItems = eventSection[activeContainer];
        const overItems = eventSection[overContainer];

        // Find the indexes for the items
        const activeIndex = activeItems.findIndex((item) => item.id === id);
        const overIndex = overItems.findIndex((item) => item.id !== overId);

        return {
          ...eventSection,
          [activeContainer]: [
            ...eventSection[activeContainer].filter(
              (item: { id: any }) => item.id !== id
            ),
          ],
          [overContainer]: [
            ...eventSection[overContainer].slice(0, overIndex),
            eventSection[activeContainer][activeIndex],
            ...eventSection[overContainer].slice(
              overIndex,
              eventSection[overContainer].length
            ),
          ],
        };
      });

      const event = data.current;
      await fetch(`/api/v1/${uid}/planner/${event?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: event?.title,
          description: event?.description,
          startTime: event?.startTime,
          endTime: event?.endTime,
          id: event?.id,
          date: overId,
          uid: uid,
        }),
      });
    }
  };
  const event = data.find((el) => el.id === activeId);

  const handleDragEnd = async (e: { active: any; over: any }) => {
    const { active, over } = e;
    const { id, data } = active;
    if (over) {
      const { id: overId } = over;

      const activeContainer = findEventsSectionContainer(eventsSections, id);
      const overContainer = findEventsSectionContainer(eventsSections, overId);
      if (
        !activeContainer ||
        !overContainer ||
        !isSameDay(new Date(activeContainer), new Date(overContainer))
      ) {
        return;
      }
      //
      const activeIndex = eventsSections[activeContainer].findIndex(
        (task: EventsType) => task.id === id
      );
      const overIndex = eventsSections[overContainer].findIndex(
        (task: EventsType) => task.id !== overId
      );

      if (activeIndex !== overIndex) {
        setEventsSections((eventSection) => ({
          ...eventSection,
          [overContainer]: arrayMove(
            eventSection[overContainer],
            activeIndex,
            overIndex
          ),
        }));
      }
    }
  };

  if (!data) {
    return (
      <div className="flex w-full justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="text-white  bg-[#111c44] rounded-lg w-full overflow-hidden hidden lg:block">
      <div className="flex flex-grow w-full h-[calc(100vh-90px)] overflow-auto">
        <div className="flex flex-col flex-grow">
          <div className="flex items-center mt-4  border-b-2 pb-5">
            <div className="flex ml-6">
              <button onClick={prevMonth}>
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button onClick={nextMonth}>
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
            <div className="ml-2  text-xl font-bold leading-none">
              {format(firstDayCurrentMonth, "MMMM yyyy")}
            </div>
          </div>
          <div className="grid grid-cols-7 mt-4">
            <div className="pl-1 text-sm">Sun</div>
            <div className="pl-1 text-sm">Mon</div>
            <div className="pl-1 text-sm">Tue</div>
            <div className="pl-1 text-sm">Wed</div>
            <div className="pl-1 text-sm">Thu</div>
            <div className="pl-1 text-sm">Fri</div>
            <div className="pl-1 text-sm">Sat</div>
          </div>
          <DndContext
            sensors={sensors}
            autoScroll={false}
            collisionDetection={closestCenter}
            modifiers={[snapCenterToCursor]}
            id="planner"
            onDragOver={handleDragOver}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="grid flex-grow w-full h-auto grid-cols-7 grid-rows-5 gap-px pt-px mt-1 bg-[#111c44]">
              {Object.keys(eventsSections).map((day, dayIdx) => {
                return (
                  <Day
                    key={day}
                    day={new Date(day)}
                    dayIdx={dayIdx}
                    events={eventsSections[day]}
                  />
                );
              })}
            </div>
            <DragOverlay>
              {event ? <Event event={event} day={hoverDay} /> : null}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </div>
  );
}
