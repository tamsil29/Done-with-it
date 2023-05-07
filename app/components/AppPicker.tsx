import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, StyleSheet, Modal, Button } from "react-native";
import defaultStyles from "../config/styles";
import AppText from "./AppText";
import { TouchableWithoutFeedback } from "react-native";
import Screen from "./Screen";
import { FlatList } from "react-native-gesture-handler";
import PickerItem from "./PickerItem";

interface Props {
  icon?: string;
  placeholder?: string;
  items: any[];
}

function AppPicker({ icon, items, placeholder }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={styles.container}>
          {icon && (
            <MaterialCommunityIcons
              name={icon as any}
              size={20}
              color={defaultStyles.colors.medium}
            />
          )}
          <AppText style={styles.text}>{placeholder}</AppText>

          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={defaultStyles.colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <Button title="close" onPress={() => setModalVisible(false)} />
        <FlatList
          data={items}
          keyExtractor={(item) => item.value.toString()}
          renderItem={({ item }) => <PickerItem label={item.label} onPress={()=>console.log(item)}/>}
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    width: "100%",
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
    gap: 10,
  },
  text: {
    flex: 1,
  },
});

export default AppPicker;
