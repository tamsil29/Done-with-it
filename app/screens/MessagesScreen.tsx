import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import Screen from '../components/Screen'

const messages = [
  {
    id: 1,
    title: "T1",
    description: "D1",
    image:
      "https://wallpapers.com/images/featured-full/cool-profile-pictures-4co57dtwk64fb7lv.jpg",
  },
  {
    id: 2,
    title: "T2",
    description: "D2",
    image:
      "https://wallpapers.com/images/featured-full/cool-profile-pictures-4co57dtwk64fb7lv.jpg",
  },
];

function MessagesScreen() {
  return (
    <Screen>
      <FlatList
      ItemSeparatorComponent={()=><ListItemSeparator/>}
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.description}
            image={item.image}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
    
})

export default MessagesScreen;
