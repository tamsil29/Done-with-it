import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import ListingScreen from "../screens/ListingScreen";

const Stack = createStackNavigator();

const FeedNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "vertical",
        presentation: "modal",
        headerShown: false,
      }}
    >
      <Stack.Screen name="Listing" component={ListingScreen} />
      <Stack.Screen name="ListingDetails" component={ListingDetailsScreen} />
    </Stack.Navigator>
  );
};

export default FeedNavigator;
