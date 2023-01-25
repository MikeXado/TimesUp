import Pusher from "pusher";
import ClientPusher from "pusher-js";

export const serverPusher = new Pusher({
  appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY,
  secret: process.env.NEXT_PUBLIC_PUSHER_SECRET,
  cluster: "eu",
  useTLS: true,
});

export const clientPusher = new ClientPusher(
  process.env.NEXT_PUBLIC_PUSHER_KEY,
  {
    cluster: "eu",
    forceTLS: true,
  }
);
