import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Icon from "../components/Icon";
import ListItem from "../components/ListItem";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import ListItemSeparator from "../components/ListItemSeparator";
import Screen from "../components/Screen";

const _messages = [
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
  const [messages, setMessages] = useState(_messages)
  const [refreshing, setRefreshing] = useState(false)
  const handleDelete = (message: any) =>{
    setMessages(messages.filter(msg => msg.id !== message.id))
  }

  return (
    <Screen>
      <FlatList
        ItemSeparatorComponent={ListItemSeparator}
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.description}
            image={item.image}
            onPress={() => console.log(123)}
            renderRightActions={()=><ListItemDeleteAction onPress={()=>handleDelete(item)}/>}
          />
        )}
        refreshing={refreshing}
        onRefresh={()=>setMessages([..._messages])}
      />
      <ListItem
            title={'My item'}

            onPress={() => console.log(123)}
            ImageComponent={<Icon name="email"/>}
          />
      
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default MessagesScreen;
