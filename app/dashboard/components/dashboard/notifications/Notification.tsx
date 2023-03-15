import { useContext } from "react";

import { NotificationsContext } from "../../../contexts/NotificationsProvider";

export default function Notification({ notification: { message } }) {
  const { removeNotification } = useContext(NotificationsContext);

  return (
    <button
      onClick={() => removeNotification()}
      className="divide-y divide-gray-100 text-white"
    >
      {message}
    </button>
  );
}
