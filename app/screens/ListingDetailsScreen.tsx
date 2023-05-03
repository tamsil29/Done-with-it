import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import Card from "../components/Card";
import ListItem from "../components/ListItem";
import colors from "../config/colors";

function ListingDetailsScreen() {
    const img1='https://i0.pickpik.com/photos/241/235/620/mountain-hiking-adventure-landscape-preview.jpg'
    const img2='https://wallpapers.com/images/featured-full/cool-profile-pictures-4co57dtwk64fb7lv.jpg'
  return (
    <View>
      <Image
        source={{
          uri: img1
        }}
        style={styles.image}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>Red jacket for sale</Text>
        <Text style={styles.price}>$100</Text>
      </View>
      <View style={styles.userContainer}>
      <ListItem title={"Vladmir Putin"} subTitle={"5 Listings"} image={img2} /></View>

    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  detailsContainer: {
    padding: 20,
    gap: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.secondary,
  },
  title: { fontSize: 24, fontWeight: "500" },
  userContainer:{
    marginVertical: 20
  },
});

export default ListingDetailsScreen;
