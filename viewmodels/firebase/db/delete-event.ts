import { db } from "@/models/firebase-admin";

const deleteEvent = async (uid: string, eventId: string) => {
  try {
    const eventRef = db
      .collection("private")
      .doc(uid)
      .collection("events")
      .doc(eventId);
    await eventRef.delete();
    const message = {
      success: true,
      description: "Event was deleted successfully",
    };
    return message;
  } catch (err) {
    const message = {
      success: false,
      description:
        "Something went wrong during deleting event process. Try again later",
    };

    return message;
  }
};

export default deleteEvent;
