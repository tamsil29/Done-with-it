import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";
import ChatScreen from "../screens/ChatScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MyListingsScreen from "../screens/MyListingsScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="Messages" component={MessagesScreen} />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="Profile"
        component={ProfileScreen}
      /> */}
      <Stack.Screen
        name="MyListings"
        component={MyListingsScreen}
        options={{title: "My Listings"}}
      />
    </Stack.Navigator>
  );
};

export default AccountNavigator;
