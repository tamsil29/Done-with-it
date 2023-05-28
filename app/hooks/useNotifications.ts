import * as Notifications from "expo-notifications";
import expoPushTokensApi from "../api/expoPushTokens";
import Constants from "expo-constants";
import { useEffect } from "react";

interface Props {
  notificationListener?: Notifications.Notification | any;
  shouldShowAlert?: boolean;
  shouldPlaySound?: boolean;
  shouldSetBadge?: boolean;
}

const useNotifications = ({
  notificationListener,
  shouldShowAlert = true,
  shouldPlaySound = true,
  shouldSetBadge = true,
}: Props) => {
  useEffect(() => {
    registerForPushNotifications();

    if (notificationListener)
      Notifications.addNotificationReceivedListener(notificationListener);
  }, []);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert,
      shouldPlaySound,
      shouldSetBadge,
    }),
  });

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
