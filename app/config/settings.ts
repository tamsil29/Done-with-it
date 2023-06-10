import Constants from "expo-constants";

const settings = {
    dev: {
        apiUrl: "http://192.168.0.104:4000/api",
        // apiUrl: "https://done-with-it.onrender.com/api",
        socketUrl: 'http://192.168.0.104:4000'
    },
    staging: {
        apiUrl: "https://done-with-it.onrender.com/api",
        socketUrl: 'https://done-with-it.onrender.com'
    },
    prod: {
        apiUrl: "https://done-with-it.onrender.com/api",
        socketUrl: 'https://done-with-it.onrender.com'
    }
}

const getCurrentSettings = () => {
    if(__DEV__) return settings.dev
    if(Constants.manifest?.releaseChannel === 'staging') return settings.staging
    return settings.prod
}

export default getCurrentSettings();