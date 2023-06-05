import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Icon from "../components/Icon";
import ListItem from "../components/ListItem";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import ListItemSeparator from "../components/ListItemSeparator";
import Screen from "../components/Screen";
import useApi from "../hooks/useApi";
import messagesApi from "../api/message";
import useAuth from "../auth/useAuth";
import useRouteNavigation from "../hooks/useRouteNavigation";
import NoData from "../components/NoData";
import { getUserImage } from "../utility/utilities";
import { RouteEnums } from "../navigation/routes";

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
  const image =
    "https://wallpapers.com/images/featured-full/cool-profile-pictures-4co57dtwk64fb7lv.jpg";
  const {
    data,
    request: getConvos,
    isLoading,
  } = useApi(messagesApi.getConversations);
  const { user } = useAuth();
  const navigation = useRouteNavigation();
  const [messages, setMessages] = useState(_messages);
  const [refreshing, setRefreshing] = useState(false);
  const handleDelete = (message: any) => {
    setMessages(messages.filter((msg) => msg.id !== message.id));
  };

  useEffect(() => {
    getConvos();
  }, []);

  const getOtherUser = (user1Data: any, user2Data: any) => {
    return user1Data?._id === user._id ? user2Data : user1Data;
  };

  return (
    <Screen style={styles.container}>
      <FlatList
        ItemSeparatorComponent={ListItemSeparator}
        data={data}
        keyExtractor={(messages) => messages._id.toString()}
        ListEmptyComponent={<NoData value="messages" />}
        renderItem={({ item }) => (
          <ListItem
            title={getOtherUser(item.user1Data, item.user2Data)?.name}
            subTitle={item?.recentMessage?.message}
            image={getUserImage(
              getOtherUser(item.user1Data, item.user2Data)?.imageId
            )}
            onPress={() => navigation.navigate(RouteEnums.CHAT, item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
            greenDot={item?.unreadBy?.includes(user._id)}
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
  container: {
    paddingTop: 0,
  },
});

export default MessagesScreen;
