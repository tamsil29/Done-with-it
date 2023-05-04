import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
} from "react-native";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import colors from "../config/colors";

interface Props {
  title: string;
  subTitle?: string;
  image?: string;
  onPress: React.Dispatch<any>;
  renderRightActions?: any;
  ImageComponent?: any;
}

function ListItem({
  title,
  subTitle,
  image,
  onPress,
  renderRightActions,
  ImageComponent,
}: Props) {
  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={renderRightActions}>
        <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
          <View style={styles.container}>
            {ImageComponent}
            {image && <Image source={{ uri: image }} style={styles.image} />}
            <View>
              <Text style={styles.title}>{title}</Text>
              {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
            </View>
          </View>
        </TouchableHighlight>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    padding: 15,
  },
  image: {
    borderRadius: 50,
    height: 70,
    width: 70,
  },
  subTitle: {
    color: colors.medium,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },
});

export default ListItem;
