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
import useApi from "../hooks/useApi";
import { formatPrice } from "../utility/utilities";
import NoData from "../components/NoData";

function ListingScreen() {
  const { navigate } = useRouteNavigation();
  const {
    data: listings,
    isError,
    request: loadListings,
    isLoading,
  } = useApi(listingApi.getListings);

  useEffect(() => {
    loadListings();
  }, []);

  return (
    <>
      <AppActivityIndicator visible={isLoading} />
      <Screen style={styles.screen}>
        {isError && (
          <>
            <AppText>Couldn't Retrieve the listings</AppText>
            <Button title="Retry" onPress={loadListings} />
          </>
        )}
        {listings && listings.length === 0 && <NoData value='messages'/>}
        <FlatList
          data={listings}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              subTitle={"₹" + formatPrice(item.price)}
              image={item.images[0]}
              onPress={() => navigate(RouteEnums.LISTING_DETAILS, item)}
            />
          )}
          keyExtractor={(listing) => listing?._id.toString()}
          refreshing={isLoading}
          onRefresh={loadListings}
          showsVerticalScrollIndicator={false}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default ListingScreen;
