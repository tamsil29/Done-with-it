import React from 'react'
import * as Notifications from "expo-notifications";
import useRouteNavigation from '../hooks/useRouteNavigation';

export const useHandleNotificationResponse = () => {
    const handleNotificationResponse = (response: Notifications.NotificationResponse) => {
        const navigation = useRouteNavigation()
        const responseType = response.notification.request.content?.data?.type
        const responseData = response.notification.request.content?.data?.data
            switch(responseType) {
                case 'Chat':
                    navigation.navigate('Chat', responseData)
            }
    }
  return {
    handleNotificationResponse
  }
}
