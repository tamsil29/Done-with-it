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
  numberOfColumns?: number;
  items: any[];
  selectedItem: any;
  onSelectItem: React.Dispatch<any>;
  width?: string | number;
  PickerItemComponent?: React.FC<any>;
}

function Picker({
  icon,
  items,
  numberOfColumns = 1,
  placeholder,
  selectedItem,
  onSelectItem,
  width = "100%",
  PickerItemComponent = PickerItem,
}: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, { width }]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon as any}
              size={20}
              color={defaultStyles.colors.medium}
            />
          )}

          {selectedItem ? (
            <AppText style={styles.text}>{selectedItem?.label}</AppText>
          ) : (
            <AppText style={styles.placeholder}>{placeholder}</AppText>
          )}

          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={defaultStyles.colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalHeader}>
          <AppText style={{ fontSize: 24 }}>Select {placeholder}</AppText>
          <MaterialCommunityIcons
            onPress={() => setModalVisible(false)}
            size={30}
            name="close"
          />
        </View>
        {/* <Button title="close" onPress={() => setModalVisible(false)} /> */}
        <FlatList
          data={items}
          keyExtractor={(item) => item._id.toString()}
          numColumns={numberOfColumns}
          renderItem={({ item }) => (
            <PickerItemComponent
              item={item}
              onPress={() => {
                setModalVisible(false);
                onSelectItem(item);
              }}
            />
          )}
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
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
    gap: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  placeholder: {
    color: defaultStyles.colors.medium,
    flex: 1,
  },
  text: {
    flex: 1,
  },
});

export default Picker;
