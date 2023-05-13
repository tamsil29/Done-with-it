import React from "react";
import { FlatList } from "react-native";
import Card from "../components/Card";
import Screen from "../components/Screen";
import colors from "../config/colors";
import {StyleSheet} from 'react-native'

const listings = [
  {
    id: 1,
    title: "Red Jacket for sale",
    price: 100,
    image:
      "https://i0.pickpik.com/photos/241/235/620/mountain-hiking-adventure-landscape-preview.jpg",
  },
  {
    id: 2,
    title: "Couch in great condition",
    price: 200,
    image:
    "https://aarsunwoods.b-cdn.net/wp-content/uploads/2020/03/Sofa-Chair-for-Luxury-Home-UH-FP-0019.jpg"
  },
];

function ListingScreen() {
  return (
    <Screen style={styles.screen}>
      <FlatList
        data={listings}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={"$" + item.price}
            image={item.image}
          />
        )}
        keyExtractor={(listing) => listing.id.toString()}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen:{
    padding: 20,
    backgroundColor: colors.light,
  }
})

export default ListingScreen;