import Pusher from "pusher";
import ClientPusher from "pusher-js";

interface ServerPusherConfig {
  appId: string;
  key: string;
  secret: string;
  cluster: string;
}
interface ClientPusherConfig {
  key: string;
  cluster: string;
}

export const serverPusher: Pusher = new Pusher({
  appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID
    ? process.env.NEXT_PUBLIC_PUSHER_APP_ID
    : "",
  key: process.env.NEXT_PUBLIC_PUSHER_KEY || "",
  secret: process.env.PUSHER_SECRET || "",
  cluster: "us2",
} as ServerPusherConfig);

export const clientPusher: ClientPusher = new ClientPusher(
  process.env.NEXT_PUBLIC_PUSHER_KEY ? process.env.NEXT_PUBLIC_PUSHER_KEY : "",
  {
    cluster: "us2",
  } as ClientPusherConfig
);
