import React from "react";
import { View, Image,StyleSheet } from "react-native";

import colors from '../config/colors'

function ViewImageScreen(props: any) {
  return (
    <View style={styles.container}>
        <View style={styles.closeIcon}></View>
        <View style={styles.deleteIcon}></View>
      <Image
      style={styles.image}
        resizeMode="contain"
        source={{
          uri: "https://aarsunwoods.b-cdn.net/wp-content/uploads/2020/03/Sofa-Chair-for-Luxury-Home-UH-FP-0019.jpg",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    closeIcon:{
        height: 50,
        width: 50,
        backgroundColor: colors.primary,
        position: 'absolute',
        top: 40,
        left: 30

    },
    container:{
        backgroundColor: colors.black
    },
    deleteIcon:{
        height: 50,
        width: 50,
        backgroundColor: colors.secondary,
        position: 'absolute',
        top: 40,
        right: 30,
    },
    image:{
        height: '100%',
        width: '100%',
    },
})

export default ViewImageScreen;
