import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Icon from "../components/Icon";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import Screen from "../components/Screen";
import colors from "../config/colors";

const menuItems = [
  {
    title: "My Listings",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
  },
  {
    title: "My Messages",
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
  },
];

function AccountScreen() {
  const img2 =
    "https://wallpapers.com/images/featured-full/cool-profile-pictures-4co57dtwk64fb7lv.jpg";
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={"Mohd Tamsil"}
          onPress={() => {}}
          subTitle={"tamsilansari29@gmail.com"}
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
              onPress={() => {}}
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
        onPress={() => {}}
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
  },
});

export default AccountScreen;
