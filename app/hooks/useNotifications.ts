import * as Notifications from "expo-notifications";
import expoPushTokensApi from "../api/expoPushTokens";
import Constants from "expo-constants";
import { useEffect, useRef } from "react";
import { useAppNotifications } from "../notification/useAppNotifications";
import { useHandleNotificationResponse } from "../notification/useHandleNotificationResponse";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

interface Props {
  notificationListener?: Notifications.Notification | any;
}

const useNotifications = () => {
  const {handleNotificationResponse} = useHandleNotificationResponse()
  const { setNotification } = useAppNotifications();
  const notificationListener = useRef<Notifications.Notification | any>();
  const responseListener = useRef<Notifications.NotificationResponse | any>();
  useEffect(() => {
    registerForPushNotifications();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        if (notification.request.identifier !== "local")
          setNotification(notification);
        console.log(notification.request.content.data);
      });
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log({ response });
        handleNotificationResponse(response)
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const registerForPushNotifications = async () => {
    try {
      const permission = await Notifications.requestPermissionsAsync();
      if (!permission.granted) return;

      const token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas?.projectId,
      });
      console.log(token);
      expoPushTokensApi.registerToken(token.data);
    } catch (error) {
      console.log("Error getting a push token", error);
    }
  };
};

export default useNotifications;
