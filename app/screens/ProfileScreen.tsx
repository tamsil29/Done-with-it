import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Modal,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "../components/Icon";
import colors from "../config/colors";
import AppText from "../components/AppText";
import { getUserImage } from "../utility/utilities";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useImagePicker from "../hooks/useImagePicker";
import filesApi from "../api/files";
import useApi from "../hooks/useApi";
import users from "../api/users";
import AppActivityIndicator from "../components/ActivityIndicator";
import useAuth from "../auth/useAuth";

interface Props {
  user: any;
  visible: boolean;
  isSelf: boolean;
  onClose: () => void;
}

function ProfileScreen({ visible, user, isSelf, onClose }: Props) {
  const { updateSelf } = useAuth();
  const userApi = useApi(users.updatedp);
  const uploadImageApi = useApi(filesApi.uploadImage);
  const { selectImage, image, unselectImage } = useImagePicker();

  const handleSave = async (imageUri: string) => {
    const result = await uploadImageApi.request(imageUri);

    if (!result.ok)
      return Alert.alert(
        "Error",
        "Error uploading image, Please try again later."
      );

    const userResult = await userApi.request({
      imageId: result.data?.data._id,
    });

    if (!userResult.ok)
      return Alert.alert(
        "Error",
        "Error saving image, Please try again later."
      );
    updateSelf(userResult.data.data);
    unselectImage();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <AppActivityIndicator
        visible={userApi.isLoading || uploadImageApi.isLoading}
      />
      <View style={styles.modalHeader}>
        <AppText style={{ fontSize: 24 }}>Profile</AppText>
        {image && (
          <>
            <TouchableWithoutFeedback onPress={() => handleSave(image)}>
              <AppText style={{ color: colors.secondary }}>Save</AppText>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={unselectImage}>
              <AppText style={{ color: colors.danger }}>Cancel</AppText>
            </TouchableWithoutFeedback>
          </>
        )}
        {!image && (
          <MaterialCommunityIcons onPress={onClose} size={30} name="close" />
        )}
      </View>
      <View style={styles.container}>
        <View style={styles.dpContainer}>
          <Image
            source={{ uri: image || getUserImage(user?.imageId) }}
            style={styles.dp}
          />
          {isSelf && (
            <TouchableWithoutFeedback onPress={selectImage}>
              <View style={{ position: "absolute", bottom: 0, right: 0 }}>
                <Icon name="camera" backgroundColor={colors.primary} />
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
        <AppText
          style={{ fontSize: 24, fontWeight: 700, marginTop: 20 } as any}
        >
          {user?.name}
        </AppText>
        <AppText style={{ fontWeight: 600 } as any}>{user?.email}</AppText>
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
