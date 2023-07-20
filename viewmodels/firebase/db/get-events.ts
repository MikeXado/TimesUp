import { db } from "@/models/firebase-admin";
import { EventType } from "@/types";

interface EventTypeWithId extends EventType {
  id: string;
}

const getEvents = async (uid: string) => {
  try {
    const eventsRef = db.collection("private").doc(uid).collection("events");

    let eventsRefOrder = eventsRef.orderBy("date", "asc");

    const eventsSnapshot = await eventsRefOrder.get();
    let events: EventTypeWithId[] = [];
    eventsSnapshot.forEach((snap) => {
      const data = snap.data();
      const receivedData: EventTypeWithId = {
        id: snap.id,
        title: data.title,
        type: data.type,
        start: data.start,
        end: data.end,
        location: data.location,
        date: data.date,
      };

      events.push(receivedData);
    });

    return events;
  } catch (err: any) {
    throw new Error(err);
  }
};

export default getEvents;
