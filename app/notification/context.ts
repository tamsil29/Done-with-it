import React from 'react'
import * as Notifications from "expo-notifications";

interface State {
    notification: Notifications.Notification
    setNotification: React.Dispatch<React.SetStateAction<any>>
    presentLocalNotification: (title: string, body: string, data: any) => Promise<void>|any
}

const initialState = {
    notification: undefined as any,
    setNotification: () => {},
    presentLocalNotification:()=>{}
}

const NotificationContext = React.createContext<State>(initialState);

export default NotificationContext