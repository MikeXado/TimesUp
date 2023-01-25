import { Dropdown } from "flowbite-react";
import { useEffect, useState } from "react";
import { clientPusher } from "../../../../../pusher";
export default function Notification() {
  const [newMessage, setNewMessage] = useState([]);
  useEffect(() => {
    const channel = clientPusher.subscribe("messages");

    channel.bind("new-message", (data) => {
      console.log("new message from: ", data.displayName);
      setNewMessage((prev) => [...prev, data]);
    });
  }, [newMessage]);

  console.log(newMessage);

  return (
    <>
      <Dropdown
        size={15}
        options={[
          {
            label: "New",
          },
        ]}
        label={
          <>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
            </svg>
            <div className="relative flex">
              <div className="relative inline-flex w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-2 right-3 dark:border-gray-900"></div>
            </div>
          </>
        }
        arrowIcon={false}
        color={false}
      >
        {
          (newMessage.length = 0 ? (
            <Dropdown.Item>No messages yet</Dropdown.Item>
          ) : (
            newMessage.map((message, index) => {
              return (
                <Dropdown.Item key={index}>{message.message}</Dropdown.Item>
              );
            })
          ))
        }
      </Dropdown>
    </>
  );
}
