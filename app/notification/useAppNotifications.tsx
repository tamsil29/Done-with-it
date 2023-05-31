import { useContext, useState } from "react";
import NotificationContext from "./context";
import React, { FC, ReactNode, useMemo } from "react";
import * as Notifications from "expo-notifications";

export const AppNotificationProvider: FC<{ children: ReactNode }> = (props) => {
  const [notification, setNotification] = useState<
    Notifications.Notification | any
  >();

  const presentLocalNotification = async (
    title: string,
    body: string,
    data: any
  ) => {
    setNotificaHandlerTodefault();
    await Notifications.scheduleNotificationAsync({
      content: { title, body, data },
      trigger: null,
      identifier: "local",
    });
  };

  const setNotificaHandlerTodefault = () => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
  };

  const setNotificationHandlerToNull = (identifier: string) => {
    setTimeout(() => {
      Notifications.dismissNotificationAsync(identifier);
    }, 1000);
    Notifications.setNotificationHandler(null);
  };

  const value = useMemo(
    () => ({
      notification,
      setNotification,
      presentLocalNotification,
      setNotificationHandlerToNull,
    }),
    [
      notification,
      setNotification,
      presentLocalNotification,
      setNotificationHandlerToNull,
    ]
  );
  return <NotificationContext.Provider value={value} {...props} />;
};

export const useAppNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      `useAppNotifications hook must be used within a AppNotificationProvider`
    );
  }
  return context;
};
