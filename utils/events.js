import { format } from "date-fns";
import isSameDay from "date-fns/isSameDay";
import parseISO from "date-fns/parseISO";
export const getEventByDay = (events, day) => {
  return events.filter((el) => isSameDay(parseISO(el.date), day));
};
