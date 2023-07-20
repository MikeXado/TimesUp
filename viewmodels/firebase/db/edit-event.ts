import { db } from "@/models/firebase-admin";
import { EventType } from "@/types";

const editEvent = async (uid: string, eventId: string, data: EventType) => {
  try {
    const eventRef = db
      .collection("private")
      .doc(uid)
      .collection("events")
      .doc(eventId);
    await eventRef.update({
      title: data.title,
      date: data.date,
      start: data.start,
      end: data.end,
      type: data.type,
      location: data.location,
    });
    const message = {
      success: true,
      description: "Event was edited successfully",
    };

    return message;
  } catch (err) {
    const message = {
      success: false,
      description:
        "Something went wrong during editing event process. Try again later",
    };

    return message;
  }
};

export default editEvent;
