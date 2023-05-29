import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import ListingEditScreen from "../screens/ListingEditScreen";
import AccountNavigator from "./AccountNavigator";
import FeedNavigator from "./FeedNavigator";
import NewListingButton from "./NewListingButton";
import { RouteEnums } from "./routes";
import useNotifications from "../hooks/useNotifications";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  useNotifications({});
  return (
    <Tab.Navigator
      screenOptions={{ tabBarShowLabel: false, tabBarHideOnKeyboard: true }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ListingEdit"
        component={ListingEditScreen}
        options={({ navigation }) => ({
          title: "Add new Listing",
          tabBarButton: () => (
            <NewListingButton
              onPress={() => navigation.navigate(RouteEnums.LISTING_EDIT)}
            />
          ),
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              size={size}
              color={color}
            />
          ),
        })}
      />
      <Tab.Screen
        name="AccountTab"
        component={AccountNavigator}
        options={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "";
            // console.log(routeName);
            if (routeName === "Chat") {
              return { display: "none" };
            }
            return;
          })(route),
        })}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
