import React from "react";
import { View, StyleSheet, Image } from "react-native";

function ProfileScreen() {
  const img =
    "https://wallpapers.com/images/featured-full/cool-profile-pictures-4co57dtwk64fb7lv.jpg";
  return (
    <View style={styles.container}>
      <Image source={{ uri: img }} style={styles.dp} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  dp: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default ProfileScreen;
