"use client";

import { useEffect, useState } from "react";
import {
  format,
  startOfToday,
  startOfWeek,
  endOfWeek,
  endOfMonth,
  add,
  parse,
  eachDayOfInterval,
  startOfMonth,
  parseISO,
  isSameDay,
} from "date-fns";
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
export default function Calendar({ events, uid }) {
  let today = startOfToday();
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const [activeId, setActiveId] = useState(null);

  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  let days = eachDayOfInterval({
    start: startOfMonth(firstDayCurrentMonth),
    end: endOfMonth(firstDayCurrentMonth),
  });
  const initialEventsSesions = initializeEventsSections(events, days);
  const [eventsSections, setEventsSections] = useState(initialEventsSesions);

  const nextMonth = () => {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });

    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  };
  const prevMonth = () => {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });

    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  };

  const handleDragStart = ({ active }) => {
    setActiveId(active.id);
  };

  const handleDragOver = async ({ active, over }) => {
    const { id, data } = active;
    const { id: overId } = over;

    const activeContainer = findEventsSectionContainer(eventsSections, id);
    const overContainer = findEventsSectionContainer(eventsSections, overId);

    console.log(activeContainer, overContainer);

    if (
      !activeContainer ||
      !overContainer ||
      isSameDay(new Date(activeContainer), new Date(overContainer))
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
          ...eventSection[activeContainer].filter((item) => item.id !== id),
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

    return await fetch("/api/changeEvent", {
      method: "POST",
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
  };
  const event = events.find((el) => el.id === activeId);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    const { id, data } = active;
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

    const activeIndex = eventsSections[activeContainer].findIndex(
      (task) => task.id === id
    );
    const overIndex = eventsSections[overContainer].findIndex(
      (task) => task.id !== overId
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
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div className="text-gray-700 mt-24 bg-white w-full">
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
            <h2 className="ml-2  text-xl font-bold leading-none">
              {format(firstDayCurrentMonth, "MMMM yyyy")}
            </h2>
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
            id="planner"
            onDragOver={handleDragOver}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="grid flex-grow w-full h-auto grid-cols-7 grid-rows-5 gap-px pt-px mt-1 bg-gray-200">
              {Object.keys(eventsSections).map((day, dayIdx) => {
                return (
                  <Day
                    key={day}
                    day={new Date(day)}
                    dayIdx={dayIdx}
                    events={eventsSections[day]}
                    uid={uid}
                  />
                );
              })}
            </div>
            <DragOverlay>
              {event ? <Event event={event} uid={uid} /> : null}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </div>
  );
}
