import Constants from "expo-constants";

const settings = {
    dev: {
        // apiUrl: "http://192.168.0.104:4000/api"
        apiUrl: "https://done-with-it.onrender.com/api"
    },
    staging: {
        apiUrl: "https://done-with-it.onrender.com/api"
    },
    prod: {
        apiUrl: "https://done-with-it.onrender.com/api"
    }
}

const getCurrentSettings = () => {
    if(__DEV__) return settings.dev
    if(Constants.manifest?.releaseChannel === 'staging') return settings.staging
    return settings.prod
}

export default getCurrentSettings();