import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Icon from "../components/Icon";
import ListItem from "../components/ListItem";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import ListItemSeparator from "../components/ListItemSeparator";
import Screen from "../components/Screen";
import useApi from "../hooks/useApi";
import messagesApi from '../api/message'
import useAuth from "../auth/useAuth";

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
  const image = "https://wallpapers.com/images/featured-full/cool-profile-pictures-4co57dtwk64fb7lv.jpg"
  const { data, request: getConvos, isLoading} = useApi(messagesApi.getConversations);
  const {user} = useAuth()
  const [messages, setMessages] = useState(_messages)
  const [refreshing, setRefreshing] = useState(false)
  const handleDelete = (message: any) =>{
    setMessages(messages.filter(msg => msg.id !== message.id))
  }

  useEffect(()=>{
    getConvos()
  }, [])

  return (
    <Screen style={styles.container}>
      <FlatList
        ItemSeparatorComponent={ListItemSeparator}
        data={data}
        keyExtractor={(messages) => messages._id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.userId1 === user._id ? item.user2Data.name : item.user1Data.name}
            subTitle={item?.recentMessage?.message}
            image={image}
            onPress={() => console.log(123)}
            renderRightActions={()=><ListItemDeleteAction onPress={()=>handleDelete(item)}/>}
          />
        )}
        refreshing={isLoading}
        onRefresh={getConvos}
      />
      {/* <ListItem
            title={'My item'}

            onPress={() => console.log(123)}
            IconComponent={<Icon name="email"/>}
          /> */}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container:{
    paddingTop: 0
  }
});

export default MessagesScreen;
