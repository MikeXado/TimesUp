import isSameDay from "date-fns/isSameDay";
import parseISO from "date-fns/parseISO";
import { EventsType } from "../types";
export const getEventByDay = (events: EventsType[], day: Date) => {
  return events.filter((el) => isSameDay(parseISO(el.date), day));
};
