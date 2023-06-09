import { useEffect, useState } from "react";
import * as Location from "expo-location";

const useLocation = () => {
  const [location, setLocation] = useState({} as any);
  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
        const { granted } = await Location.requestForegroundPermissionsAsync();
        if (!granted) return;
        const {
          //@ts-ignore
          coords: { latitude, longitude },
        } = await Location.getLastKnownPositionAsync();
        setLocation({ latitude, longitude });
    } catch (error) {
        console.log(error);
        setLocation({});
    }
   
  };
  return { location };
};

export default useLocation;
