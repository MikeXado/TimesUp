import { isSameDay, parseISO } from "date-fns";
import { getEventByDay } from "./events";
import { getTaskByStatus } from "./tasks";

export const initializeBoard = (tasks, columns) => {
  const boardSestions = {};
  Object.keys(columns).forEach((columnKey) => {
    boardSestions[columnKey] = getTaskByStatus(tasks, columnKey);
  });

  return boardSestions;
};

export const initializeEventsSections = (events, days) => {
  const eventsSections = {};
  days.forEach((day) => {
    eventsSections[day] = getEventByDay(events, day);
  });
  return eventsSections;
};

export const findEventsSectionContainer = (eventsSections, id) => {
  if (id in eventsSections) {
    return id;
  }
  const container = Object.keys(eventsSections).find((key) =>
    eventsSections[key].find((item) => item.id === id)
  );

  return container;
};

export const findBoardSectionContainer = (boardSections, id) => {
  if (id in boardSections) {
    return id;
  }
  const container = Object.keys(boardSections).find((key) =>
    boardSections[key].find((item) => item.id === id)
  );

  return container;
};
