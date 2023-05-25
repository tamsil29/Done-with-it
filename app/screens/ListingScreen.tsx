import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import Card from "../components/Card";
import Screen from "../components/Screen";
import colors from "../config/colors";
import { StyleSheet } from "react-native";
import useRouteNavigation from "../hooks/useRouteNavigation";
import { ScrollView } from "react-native-gesture-handler";
import { RouteEnums } from "../navigation/routes";
import listingApi from "../api/listings";
import AppText from "../components/AppText";
import Button from "../components/Button";
import AppActivityIndicator from "../components/ActivityIndicator";
import  useApi  from "../hooks/useApi";

function ListingScreen() {
  const { navigate } = useRouteNavigation();
  const {
    data: listings,
    isError,
    request: loadListings,
    isLoading,
  } = useApi(listingApi.getListings);

  useEffect(() => {
    loadListings()
  }, []);

  return (
    // <ScrollView>
    <Screen style={styles.screen}>
      {isError && (
        <>
          <AppText>Couldn't Retrieve the listings</AppText>
          <Button title="Retry" onPress={loadListings} />
        </>
      )}
      <AppActivityIndicator visible={isLoading} />
      <FlatList
        data={listings}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={"₹" + item.price}
            image={item.imageId}
            onPress={() => navigate(RouteEnums.LISTING_DETAILS, item)}
          />
        )}
        keyExtractor={(listing) => listing?._id.toString()}
      />
    </Screen>
    // </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default ListingScreen;
