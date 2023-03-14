"use client";
import { useState, createContext, useMemo, useCallback } from "react";

export const NotificationsContext = createContext({
  notifications: [],
  addNotification: () => {},
  removeNotification: () => {},
});

export default function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback(
    (notification) => {
      setNotifications([...notifications, notification]);
    },
    [notifications]
  );

  const removeNotification = useCallback(
    (notification) => {
      const newNotification = notifications.filter(
        (n) => n.id !== notification.id
      );
      setNotifications(newNotification);
    },
    [notifications]
  );

  return (
    <NotificationsContext.Provider
      value={useMemo(
        () => ({ notifications, addNotification, removeNotification }),
        [notifications, addNotification, removeNotification]
      )}
    >
      {children}
    </NotificationsContext.Provider>
  );
}
