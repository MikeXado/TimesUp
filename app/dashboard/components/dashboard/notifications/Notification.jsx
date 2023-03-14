import { useContext } from "react";
import { NotificationsContext } from "../../../contexts/NotificationsProvider";

export default function Notification({ notification }) {
  const { removeNotification } = useContext(NotificationsContext);
  return (
    <button
      onClick={() => removeNotification(notification)}
      className="divide-y divide-gray-100 text-white"
    >
      {notification.message}
    </button>
  );
}
