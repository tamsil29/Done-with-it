import React from 'react'

interface State {
    user: any
    setUser: React.Dispatch<React.SetStateAction<any>>
}

const initialState = {
    user: undefined,
    setUser: () => {}
}

const AuthContext = React.createContext<State>(initialState);

export default AuthContext