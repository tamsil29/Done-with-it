import React, { useState } from "react";
import { View, StyleSheet, FlatList, Modal } from "react-native";
import Icon from "../components/Icon";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import Screen from "../components/Screen";
import colors from "../config/colors";
import useRouteNavigation from "../hooks/useRouteNavigation";
import { RouteEnums } from "../navigation/routes";
import useAuth from "../auth/useAuth";
import { getUserImage } from "../utility/utilities";
import ProfileScreen from "./ProfileScreen";

const menuItems = [
  {
    title: "My Listings",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
    targetScreen: RouteEnums.MY_LISTINGS,
  },
  {
    title: "My Messages",
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
    targetScreen: RouteEnums.MESSAGES,
  },
];

function AccountScreen() {
  const { navigate } = useRouteNavigation();
  const { user, logOut } = useAuth();
  const [isProfileModalVisible, setProfileModalVisible] = useState(false)

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={user.name}
          onPress={() => setProfileModalVisible(true)}
          subTitle={user.email}
          image={getUserImage(user.imageId)}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          ItemSeparatorComponent={ListItemSeparator}
          data={menuItems}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <ListItem
              onPress={() => navigate(item.targetScreen)}
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
            />
          )}
        />
      </View>
      <ListItem
        onPress={logOut}
        title={"Log Out"}
        IconComponent={<Icon name={"logout"} backgroundColor="#ffe66d" />}
      />
      <ProfileScreen user={user} visible={isProfileModalVisible} isSelf={true} onClose={()=>setProfileModalVisible(false)}/>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  screen: {
    backgroundColor: colors.light,
    paddingTop: 0,
  },
});

export default AccountScreen;
