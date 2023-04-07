import { useContext } from "react";
import { MessageType } from "../../../../../types";
import RootLayout from "../../../../layout";
import { UserContext } from "../../../contexts/UserProvider";
import VoicePlayer from "./VoicePlayer";

export default function Message({ data }: { data: MessageType }) {
  const uid = useContext(UserContext);
  let audioUrl = ""
  if (data.message.type === "audio") {
    const buffer = Buffer.from(data.message.value)
  const blob = new Blob([buffer] , {type: "audio/webm"})
  const urlAudio = URL.createObjectURL(blob)
  audioUrl = urlAudio
  }

  return (
    <div key={data.id} className="chat-message mb-5">
      <div
        className={
          "flex items-end" +
          (uid === data.uid ? " justify-end" : " justify-start")
        }
      >
        <div
          className={
            "flex flex-col space-y-2 text-sm max-w-xs mx-2 order-2" +
            (uid === data.uid ? " items-end" : " items-start")
          }
        >
          <div>
            {data?.message?.type === "audio" ? (
              <VoicePlayer audioUrl={audioUrl} />
            ) : (
              <span
                className={
                  "px-4 py-2 inline-block bg-[#6e6ae4] break-all text-white" +
                  (uid === data.uid
                    ? " rounded-l-lg rounded-tr-lg"
                    : " rounded-r-lg rounded-tl-lg")
                }
              >
                {`${data?.message?.value}`}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
