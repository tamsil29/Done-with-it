import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Icon from "../components/Icon";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import Screen from "../components/Screen";
import colors from "../config/colors";
import useRouteNavigation from "../hooks/useRouteNavigation";
import { RouteEnums } from "../navigation/routes";
import useAuth from "../auth/useAuth";

const menuItems = [
  {
    title: "My Listings",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
    targetScreen: "Messages",
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
  const img2 =
    "https://wallpapers.com/images/featured-full/cool-profile-pictures-4co57dtwk64fb7lv.jpg";

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={user.name}
          onPress={() => navigate('Profile', user)}
          subTitle={user.email}
          image={img2}
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
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  screen: {
    backgroundColor: colors.light,
    paddingTop: 0
  },
});

export default AccountScreen;
