import { db } from "@/models/firebase-admin";
import { EventType } from "@/types";

const addEvent = async (uid: string, data: EventType) => {
  try {
    const colRef = db.collection("private").doc(uid).collection("events");
    await colRef.add(data);
    const message = {
      success: true,
      message: "Event was created successfully",
    };
    return message;
  } catch (err) {
    const message = {
      success: false,
      message:
        "Something went wrong during saving event proccess. Try again later",
    };
    return message;
  }
};

export default addEvent;
