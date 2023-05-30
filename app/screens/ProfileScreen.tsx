import { useRoute } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "../components/Icon";
import colors from "../config/colors";
import AppText from "../components/AppText";
import useAuth from "../auth/useAuth";

function ProfileScreen() {
  const { user } = useAuth();
  const route = useRoute();
  const userFromParams = route.params as any;
  const img =
    "https://wallpapers.com/images/featured-full/cool-profile-pictures-4co57dtwk64fb7lv.jpg";
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dpContainer}>
        <Image source={{ uri: img }} style={styles.dp} />
        {user._id === userFromParams._id && (
          <View style={{ position: "absolute", bottom: 0, right: 0 }}>
            <Icon name="camera" backgroundColor={colors.primary} />
          </View>
        )}
      </TouchableOpacity>
      <AppText style={{ fontSize: 24, fontWeight: 700, marginTop: 20 } as any}>
        {userFromParams.name}
      </AppText>
      <AppText style={{ fontWeight: 600 } as any}>
        {userFromParams.email}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
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
