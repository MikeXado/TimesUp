import { useContext } from "react";
import { MessageType } from "../../../../../types";
import { UserContext } from "../../../contexts/UserProvider";

export default function Message({ message }: { message: MessageType }) {
  const uid = useContext(UserContext);
  return (
    <div key={message.id} className="chat-message mb-5">
      <div
        className={
          "flex items-end" +
          (uid === message.uid ? " justify-end" : " justify-start")
        }
      >
        <div
          className={
            "flex flex-col space-y-2 text-sm max-w-xs mx-2 order-2" +
            (uid === message.uid ? " items-end" : " items-start")
          }
        >
          <div>
            <span
              className={
                "px-4 py-2 inline-block bg-[#6e6ae4] break-all text-white" +
                (uid === message.uid
                  ? " rounded-l-lg rounded-tr-lg"
                  : " rounded-r-lg rounded-tl-lg")
              }
            >
              {message.message}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
