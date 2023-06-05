import React, { useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import AppActivityIndicator from "../components/ActivityIndicator";
import { FlatList } from "react-native";
import Card from "../components/Card";
import Screen from "../components/Screen";
import colors from "../config/colors";
import listingApi from "../api/listings";
import AppText from "../components/AppText";
import Button from "../components/Button";
import useApi from "../hooks/useApi";
import { formatPrice } from "../utility/utilities";
import NoData from "../components/NoData";

function MyListingsScreen() {
  const {
    data: listings,
    isError,
    request: loadListings,
    isLoading,
  } = useApi(listingApi.getMyListings);

  const { request: deleteListing } = useApi(listingApi.deleteListing);

  useEffect(() => {
    loadListings();
  }, []);

  const handleDelete = (listingId: string) => {
    Alert.alert(
      "Delete Listing",
      "Are you sure you want to delete this listing?",
      [
        {
          text: "Yes",
          onPress: async () => {
            await deleteListing(listingId);
            loadListings();
          },
        },
        { text: "No" },
      ]
    );
  };

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
        {listings && listings.length === 0 && <NoData value="listings" />}
        <FlatList
          data={listings}
          renderItem={({ item, index }) => (
            <>
              {index === 0 && <View style={{ marginTop: 20 }} />}
              <Card
                title={item.title}
                subTitle={"₹" + formatPrice(item.price)}
                image={item.images[0]}
                onPress={() => {}}
                onDeletePress={() => handleDelete(item?._id)}
                enableDelete
              />
            </>
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
    paddingTop: 0,
  },
});

export default MyListingsScreen;
