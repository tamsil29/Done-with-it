import { useRoute } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Image, Modal } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "../components/Icon";
import colors from "../config/colors";
import AppText from "../components/AppText";
import { getUserImage } from "../utility/utilities";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  user: any;
  visible: boolean;
  isSelf: boolean;
  onClose: () => void;
}

function ProfileScreen({ visible, user, isSelf, onClose }: Props) {
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalHeader}>
        <AppText style={{ fontSize: 24 }}>Profile</AppText>
        <MaterialCommunityIcons onPress={onClose} size={30} name="close" />
      </View>
      <View style={styles.container}>
        <View style={styles.dpContainer}>
          <Image
            source={{ uri: getUserImage(user?.imageId) }}
            style={styles.dp}
          />
          {isSelf && (
            <View style={{ position: "absolute", bottom: 0, right: 0 }}>
              <TouchableOpacity>
                <Icon name="camera" backgroundColor={colors.primary} />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <AppText
          style={{ fontSize: 24, fontWeight: 700, marginTop: 20 } as any}
        >
          {user.name}
        </AppText>
        <AppText style={{ fontWeight: 600 } as any}>{user.email}</AppText>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  container: {
    alignItems: "center",
    marginTop: 30,
  },
  dp: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  dpContainer: {
    position: "relative",
  },
});

export default ProfileScreen;
