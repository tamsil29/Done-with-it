import { useContext, useState } from "react";
import NotificationContext from "./context";
import React, { FC, ReactNode, useMemo } from "react";

export const AppNotificationProvider: FC<{ children: ReactNode }> = (props) => {
  const [notification, setNotification] = useState();

  const value = useMemo(
    () => ({ notification, setNotification }),
    [notification, setNotification]
  );
  return <NotificationContext.Provider value={value} {...props} />;
};

export const useAppNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(`useAppNotifications hook must be used within a UIProvider`);
  }
  return context;
};
