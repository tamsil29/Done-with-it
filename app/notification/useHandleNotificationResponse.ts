import React from "react";
import * as Notifications from "expo-notifications";
import useRouteNavigation from "../hooks/useRouteNavigation";

export const useHandleNotificationResponse = () => {
  const navigation = useRouteNavigation();
  const handleNotificationResponse = (
    response: Notifications.NotificationResponse
  ) => {
    const responseType = response.notification.request.content?.data?.type;
    const responseData = response.notification.request.content?.data?.data;
    switch (responseType) {
      case "chat":
        navigation.navigate("Account", {
          screen: "Messages",
          params: { screen: "Chat", params: responseData },
        });
    }
  };
  return {
    handleNotificationResponse,
  };
};
