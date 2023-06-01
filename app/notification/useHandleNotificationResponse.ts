import * as Notifications from "expo-notifications";
import useRouteNavigation from "../hooks/useRouteNavigation";
import { NotificationEnums } from "./enums";

export const useHandleNotificationResponse = () => {
  const navigation = useRouteNavigation();
  const handleNotificationResponse = (
    response: Notifications.NotificationResponse
  ) => {
    const responseType = response.notification.request.content?.data?.type;
    const responseData = response.notification.request.content?.data?.data;
    switch (responseType) {
      case NotificationEnums.CHAT:
        navigation.navigate("AccountTab", {
          screen: "Messages",
          // params: { screen: "Chat", params: responseData },
        });
    }
  };
  return {
    handleNotificationResponse,
  };
};
