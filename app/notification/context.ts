import React from 'react'

interface State {
    notification: any
    setNotification: React.Dispatch<React.SetStateAction<any>>
}

const initialState = {
    notification: undefined,
    setNotification: () => {}
}

const NotificationContext = React.createContext<State>(initialState);

export default NotificationContext