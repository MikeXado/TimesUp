import { EventsType, KanbanTaskType } from "../types";
import { getEventByDay } from "./events";
import { getTaskByStatus } from "./tasks";

export const initializeBoard = (
  tasks: KanbanTaskType[],
  columns: { [key: string]: string }
) => {
  let boardSestions = {};
  Object.keys(columns).forEach((columnKey) => {
    boardSestions[columnKey] = getTaskByStatus(tasks, columnKey);
  });

  return boardSestions;
};

export const initializeEventsSections = (
  events: EventsType[],
  days: Date[]
) => {
  const eventsSections = {};

  days.forEach((day) => {
    eventsSections[day.toString()] = getEventByDay(events, day);
  });
  return eventsSections;
};

export const findEventsSectionContainer = (
  eventsSections: { [key: string]: EventsType[] },
  id: string
) => {
  if (id in eventsSections) {
    return id;
  }
  const container = Object.keys(eventsSections).find((key) =>
    eventsSections[key].find((item) => item.id === id)
  );

  return container;
};

export const findBoardSectionContainer = (
  boardSections: { [key: string]: KanbanTaskType[] },
  id: string
) => {
  if (id in boardSections) {
    return id;
  }
  const container = Object.keys(boardSections).find((key) =>
    boardSections[key].find((item) => item.id === id)
  );

  return container;
};
