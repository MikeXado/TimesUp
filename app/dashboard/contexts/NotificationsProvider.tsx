"use client";
import {
  useState,
  createContext,
  useMemo,
  useCallback,
  ReactNode,
} from "react";
import { NotificationData, NotificationsContextType } from "../../../types";

export const NotificationsContext = createContext<NotificationsContextType>({
  notifications: [],
  addNotification: () => {},
  removeNotification: () => {},
});

export default function NotificationsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  const addNotification = useCallback(
    (notification: NotificationData) => {
      setNotifications([...notifications, notification]);
    },
    [notifications]
  );

  const removeNotification = useCallback(
    (notification: NotificationData) => {
      const newNotification = notifications.filter(
        (n: NotificationData) => n.id !== notification.id
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
