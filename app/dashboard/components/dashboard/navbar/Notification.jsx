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
              width="27"
              height="27"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 17.8476C17.6392 17.8476 20.2481 17.1242 20.5 14.2205C20.5 11.3188 18.6812 11.5054 18.6812 7.94511C18.6812 5.16414 16.0452 2 12 2C7.95477 2 5.31885 5.16414 5.31885 7.94511C5.31885 11.5054 3.5 11.3188 3.5 14.2205C3.75295 17.1352 6.36177 17.8476 12 17.8476Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.3888 20.8572C13.0247 22.3719 10.8967 22.3899 9.51947 20.8572"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
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
