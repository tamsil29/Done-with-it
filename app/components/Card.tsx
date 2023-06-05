import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import colors from "../config/colors";
import Icon from "./Icon";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  title: string;
  subTitle: string;
  image: string;
  onPress: React.Dispatch<any>;
  onDeletePress?: React.Dispatch<any>;
  enableDelete?: boolean;
}

function Card({
  title,
  subTitle,
  image,
  onPress,
  onDeletePress,
  enableDelete = false,
}: Props) {
  return (
    <View style={styles.card}>
      <TouchableWithoutFeedback onPress={onPress}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
      </TouchableWithoutFeedback>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          padding: 20,
          alignItems: "center",
        }}
      >
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle}>{subTitle}</Text>
        </View>
        {enableDelete && (
          <TouchableOpacity onPress={onDeletePress as any}>
            <Icon name="delete" backgroundColor={colors.danger} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    overflow: "hidden",
    marginBottom: 20,
  },
  image: { height: 200, width: "100%" },
  detailsContainer: {
    // padding: 20,
    gap: 10,
  },
  title: { fontSize: 18, fontWeight: "600" },
  subTitle: { fontSize: 18, color: colors.secondary, fontWeight: "bold" },
});

export default Card;
