import React, { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";

import AuthNavigator from "./app/navigation/AuthNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import OfflineNotice from "./app/components/OfflineNotice";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import { navigationRef } from "./app/navigation/rootNavigation";
import { AppNotificationProvider } from "./app/notification/useAppNotifications";
import logger from './app/utility/logger'
import usersApi from './app/api/users'
import { Platform, UIManager } from "react-native";

SplashScreen.preventAutoHideAsync();
// logger.start()

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function App() {
  const [user, setUser] = useState();
  const [appIsReady, setAppIsReady] = useState(false);

  const restoreUser = async () => {
    try {
      const token = await authStorage.getToken();
      if (token) {
        const result = await usersApi.getMe()
        if(result.ok) setUser(result.data)
      }
    } catch (error) {
      console.error(error);
    } finally {
      setAppIsReady(true);
    }
  };

  useEffect(() => {
    restoreUser();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <OfflineNotice />
      <NavigationContainer
        ref={navigationRef as any}
        theme={navigationTheme}
        onReady={onLayoutRootView}
      >
        {user ? (
          <AppNotificationProvider>
            <AppNavigator />
          </AppNotificationProvider>
        ) : (
          <AuthNavigator />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
